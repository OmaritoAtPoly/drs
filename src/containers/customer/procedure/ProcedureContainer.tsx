import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Procedure from "../../../components/domains/customer/procedure/Procedure";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import useCurrentProcedureToEditCacheSelector, {
  useCustomerProceduresList,
} from "../../../modules/customer/procedures/cacheSelector";
import { defaultProcedure } from "../../../utils/defaultData";
import {
  useInsertOrEditProcedure,
  useProcedurePrintDownload,
  useSendByCell,
  useSendMail,
} from "./ProcedureUtils";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleDialogName: (labelName: string) => void;
}

export default function ProcedureContainer({
  open,
  handleShow,
  handleDialogName,
}: Props) {
  const {
    saveCurrentProcedureToEdit,
  } = useCurrentProcedureToEditCacheSelector();
  const { loadingPrintPdf, handlePrintPdf } = useProcedurePrintDownload();
  const {
    initialData,
    resumeOpen,
    loadingEdit,
    insertingProcedure,
    onAddOrEditProcedure,
  } = useInsertOrEditProcedure();
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();
  const {
    data: initialDataAppointmentRecord,
  } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });

  const { handleSendEmail, loadingSendEmail } = useSendMail();
  const { handleCellAction, loadingSendCell } = useSendByCell();

  const { id: patientId } = useParams<{ id: string }>();
  const { procedures } = useCustomerProceduresList(patientId);

  const initialDataMemo = useMemo(
    () =>
      ({
        ...initialData,
        diagnoses: initialData
          ? initialData?.diagnoses
          : initialDataAppointmentRecord?.diagnoses,
      } || defaultProcedure),
    [initialData, initialDataAppointmentRecord?.diagnoses],
  );

  return (
    <Procedure
      initialData={initialDataMemo}
      resumeOpen={resumeOpen}
      loadingSendEmail={loadingSendEmail}
      loadingPrintPdf={loadingPrintPdf}
      loadingProcedure={loadingEdit || insertingProcedure}
      loadingCellAction={loadingSendCell}
      open={open}
      handleShow={handleShow}
      handleDialogName={handleDialogName}
      onAddOrEditProcedure={onAddOrEditProcedure}
      onSendEmail={handleSendEmail}
      onPrintPdf={handlePrintPdf}
      handleCellAction={handleCellAction}
      procedures={procedures || []}
      saveCurrentProcedureToEdit={saveCurrentProcedureToEdit}
    />
  );
}
