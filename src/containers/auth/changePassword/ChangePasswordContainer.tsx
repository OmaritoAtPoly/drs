import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import ChangePassword from "../../../components/domains/auth/changePassword/ChangePassword";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../../modules/apiTypes";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
} from "../../../modules/auth/mutation";
import useProfileCacheSelector, { useEmailCodeAfterValidateSelector } from "../../../modules/profile/cacheSelector";
import { useActionModeQuery } from "../../../modules/profile/query";
import { useSearch } from "../../../modules/utils/route";
import {
  AsyncStorageKeys,
  setStringItemAsyncStore,
} from "../../../modules/utils/storage/AsyncStorageKeys";

const ChangePasswordContainer = () => {
  const { push, goBack } = useHistory();
  const { edit } = useSearch();
  const { currentProfessional, email } = useProfileCacheSelector();
  const { emailCodeAfterValidate } = useEmailCodeAfterValidateSelector();
  const onSuccessUpdateUser = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["user-me-professional"]], {
      exact: true,
      refetchActive: true,
      refetchInactive: true,
    });
    goBack();
  }, [goBack]);

  const {
    mutate: mutationUpdateUser,
    loading: loadingUpdateUser,
  } = useUpdateUserMutation({
    showError: true,
    onSuccess: onSuccessUpdateUser,
  });

  const { data: actionMode } = useActionModeQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
  });

  const onSuccess = useCallback(
    async (data) => {
      if (actionMode?.action === "recovery-password") {
        if (data && !!currentProfessional.legalID) {
          queryCache.setQueryData([ReactQueryKeys["token-key"]], data);
          await setStringItemAsyncStore(
            AsyncStorageKeys.USER_TOKEN_KEY_STORE,
            data,
          );
          push("/");
        }
        !currentProfessional.legalID && push("/login");
      } else if (actionMode?.action === "signup") {
        queryCache.setQueryData([ReactQueryKeys["token-key"]], data);
        await setStringItemAsyncStore(
          AsyncStorageKeys.USER_TOKEN_KEY_STORE,
          data,
        );
        push("/create-professional-user");
        queryCache.setQueryData(ReactQueryKeys["default-dr-profession"], {
          profession: "general",
        });
      }
    },
    [actionMode?.action, currentProfessional, push],
  );

  const { mutate } = useChangePasswordMutation({
    onSuccess,
    showError: true,
  });

  const handleChangePassword = useCallback(
    (value: string) => {
      if (edit && currentProfessional) {
        mutationUpdateUser({
          code: currentProfessional.legalID,
          email,
          password: value,
        });
        return;
      }

      mutate({
        code: emailCodeAfterValidate?.code ? emailCodeAfterValidate.code : "",
        email,
        password: value,
      });
    },
    [currentProfessional, edit, email, mutate, mutationUpdateUser, emailCodeAfterValidate?.code],
  );

  return (
    <ChangePassword
      loading={loadingUpdateUser || loadingUpdateUser}
      handleChangePassword={handleChangePassword}
    />
  );
};

export default ChangePasswordContainer;
