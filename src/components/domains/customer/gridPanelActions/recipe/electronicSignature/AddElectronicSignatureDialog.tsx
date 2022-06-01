import React from "react";
import STRINGS from "../../../../../../utils/strings";
import LabeledDialog from "../../../../../dialogs/LabeledDialog";
import UploadElectronicSignature from "./UploadElectronicSignature";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (keyword: string) => void;
  uploadingLoading?: boolean;
  localBase64?: { base64: string, name: string };
  handleShowPassword: () => void;
  showPassword: boolean;
}

export default function AddElectronicSignatureDialog({
  handleShow,
  handleUploadFile,
  handleSubmitForm,
  open,
  uploadingLoading = false,
  localBase64,
  handleShowPassword,
  showPassword,
}: Props) {
  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.generals.E_SIGNATURE}
      actionPanel={<span />}>
      <UploadElectronicSignature
        handleShow={handleShow}
        onImportFile={handleUploadFile}
        handleSubmitForm={handleSubmitForm}
        loading={uploadingLoading}
        localBase64={localBase64}
        handleShowPassword={handleShowPassword}
        showPassword={showPassword}
      />
    </LabeledDialog>
  );
}
