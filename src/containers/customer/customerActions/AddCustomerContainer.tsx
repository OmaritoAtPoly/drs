import { omit } from "lodash";
import React, { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import AddCustomer from "../../../components/domains/customer/customerActions/AddCustomer";
import { CustomerDataExtendedToCreateOrEdit } from "../../../models/Customer";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useCustomerCacheSelector,
  usePatientCacheSelector,
} from "../../../modules/customer/profile/cacheSelector";
import {
  useCreateUserMutation,
  useEditCustomerMutation,
  useUpdateCustomerAvatarMutation,
} from "../../../modules/customer/signUp/mutation";
import { useSignUpCustomerCacheSelector } from "../../../modules/customer/signUp/signUpCustomerCacheSelector";
import { useOperationDataCacheSelector } from "../../../modules/operationData/cacheSelector";
import { useNextRecordIdQuery } from "../../../modules/profile/query";
import { useCitiesCacheSelector } from "../../../modules/search/cacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { defaultCustomerData } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

interface Props {
  handleOnCreateCustomerSuccess?: (data: Schemas.CustomerData) => void;
  handleOnCancel?: () => void;
  containerStyle?: string;
}

export default function AddCustomerContainer({
  handleOnCreateCustomerSuccess = undefined,
  handleOnCancel,
  containerStyle = undefined,
}: Props) {
  const { goBack, push, location } = useHistory();
  const { addLastAlerts } = useAddLastAlerts();
  const {
    data: nextRecordId,
    loading: nextRecordIdLoading,
  } = useNextRecordIdQuery({
    showError: true,
  });
  const {
    insurances,
    bloodTypes,
    genders,
    contactPerson,
    nationality,
    maritalStatuses,
  } = useOperationDataCacheSelector();
  const {
    currentPatient,
    loading: currentPatientLoading,
  } = usePatientCacheSelector({});
  const { customerAvatarRequest } = useSignUpCustomerCacheSelector();
  const {
    currentCachedCustomer,
    saveCurrentCustomerOnCache,
  } = useCustomerCacheSelector();

  const onUpdateAvatarSuccess = useCallback(() => {
    handleOnCreateCustomerSuccess
      ? currentCachedCustomer &&
        handleOnCreateCustomerSuccess(currentCachedCustomer)
      : currentCachedCustomer &&
        push(`/patient/${currentCachedCustomer.legalID}`);
    queryCache.setQueryData(
      ReactQueryKeys["customer-avatar-request-key"],
      undefined,
    );
  }, [currentCachedCustomer, handleOnCreateCustomerSuccess, push]);

  const { mutate: updateCustomerAvatar } = useUpdateCustomerAvatarMutation({
    showError: true,
    onSuccess: onUpdateAvatarSuccess,
  });

  const {
    cities,
    loading: loadingCities,
    setFilter,
  } = useCitiesCacheSelector();

  const onSuccessAdd = (data: Schemas.CustomerData) => {
    saveCurrentCustomerOnCache(data);
    if (customerAvatarRequest) {
      updateCustomerAvatar({
        code: data.legalID,
        ...customerAvatarRequest,
      });
    } else {
      handleOnCreateCustomerSuccess
        ? handleOnCreateCustomerSuccess(data)
        : push(`/patient/${data.legalID}`);
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    queryCache.invalidateQueries(ReactQueryKeys["patients"]);
    addLastAlerts({
      message: STRINGS.signupCustomer.CUSTOMER_CREATED_SUCCESS,
      severity: "success",
      name: "",
    });
  };

  const { mutate, loading: loadingCreate } = useCreateUserMutation({
    onSuccess: onSuccessAdd,
    showError: true,
  });

  const onSuccessEdit = useCallback(
    (
      data: Schemas.CustomerData,
      variables: Schemas.CustomerData & { oldLegalID?: string },
    ) => {
      addLastAlerts({
        message: STRINGS.signupCustomer.CUSTOMER_EDITED_SUCCESS,
        severity: "success",
        name: "",
      });
      variables.oldLegalID &&
        queryCache.removeQueries(ReactQueryKeys["current-patient"], {
          exact: false,
          refetchActive: true,
          refetchInactive: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      queryCache.invalidateQueries(ReactQueryKeys["current-patient"], {
        exact: false,
      });
      queryCache.invalidateQueries(
        // eslint-disable-next-line @typescript-eslint/dot-notation
        ReactQueryKeys["patients"],
      );
      if (location.state && (location.state as {from?: string}).from === "background") {
        push(`/patient/${data.legalID}`);
      } else {
        goBack();
      }
    },
    [addLastAlerts, goBack, location.state, push],
  );

  const { mutate: editMutate, loading: loadingEdit } = useEditCustomerMutation({
    onSuccess: onSuccessEdit,
    showError: true,
  });

  const onValuesChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (values: { customer: Schemas.CustomerData }) => {},
    [],
  );

  const citiesPure = useMemo(() => {
    let result: Schemas.CityData[] = [];
    cities?.forEach((country) => {
      if (!country.provinces) return;
      country.provinces?.forEach((element) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element.cities && (result = [...result, ...element.cities]);
      });
    });
    return result;
  }, [cities]);

  const onDebounceCities = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  const getPhones = useCallback(
    (customer: CustomerDataExtendedToCreateOrEdit) => {
      const validPhones = customer.phones?.filter(
        (phone) => phone.number !== "",
      );
      // eslint-disable-next-line no-confusing-arrow
      return validPhones?.map((phone) =>
        phone.prefix === "" ? { ...phone, prefix: "593" } : phone,
      );
    },
    [],
  );

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (values: { customer: CustomerDataExtendedToCreateOrEdit }) => {
      let newCustomer = values.customer;
      if (!currentPatient) {
        !values.customer.lastName &&
          (newCustomer = omit(values.customer, ["lastName"]));
        !values.customer.lastFamilyName &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (newCustomer = omit(values.customer, ["lastFamilyName"]) as any);
        mutate({ ...newCustomer, phones: getPhones(newCustomer) });
      } else {
        editMutate({ ...newCustomer, phones: getPhones(newCustomer) });
      }
    },
    [currentPatient, editMutate, getPhones, mutate],
  );

  const onCancel = useCallback(() => {
    handleOnCancel ? handleOnCancel() : goBack();
  }, [goBack, handleOnCancel]);

  const currentPatientMemo: Schemas.CustomerData = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      currentPatient
        ? {
            ...currentPatient,
            addresses: currentPatient?.addresses
              ? currentPatient?.addresses
              : [],
          }
        : { ...defaultCustomerData, professionalRecordID: nextRecordId },
    [currentPatient, nextRecordId],
  );

  return (
    <AddCustomer
      loadingFetch={currentPatientLoading || nextRecordIdLoading}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onValuesChange={onValuesChange}
      customer={currentPatientMemo}
      genders={genders || { "": "" }}
      bloodTypes={bloodTypes || { "": "" }}
      maritalStatuses={maritalStatuses || { "": "" }}
      insurances={insurances || []}
      nationalities={nationality || []}
      contactPerson={contactPerson}
      loading={loadingCreate || loadingEdit}
      loadingCities={loadingCities}
      cities={citiesPure}
      onDebounceCities={onDebounceCities}
      containerStyle={containerStyle}
    />
  );
}
