import React, { useCallback, useState } from "react";
import AppointmentActionsDialogContainer from "../../../../../containers/appointment/AppointmentActionsDialogContainer";
import STRINGS from "../../../../../utils/strings";
import ConfirmModal from "../../../../modals/ConfirmModal";
import RecentAppointment from "./RecentAppointment";

interface Props {
  handlePlayIn: (patientId: string, codeAppointment: string) => void;
  handleFinish: (patientId: string, codeAppointment: string) => void;
  handleCancel: (patientId: string, codeAppointment: string) => void;
  handleAddCallback: (patientId: string, codeAppointment: string) => void;
  handleReschedule: (codeAppointment: string) => void;
  loadingFinish?: boolean;
  showAppointmentItemDialog?: boolean;
  handleShowAppointmentItemDialog: () => void;
  loadingDelete?: boolean;
  fetchMore?: () => void;
  canFetchMore?: boolean;
  handleAddDay: () => void;
  handleRestDay: () => void;
  handleToday: () => void;
  selectedDate: Date;
  appointments: Schemas.AppointmentData[];
  isFetchingMore: boolean;
  loading: boolean;
  handleOnConfirmDelete: (code: string) => void;
  handleOpenModal: () => void;
  openModal: boolean;
}

export default function RecentAppointmentDialog({
  handlePlayIn,
  handleCancel,
  handleReschedule,
  handleShowAppointmentItemDialog,
  showAppointmentItemDialog = false,
  loadingDelete,
  fetchMore,
  handleAddDay,
  handleToday,
  canFetchMore,
  selectedDate,
  handleRestDay,
  appointments,
  isFetchingMore,
  loading,
  handleOnConfirmDelete,
  handleOpenModal,
  openModal,
  handleFinish,
  loadingFinish,
  handleAddCallback,
}: Props) {
  const [appointmentId, setAppointmentId] = useState<string | undefined>(
    undefined,
  );
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);

  const handleOnCancel = useCallback(() => {
    customerId && appointmentId && handleCancel(customerId, appointmentId);
  }, [appointmentId, customerId, handleCancel]);

  const handleOnPlayIn = useCallback(() => {
    customerId && appointmentId && handlePlayIn(customerId, appointmentId);
  }, [appointmentId, customerId, handlePlayIn]);

  const handleOnFinish = useCallback(() => {
    customerId && appointmentId && handleFinish(customerId, appointmentId);
  }, [appointmentId, customerId, handleFinish]);

  const handleOnReschedule = useCallback(() => {
    appointmentId && handleReschedule(appointmentId);
  }, [appointmentId, handleReschedule]);

  const handleEditCallBack = useCallback(
    (patientId: string, appointment: string) => {
      setAppointmentId(appointment);
      setCustomerId(patientId);
      handleShowAppointmentItemDialog();
    },
    [handleShowAppointmentItemDialog],
  );
  const handleAddOnCallback = useCallback(
    (patientId: string, appointment: string) => {
      setAppointmentId(appointment);
      setCustomerId(patientId);
      handleAddCallback(patientId, appointment);
    },
    [handleAddCallback],
  );

  return (
    <>
      <RecentAppointment
        selectedDate={selectedDate}
        handleAddDay={handleAddDay}
        handleRestDay={handleRestDay}
        handleToday={handleToday}
        appointments={appointments}
        loading={loading || !!isFetchingMore}
        fetchMore={fetchMore}
        hasNextPage={canFetchMore}
        handleOnConfirmDelete={handleOnConfirmDelete}
        handleEditCallBack={handleEditCallBack}
        handleAddCallback={handleAddOnCallback}
      />
      <AppointmentActionsDialogContainer
        open={showAppointmentItemDialog}
        handleShow={handleShowAppointmentItemDialog}
        onPlayIn={handleOnPlayIn}
        onFinish={handleOnFinish}
        onCancel={handleOpenModal}
        onReschedule={handleOnReschedule}
        loadingDelete={loadingDelete}
        showPatient
        patientId={customerId}
        loadingFinish={loadingFinish}
      />
      <ConfirmModal
        title={STRINGS.appointment.DO_YOU_WANT_TO_CANCEL_THE_APPOINTMENT}
        open={openModal}
        handleShow={handleOpenModal}
        onConfirm={handleOnCancel}
      />
    </>
  );
}
