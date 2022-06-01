import React from "react";
import STRINGS from "../../../../../utils/strings";
import LabeledDialog from "../../../../dialogs/LabeledDialog";
import ViewModeActionPanel from "../../request/ViewModeActionPanel";
import InterConsultReportForm from "./InterConsultReportForm";

interface Props {
  open: boolean;
  loading: boolean;
  currentInterConsult: Schemas.InterConsultationResp;
  handleShow: () => void;
  handleOnMakeReport: (requestBody: Schemas.InterConsultationReport) => void;
  attachingFiles: boolean;
  uploadLocalProfessionalFile: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleResetUpload: () => void;
  localBase64: Schemas.ResultFileRequest[];
  deleteAttachmentItem: (name: string) => void;
}

export default function InterConsultReport({
  open,
  loading,
  currentInterConsult,
  handleShow,
  handleOnMakeReport,
  attachingFiles,
  handleResetUpload,
  uploadLocalProfessionalFile,
  localBase64,
  deleteAttachmentItem,
}: Props) {
  return (
    <LabeledDialog
      label={STRINGS.interconsult.INTERCONSULT_REPORT}
      open={open}
      handleShow={handleShow}
      actionPanel={
        <ViewModeActionPanel
          onHistoryClicked={handleShow}
          handleClose={handleShow}
        />
      }>
      <InterConsultReportForm
        loading={loading}
        initialValues={{}}
        currentInterConsult={currentInterConsult}
        handleShow={handleShow}
        handleOnMakeReport={handleOnMakeReport}
        attachingFiles={attachingFiles}
        uploadLocalProfessionalFile={uploadLocalProfessionalFile}
        handleResetUpload={handleResetUpload}
        localBase64={localBase64}
        deleteAttachmentItem={deleteAttachmentItem}
      />
    </LabeledDialog>
  );
}
