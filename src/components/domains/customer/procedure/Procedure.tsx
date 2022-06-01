import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import ActionCertificatesResume from "../certificate/ActionCertificatesResume";
import ProcedureForm from "./ProcedureForm";
import ProcedureResumeDialog from "./ProcedureResumeDialog";

interface Props {
  initialData: Schemas.ProcedureResponse;
  open: boolean;
  resumeOpen?: boolean;
  loadingCellAction?: boolean;
  loadingSendEmail?: boolean;
  loadingPrintPdf?: boolean;
  loadingProcedure?: boolean;
  handleShow: () => void;
  handleDialogName: (labelName: string) => void;
  onSendEmail: (requestCode?: string) => void;
  onPrintPdf: (requestCode?: string) => void;
  onAddOrEditProcedure: (values: Schemas.ProcedureRequest) => void;
  handleCellAction: (requestCode?: string) => void;
  procedures: Schemas.ProcedureResponse[];
  saveCurrentProcedureToEdit: (
    data?: Schemas.ProcedureResponse | undefined,
  ) => void;
}

export default function Procedure({
  handleShow,
  handleDialogName,
  onSendEmail,
  onAddOrEditProcedure,
  onPrintPdf,
  handleCellAction,
  initialData,
  open = true,
  resumeOpen = false,
  loadingSendEmail,
  loadingPrintPdf,
  loadingProcedure,
  loadingCellAction,
  procedures,
  saveCurrentProcedureToEdit,
}: Props) {
  const handleHistoryDialog = useCallback(
    () => handleDialogName(STRINGS.procedure.PROCEDURE_HISTORY),
    [handleDialogName],
  );

  return (
    <>
      <LabeledDialog
        label={STRINGS.procedure.NEW_PROCEDURE.toUpperCase()}
        open={open}
        handleShow={handleShow}
        actionPanel={
          <ActionCertificatesResume
            onHistoryClicked={handleHistoryDialog}
            handleClose={handleShow}
          />
        }>
        <ProcedureForm
          handleSubmit={onAddOrEditProcedure}
          handleShow={handleShow}
          loadingProcedure={loadingProcedure}
          initialData={initialData}
          procedures={procedures}
          saveCurrentProcedureToEdit={saveCurrentProcedureToEdit}
        />
      </LabeledDialog>
      <ProcedureResumeDialog
        open={resumeOpen}
        initialData={initialData}
        loadingSendEmail={loadingSendEmail}
        loadingPrintPdf={loadingPrintPdf}
        loadingCellAction={loadingCellAction}
        handleShow={handleShow}
        onSendEmail={onSendEmail}
        onPrintPdf={onPrintPdf}
        onTimeBackAction={handleHistoryDialog}
        handleCellAction={handleCellAction}
      />
    </>
  );
}
