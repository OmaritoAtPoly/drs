import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import ProcedureHistoryDialog from "../../../components/domains/customer/procedure/ProcedureHistoryDialog";
import ProcedureResumeDialog from "../../../components/domains/customer/procedure/ProcedureResumeDialog";
import useCurrentProcedureToEditCacheSelector, {
  useCustomerProceduresList,
} from "../../../modules/customer/procedures/cacheSelector";
import useCurrentProcedureToEditQuery from "../../../modules/customer/procedures/query";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { defaultProcedure } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";
import useProcedureDelete, {
  useInsertOrEditProcedure,
  useProcedurePrintDownload,
  useSendByCell,
  useSendMail,
} from "./ProcedureUtils";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleDialogName: (value: string) => void;
}

export default function ProcedureHistoryContainer({
  handleShow,
  open,
  handleDialogName,
}: Props) {
  const { currentPatient } = usePatientCacheSelector({});
  const { id: patientId } = useParams<{ id: string }>();
  const { procedures, loadingProcedures } = useCustomerProceduresList(
    patientId,
  );

  const {
    saveCurrentProcedureToEdit,
  } = useCurrentProcedureToEditCacheSelector();
  const { handleDeleteProcedure, deleteLoading } = useProcedureDelete();
  const { loadingPrintPdf, handlePrintPdf } = useProcedurePrintDownload();

  const handleNewProcedure = useCallback(() => {
    handleDialogName(STRINGS.procedure.NEW_PROCEDURE);
    saveCurrentProcedureToEdit(undefined);
  }, [handleDialogName, saveCurrentProcedureToEdit]);

  const { resumeOpen, handleResumeShow } = useInsertOrEditProcedure();
  const { handleSendEmail, loadingSendEmail } = useSendMail();
  const { handleCellAction, loadingSendCell } = useSendByCell();
  const { data: initialData } = useCurrentProcedureToEditQuery();

  const handleShowResume = useCallback(
    (requestCode: string) => {
      const procedureInfo = procedures?.find((a) => a.code === requestCode);
      saveCurrentProcedureToEdit(procedureInfo);
      handleResumeShow();
    },
    [procedures, saveCurrentProcedureToEdit, handleResumeShow],
  );

  const handleEditProcedure = useCallback(
    (requestCode: string) => {
      handleDialogName(STRINGS.procedure.NEW_PROCEDURE);
      saveCurrentProcedureToEdit(
        procedures?.find((procedureCode) => procedureCode.code === requestCode),
      );
    },
    [handleDialogName, procedures, saveCurrentProcedureToEdit],
  );

  return (
    <>
      <ProcedureHistoryDialog
        handleShow={handleShow}
        open={open}
        procedureData={procedures || [{ details: [], diagnoses: [] }]}
        currentPatient={currentPatient}
        loadingData={loadingProcedures || false}
        loadingSendCell={loadingSendCell}
        loadingSendEmail={loadingSendEmail}
        handleDeleteProcedure={handleDeleteProcedure}
        deleteLoading={deleteLoading}
        handlePrintPdf={handlePrintPdf}
        loadingPrintPdf={loadingPrintPdf}
        handleNewProcedure={handleNewProcedure}
        handleShowResume={handleShowResume}
        handleEditAction={handleEditProcedure}
        handleSendEmail={handleSendEmail}
        handleCellAction={handleCellAction}
      />
      <ProcedureResumeDialog
        open={resumeOpen}
        initialData={initialData || defaultProcedure}
        loadingSendEmail={loadingSendEmail}
        loadingPrintPdf={loadingPrintPdf}
        loadingCellAction={loadingSendCell}
        handleShow={handleResumeShow}
        onSendEmail={handleSendEmail}
        onPrintPdf={handlePrintPdf}
        onTimeBackAction={handleResumeShow}
        handleCellAction={handleCellAction}
        onClose
      />
    </>
  );
}
