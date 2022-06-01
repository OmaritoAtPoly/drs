/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import {
  useUpdateTabIndex,
  useUpdateTabVisible,
} from "../components/bars/SideBar/query";
import { useDisabledProfessionalQuery } from "../modules/auth/query";
import { usePlanExpiredQuery } from "../modules/payment/query";
import useProfileCacheSelector from "../modules/profile/cacheSelector";
import {
  AsyncStorageKeys,
  setStringItemAsyncStore,
} from "../modules/utils/storage/AsyncStorageKeys";
import useGetStringItemAsyncStorage from "../modules/utils/storage/useGetStringItemAsyncStorage";

function PrivateRoute({ children, path, ...rest }: RouteProps) {
  const { currentProfessional, email } = useProfileCacheSelector();
  useGetStringItemAsyncStorage({
    key: AsyncStorageKeys.USER_TOKEN_KEY_STORE,
  });
  const { updateTabIndex, getTabIndexFromPathName } = useUpdateTabIndex();
  const { updateTabVisible } = useUpdateTabVisible();
  const { data } = usePlanExpiredQuery();
  const { data: disabledProfessional } = useDisabledProfessionalQuery({});
  useEffect(() => {
    const tabIndex = getTabIndexFromPathName(path as string);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tabIndex >= 0 && updateTabIndex(tabIndex);
    updateTabVisible(true);
    if (!localStorage.getItem(AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE)) {
      setStringItemAsyncStore(
        AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE,
        currentProfessional?.legalID || "",
      );
    }
    if (!localStorage.getItem(AsyncStorageKeys.USER_EMAIL_KEY_STORE)) {
      setStringItemAsyncStore(AsyncStorageKeys.USER_EMAIL_KEY_STORE, email);
    }
    data?.planExpired &&
      setStringItemAsyncStore(AsyncStorageKeys.PLAN_EXPIRED_STORE, "true");
  }, [
    currentProfessional?.legalID,
    data?.planExpired,
    email,
    getTabIndexFromPathName,
    path,
    updateTabIndex,
    updateTabVisible,
  ]);

  if (disabledProfessional?.disabled) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <Route path={`${process.env.PUBLIC_URL}${path}`} {...rest}>
      {localStorage.getItem(AsyncStorageKeys.USER_TOKEN_KEY_STORE) ? (
        localStorage.getItem(AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE) ? (
          !localStorage.getItem(AsyncStorageKeys.PLAN_EXPIRED_STORE) ||
          path === "/" ||
          path?.includes("/pay/plan/") ? (
            children
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )
        ) : (
          <Redirect to={{ pathname: "/create-professional-user" }} />
        )
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </Route>
  );
}

export default PrivateRoute;
