import { CircularProgress } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import { queryCache } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import AssistantProfile from "../../components/domains/assistant/AssistantProfile";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useUpdateUserMutation } from "../../modules/auth/mutation";
import { useProfessionalAssistantCacheSelector } from "../../modules/auth/signUp/assistant/cacheSelector";
import { useActivateAssistantMutation } from "../../modules/auth/signUp/assistant/mutation";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import { useSearch } from "../../modules/utils/route";
import { AsyncStorageKeys } from "../../modules/utils/storage/AsyncStorageKeys";
import useSetStringItemAsyncStorage from "../../modules/utils/storage/useSetStringItemAsyncStorage";
import theme from "../../styles/theme";

interface Props {
  handleShow?: () => void;
}

const AssistantProfileContainer = ({ handleShow }: Props) => {
  const [emailLocal, setEmailLocal] = useState<string | undefined>();
  const {
    assistantToActivate,
    loadingAssistantToActivate,
  } = useProfessionalAssistantCacheSelector();
  const { mutate: asyncStorageMutate } = useSetStringItemAsyncStorage({
    showError: true,
  });

  const { id: assistantId } = useParams<{ id: string }>();
  const { firstNameAssistant, emailAssistant } = useSearch();
  const { push } = useHistory();
  const { isAssistant, currentProfessional } = useProfileCacheSelector();

  const initialValues = useMemo(
    () => ({
      firstName: assistantToActivate?.name ? assistantToActivate.name : "",
      email: assistantToActivate?.email ? assistantToActivate.email : "",
      firstPassword: "",
      secondPassword: "",
    }),
    [assistantToActivate],
  );

  type InitialValues = typeof initialValues;

  const editableValues = useMemo(
    () => ({
      firstName: firstNameAssistant || "",
      email: emailAssistant || "",
      firstPassword: "",
      secondPassword: "",
    }),
    [emailAssistant, firstNameAssistant],
  );

  const onSuccess = useCallback(
    async (token: string) => {
      await asyncStorageMutate({
        key: AsyncStorageKeys.USER_TOKEN_KEY_STORE,
        data: token,
      });

      await asyncStorageMutate({
        key: AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE,
        data: assistantId,
      });

      await asyncStorageMutate({
        key: AsyncStorageKeys.USER_EMAIL_KEY_STORE,
        data: emailLocal || "",
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
      push("/");
    },
    [assistantId, asyncStorageMutate, emailLocal, push],
  );

  const { mutate, loading } = useActivateAssistantMutation({
    onSuccess,
    showError: true,
  });

  const onSuccessEdit = useCallback(() => {
    push("/");
    handleShow && handleShow();
  }, [push, handleShow]);

  const {
    mutate: handleEditableSubmitForm,
    loading: editableLoading,
  } = useUpdateUserMutation({
    onSuccess: onSuccessEdit,
    showError: true,
  });

  const handleSubmitForm = useCallback(
    (values: InitialValues) => {
      setEmailLocal(values.email);
      mutate({
        code: assistantId,
        email: values.email,
        name: values.firstName,
        password: values.firstPassword,
      });
    },
    [mutate, assistantId],
  );

  const handleEditableAssistant = useCallback(
    (values: InitialValues) => {
      handleEditableSubmitForm({
        code: currentProfessional?.assistantCode || "",
        email: values.email,
        forCustomer: false,
        password: values.firstPassword,
      });
    },
    [handleEditableSubmitForm, currentProfessional?.assistantCode],
  );

  return (
    <div>
      {loadingAssistantToActivate ? (
        <CircularProgress size={theme.spacing(3)} /> // todo Gives a better loading interface
      ) : (
        <AssistantProfile
          handleSubmitForm={
            isAssistant() ? handleEditableAssistant : handleSubmitForm
          }
          loading={isAssistant() ? editableLoading : loading}
          initialValues={isAssistant() ? editableValues : initialValues}
          isAssistant={isAssistant}
        />
      )}
    </div>
  );
};

export default AssistantProfileContainer;
