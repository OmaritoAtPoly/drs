import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import Login from "../../../components/domains/auth/login/Login";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useSignInMutation } from "../../../modules/auth/mutation";
import {
  useEnableUserSelector,
  useSaveCurrentProfessionalIdSelector,
} from "../../../modules/profile/cacheSelector";
import useHandlerError from "../../../modules/utils/error/handleError";
import { AsyncStorageKeys } from "../../../modules/utils/storage/AsyncStorageKeys";
import useSetStringItemAsyncStorage from "../../../modules/utils/storage/useSetStringItemAsyncStorage";
import { defaultProfessionalData } from "../../../utils/defaultData";

export default function LoginContainer() {
  const { handlerError } = useHandlerError();
  const { saveEnableUser } = useEnableUserSelector();
  const { saveCurrentProfessionalId } = useSaveCurrentProfessionalIdSelector();
  const history = useHistory();
  const [email, setEmail] = useState("");

  const { mutate: asyncStorageMutate } = useSetStringItemAsyncStorage({
    showError: true,
  });

  const onSuccess = useCallback(
    async ({ token, legalID }: Schemas.TokenLegalID) => {
      if (!token) {
        handlerError("Error desconocido");
        return;
      }
      if (token && !legalID) {
        history.push("/create-professional-user");
        queryCache.setQueryData(ReactQueryKeys["default-dr-profession"], {
          profession: "general",
        });
      }
      if (!legalID) {
        saveEnableUser({
          ...defaultProfessionalData,
          email,
          professionalEmail: email,
          token,
          action: "createMain",
        });

        asyncStorageMutate({
          key: AsyncStorageKeys.USER_TOKEN_KEY_STORE,
          data: token,
        }).then(() => {
          if (!legalID) {
            queryCache.setQueryData(ReactQueryKeys["action-key"], {
              action: "signup",
            });
            queryCache.setQueryData(ReactQueryKeys["default-dr-profession"], {
              profession: "general",
            });
          }
        });
        return;
      }

      saveCurrentProfessionalId({ legalID });
      queryCache.setQueryData([ReactQueryKeys["token-key"]], token);
      await asyncStorageMutate({
        key: AsyncStorageKeys.USER_TOKEN_KEY_STORE,
        data: token,
      });

      await asyncStorageMutate({
        key: AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE,
        data: legalID,
      });

      await asyncStorageMutate({
        key: AsyncStorageKeys.USER_EMAIL_KEY_STORE,
        data: email,
      });

      queryCache.invalidateQueries([AsyncStorageKeys.USER_EMAIL_KEY_STORE]);
      queryCache.invalidateQueries([AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE]);
      queryCache.invalidateQueries([AsyncStorageKeys.USER_TOKEN_KEY_STORE]);

      queryCache.invalidateQueries(ReactQueryKeys["user-me-professional"], {
        exact: true,
      });
      queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
        exact: true,
      });

      history.push("/");
    },
    [
      saveCurrentProfessionalId,
      asyncStorageMutate,
      history,
      handlerError,
      saveEnableUser,
      email,
    ],
  );

  const { mutate, loading } = useSignInMutation({
    onSuccess,
    showError: true,
  });

  const login = useCallback(
    (mail: string, password: string) => {
      setEmail(mail);
      const code = "";
      mutate({ email: mail, password, code });
    },
    [mutate],
  );

  const handleRecoveryPassword = useCallback(() => {
    history.push("/recovery-password");
  }, [history]);

  const handleSignUp = useCallback(() => {
    history.push("/sign-up");
  }, [history]);

  return (
    <Login
      handleLogin={login}
      loading={loading}
      handleRecoveryPassword={handleRecoveryPassword}
      handleSignUp={handleSignUp}
    />
  );
}
