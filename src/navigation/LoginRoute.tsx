import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import {
  useUpdateTabIndex,
  useUpdateTabVisible,
} from "../components/bars/SideBar/query";
import { AsyncStorageKeys } from "../modules/utils/storage/AsyncStorageKeys";
import useGetStringItemAsyncStorage from "../modules/utils/storage/useGetStringItemAsyncStorage";

function LoginRoute({ children, path, ...rest }: RouteProps) {
  useGetStringItemAsyncStorage({
    key: AsyncStorageKeys.USER_TOKEN_KEY_STORE,
  });
  const { updateTabIndex, getTabIndexFromPathName } = useUpdateTabIndex();
  const { updateTabVisible } = useUpdateTabVisible();

  useEffect(() => {
    const tabIndex = getTabIndexFromPathName(path as string);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tabIndex >= 0 && updateTabIndex(tabIndex);
    updateTabVisible(false);
  }, [getTabIndexFromPathName, path, updateTabIndex, updateTabVisible]);

  return (
    <Route path={`${process.env.PUBLIC_URL}${path}`} {...rest}>
      {localStorage.getItem(AsyncStorageKeys.USER_TOKEN_KEY_STORE) ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        children
      )}
    </Route>
  );
}

export default LoginRoute;
