import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import AddElectronicSignatureDialog from "../../../components/domains/customer/gridPanelActions/recipe/electronicSignature/AddElectronicSignatureDialog";
import ElectronicSignature from "../../../components/domains/customer/gridPanelActions/recipe/electronicSignature/ElectronicSignature";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useUploadElectronicSignatureMutation from "../../../modules/electronicSignature/mutation";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import useHandlerError, { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { convertFileToBase64 } from "../../../utils/file";
import STRINGS from "../../../utils/strings";

const ElectronicSignatureContainer = () => {
  const { addLastAlerts } = useAddLastAlerts();
  const { currentProfessional } = useProfileCacheSelector();

  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [localBase64, setLocalBase64] = useState({
    base64: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowAddForm = useCallback(() => {
    setOpenAddForm(!openAddForm);
  }, [openAddForm]);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const { handlerError } = useHandlerError();

  const onSuccessImportFiles = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.SUCCESS_PROFESSIONAL_FILE,
      severity: "success",
      name: "",
    });
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
      exact: true,
    });
    handleShowAddForm();
    setLocalBase64({ base64: "", name: "" });
  }, [addLastAlerts, handleShowAddForm]);

  const { mutate, loading: loadingUpload } = useUploadElectronicSignatureMutation({
    onSuccess: onSuccessImportFiles,
    showError: true,
  });

  const handleProfessionalElectronicSignature = useCallback(
    (keyword: string) =>
    (localBase64.base64 ?
     (mutate({
        base64: localBase64.base64,
        name: localBase64.name,
        password: keyword,
      }))
      : handlerError(STRINGS.error.UPLOAD_FILE_FIRST)),
    [mutate, localBase64.base64, localBase64.name, handlerError],
  );

  const handleLocalProfessionalElectronicSignature = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      base64 && setLocalBase64({ base64, name: file?.name || "" });
    },
    [],
  );

  return (
    <>
      <AddElectronicSignatureDialog
        handleSubmitForm={handleProfessionalElectronicSignature}
        handleUploadFile={handleLocalProfessionalElectronicSignature}
        uploadingLoading={loadingUpload}
        open={openAddForm}
        handleShow={handleShowAddForm}
        localBase64={localBase64}
        handleShowPassword={handleShowPassword}
        showPassword={showPassword}
      />
      <ElectronicSignature
        currentProfessional={currentProfessional}
        handleShowAddForm={handleShowAddForm}
      />
    </>
  );
};

export default ElectronicSignatureContainer;
