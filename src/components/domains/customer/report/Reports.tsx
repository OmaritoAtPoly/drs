import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import ReportResumeDialog from "./ReportResumeDialog";
import ReportForm from "./ReportForm";
import ActionCertificatesResume from "../certificate/ActionCertificatesResume";

interface Props {
  initialData: Schemas.ReportResponse;
  open: boolean;
  handleShow: () => void;
  resumeOpen?: boolean;
  handleResumeShow: () => void;
  handleDialogName: (labelName: string) => void;
  handleSendEmail: (requestCode?: string) => void;
  handleCellAction: (requestCode?: string) => void;
  handlePrintPdf: (requestCode?: string) => void;
  handleAddOrEditReport: (values: Schemas.ReportRequest) => void;
  loadingSendEmail?: boolean;
  loadingPrintPdf?: boolean;
  loadingReport?: boolean;
  loadingCellAction?: boolean;
  handleClose: () => void;
}

export default function Reports({
  initialData,
  open,
  handleShow,
  resumeOpen = false,
  handleResumeShow,
  handleDialogName,
  handleSendEmail,
  handleAddOrEditReport,
  handlePrintPdf,
  loadingSendEmail,
  loadingPrintPdf,
  loadingReport,
  handleCellAction,
  loadingCellAction,
  handleClose,
}: Props) {
  const handleHistoryDialog = useCallback(
    () => handleDialogName(STRINGS.reports.REPORTS_HISTORY),
    [handleDialogName],
  );

  return (
    <>
      <LabeledDialog
        label={STRINGS.reports.NEW_REPORT}
        open={open}
        handleShow={handleShow}
        actionPanel={
          <ActionCertificatesResume
            onHistoryClicked={handleHistoryDialog}
            handleClose={handleShow}
          />
        }>
        <ReportForm
          handleSubmit={handleAddOrEditReport}
          handleShow={handleShow}
          loadingReport={loadingReport}
          initialData={initialData}
        />
      </LabeledDialog>
      <ReportResumeDialog
        handleShow={handleResumeShow}
        open={resumeOpen}
        initialData={initialData}
        handleSendEmail={handleSendEmail}
        loadingSendEmail={loadingSendEmail}
        handlePrintPdf={handlePrintPdf}
        loadingPrintPdf={loadingPrintPdf}
        handleHistoryClicked={handleHistoryDialog}
        handleCellAction={handleCellAction}
        loadingCellAction={loadingCellAction}
        handleClose={handleClose}
      />
    </>
  );
}
