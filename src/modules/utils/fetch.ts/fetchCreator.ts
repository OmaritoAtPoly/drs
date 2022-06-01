import { queryCache } from "react-query";
import { CustomerDataExtendedToCreateOrEdit } from "../../../models/Customer";
import { API_BASIC_URL, API_URL } from "../../../utils/constants";
import STRINGS from "../../../utils/strings";
import {
  FetchCreatorArgs,
  ReactQueryKeys,
  ReactQueryStaleTime,
} from "../../apiTypes";
import { InternalCode } from "../error/handleError";
import TreatedError from "../error/TreatedError";
import {
  AsyncStorageKeys,
  getStringItemAsyncStore,
} from "../storage/AsyncStorageKeys";

const fetchCreator = async ({
  endpoint,
  body,
  method,
  headers,
  isBlob,
}: // eslint-disable-next-line consistent-return
FetchCreatorArgs & { isBlob?: boolean }) => {
  let token;
  try {
    const cacheToken = queryCache.getQueryData([ReactQueryKeys["token-key"]]);
    if (cacheToken) {
      token = cacheToken;
    } else {
      token = await getStringItemAsyncStore(
        AsyncStorageKeys.USER_TOKEN_KEY_STORE,
      );
    }
  } catch (error) {
    token = undefined;
  }

  const currentCustomer = queryCache.getQueryData<
    Pick<Schemas.CustomerData, "legalID">
  >(ReactQueryKeys["current-professional-id-key"]);

  const userEdit = queryCache.getQueryData<CustomerDataExtendedToCreateOrEdit>(
    ReactQueryKeys["enable-user"],
  );

  const customerShow = queryCache.getQueryData<{ legalID: string }>(
    ReactQueryKeys["current-professional-id-to-show-profile"],
  );

  let apiCustomer = currentCustomer;
  let newBody = JSON.stringify(body) as
    | Pick<FetchCreatorArgs, "body">
    | string
    | {};

  if (
    (userEdit && method === "PUT" && endpoint === "/customer/me") ||
    (userEdit && endpoint === "/customer/health-data")
  ) {
    apiCustomer = {
      ...userEdit,
      legalID: userEdit.oldLegalID || userEdit.legalID,
    };
  }

  const isMultipartFormData = () => {
    if (customerShow && endpoint.includes("/customer/avatar")) {
      return true;
    }
    return false;
  };

  if (isMultipartFormData()) {
    apiCustomer = customerShow;
    newBody = body;
  }

  if (!apiCustomer) {
    const mainLegalIDStore = await getStringItemAsyncStore(
      AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE,
    );
    apiCustomer = mainLegalIDStore ? { legalID: mainLegalIDStore } : undefined;
  }

  let options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Api-Client": "Y29tLnRvdXdvbGYuZWNsaW5pcS5hcGkudGVzdA==",
      ...headers,
    },
  } as RequestInit;
  if (Object.keys(body).length !== 0 || isMultipartFormData()) {
    options = { ...options, body: newBody } as typeof options & {
      body: Record<string, unknown>;
    };
  }

  if (token) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  try {
    const response = await fetch(
      endpoint.includes("api/")
        ? `${API_BASIC_URL}${endpoint}` ||
            `https://camilo.touwolf.com:443${endpoint}`
        : `${API_URL}${endpoint}` ||
            `https://camilo.touwolf.com:443/api/v1${endpoint}`,
      options,
    );

    let data;
    let message;

    if (
      isBlob ||
      endpoint.includes("/pdf") ||
      endpoint.includes("/customers-template") ||
      endpoint.includes("professional/informed-consent") ||
      endpoint.includes("professional/file") ||
      endpoint.includes("/professional/insurance-template") ||
      endpoint.includes("/professional/products-template")
    ) {
      const blob = await response.blob();
      data = blob;
    } else {
      const jsonRes = await response.json();
      data = jsonRes.data;
      message = jsonRes.message;
    }

    // throw error when plan expired
    if (response.status === 402) {
      queryCache.setQueryData(
        [ReactQueryKeys["plan-expired"]],
        { planExpired: true },
        {
          staleTime: ReactQueryStaleTime.NEVER,
        },
      );
      throw new TreatedError({
        message,
        status: response.status,
        internalCode: InternalCode.CODE_402,
      });
    }

    // throw error when admin disabled the user
    if (response.status === 417) {
      setTimeout(() => {
        localStorage.clear();
        queryCache.setQueryData(ReactQueryKeys["tab-visible-key"], {
          visible: false,
        });
        queryCache.setQueryData(ReactQueryKeys["disabled-professional-key"], {
          disable: true,
        });
        queryCache.clear();
      }, 1500);
      throw new TreatedError({
        message,
        status: response.status,
        internalCode: InternalCode.CODE_402,
      });
    }

    if (response.ok) {
      return data;
    }

    throw new TreatedError({ message, status: response.status });
  } catch (error) {
    throw new TreatedError({
      message:
        error.message === "Failed to fetch"
          ? STRINGS.error.INTERNET_CONNECTION_PROBLEM
          : error,
    });
  }
};

export default fetchCreator;
