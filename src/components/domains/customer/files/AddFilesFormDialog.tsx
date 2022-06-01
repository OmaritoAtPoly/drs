import React from "react";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import ViewModeActionPanel from "../request/ViewModeActionPanel";
import UploadForm from "./UploadForm";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (value: string) => void;
  uploadingLoading?: boolean;
  localBase64?: Schemas.ResultFileRequest;
}

export default function AddFilesFormDialog({
  handleShow,
  handleUploadFile,
  handleSubmitForm,
  open,
  uploadingLoading = false,
  localBase64,
}: Props) {
  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.generals.ADD_FILES}
      actionPanel={
        <ViewModeActionPanel
          onHistoryClicked={handleShow}
          handleClose={handleShow}
        />
      }>
      <UploadForm
        handleShow={handleShow}
        onImportFile={handleUploadFile}
        handleSubmitForm={handleSubmitForm}
        loading={uploadingLoading}
        localBase64={localBase64}
      />
    </LabeledDialog>
  );
}
