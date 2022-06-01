import React, { useCallback, useEffect, useState } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import RecoveryPassword from "../../../components/domains/auth/recoveryPassword/RecoveryPassword";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../../modules/apiTypes";
import {
  useRegisterEmailMutation,
  useSendValidationEmailMutation,
  useValidateEmailMutation,
} from "../../../modules/auth/mutation";
import { useEmailCodeAfterValidateSelector } from "../../../modules/profile/cacheSelector";
import { useProfessionalMailQuery } from "../../../modules/profile/query";
import useHandlerError, {
  useAddLastAlerts,
} from "../../../modules/utils/error/handleError";
import {
  AsyncStorageKeys,
  setStringItemAsyncStore,
} from "../../../modules/utils/storage/AsyncStorageKeys";
import STRINGS from "../../../utils/strings";
import ValidatePinCodeDialog from "../recoveryPassword/ValidatePinCodeDialog";

export default function SignUpContainer() {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const { handlerError } = useHandlerError();
  const { addLastAlerts } = useAddLastAlerts();
  const { data: currentMail } = useProfessionalMailQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
  });

  const { saveEmailCodeAfterValidate } = useEmailCodeAfterValidateSelector();

  useEffect(() => {
    // this fn fulfill the cache when it's opened for first time.
    if (!currentMail?.email) {
      queryCache.setQueryData(ReactQueryKeys["email-key"], {
        email: "",
      });
    }
  }, [currentMail?.email]);

  const onSuccess = useCallback(
    (
      data: keyof Pick<Paths.SendValidation.Responses.$200, "data">,
      variables: Schemas.EmailRequest,
    ) => {
      queryCache.setQueryData(ReactQueryKeys["email-key"], {
        email: variables.email,
      });
      setOpen(true);
    },
    [],
  );

  const onSuccessResendEmail = useCallback(
    (
      data: keyof Pick<Paths.SendValidation.Responses.$200, "data">,
      variables: Schemas.EmailRequest,
    ) => {
      queryCache.setQueryData(ReactQueryKeys["email-key"], {
        email: variables.email,
      });
      setOpen(true);
      addLastAlerts({
        message: STRINGS.recovery.RESENT_CODE,
        severity: "success",
        name: "",
      });
    },
    [addLastAlerts],
  );

  const eraseMail = useCallback(() => {
    // This Fn erase a wrong  mail from cache
    queryCache.setQueryData(ReactQueryKeys["email-key"], {
      email: "",
    });
    setOpen(false);
  }, []);

  const { mutate } = useRegisterEmailMutation({
    onSuccess,
    showError: true,
    onError: eraseMail,
  });

  const sendEmailCode = useCallback(
    (email: string) => {
      mutate({ email });
    },
    [mutate],
  );

  const codeAndMailValidated = useCallback(
    async (data: string) => {
      if (currentMail?.email) {
        history.push("/change-password");
        queryCache.setQueryData(
          ReactQueryKeys["current-professional-email-password-key"],
          {
            email: currentMail.email,
            code: data,
          },
        );
        queryCache.setQueryData(ReactQueryKeys["action-key"], {
          action: "signup",
        });

        await setStringItemAsyncStore(
          AsyncStorageKeys.USER_EMAIL_KEY_STORE,
          currentMail.email,
        );

        await setStringItemAsyncStore(
          AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE,
          data,
        );
        saveEmailCodeAfterValidate({ code: data });
      }
    },
    [history, currentMail?.email, saveEmailCodeAfterValidate],
  );

  const handleOpenDialog = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const { mutate: validateCode } = useValidateEmailMutation({
    onSuccess: codeAndMailValidated,
    showError: true,
  });

  const handleCodeVerification = useCallback(
    (value: string) => {
      if (currentMail) {
        const { email } = currentMail;
        validateCode({
          code: value,
          email,
        });
      }
    },
    [validateCode, currentMail],
  );

  const { mutate: resendEmailMutation } = useSendValidationEmailMutation({
    onSuccess: onSuccessResendEmail,
    showError: true,
  });

  const resendEmail = useCallback(() => {
    if (currentMail) {
      const { email } = currentMail;
      resendEmailMutation({ email });
    } else {
      handlerError({
        message: STRINGS.error.CACHE_ERROR,
        treatedError: true,
        name: "",
      });
    }
  }, [currentMail, handlerError, resendEmailMutation]);

  return (
    <div>
      <RecoveryPassword
        loading={false}
        sendEmailCode={sendEmailCode}
        mode="register"
      />
      <ValidatePinCodeDialog
        mail={currentMail?.email}
        open={open}
        setOpen={handleOpenDialog}
        handleCodeVerification={handleCodeVerification}
        resendEmail={resendEmail}
      />
    </div>
  );
}
