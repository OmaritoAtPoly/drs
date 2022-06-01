import React from "react";
import AppointmentActionsDialog from "../../components/domains/appointment/AppointmentActionsDialog";

interface Props {
  open: boolean;
  handleShow: () => void;
  onPlayIn: () => void;
  onFinish: () => void;
  onCancel: () => void;
  onReschedule: () => void;
  loadingFinish?: boolean;
  loadingDelete?: boolean;
  showPatient?: boolean;
  patientId?: string;
}

export default function AppointmentActionsDialogContainer({
  open,
  handleShow,
  onPlayIn,
  onFinish,
  onCancel,
  onReschedule,
  loadingFinish,
  loadingDelete,
  showPatient,
  patientId = "",
}: Props) {
  return (
    <AppointmentActionsDialog
      handleShow={handleShow}
      open={open}
      onPlayIn={onPlayIn}
      onFinish={onFinish}
      onCancel={onCancel}
      onReschedule={onReschedule}
      loadingFinish={loadingFinish}
      loadingDelete={loadingDelete}
      showPatient={showPatient}
      patientId={patientId}
    />
  );
}
