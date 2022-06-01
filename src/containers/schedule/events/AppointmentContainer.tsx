/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularProgress } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import { queryCache } from "react-query";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import EditAppointment from "../../../components/schedule/appointment/events/EditAppointment";
import EventDialog from "../../../components/schedule/appointment/events/EventDialog";
import HeaderAppointmentDialog from "../../../components/schedule/appointment/events/HeaderAppointmentDialog";
import ShowAppointment from "../../../components/schedule/appointment/events/ShowAppointment";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useCancelAppointmentMutation,
  useRescheduleAppointmentMutation,
} from "../../../modules/appointment/mutation";
import { useGetAppointmentByCodeQuery } from "../../../modules/appointment/query";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import {
  dateTimeObjectFormatter,
  formatDate,
  getDateTimeObject,
  getMinutesBetweenDates,
} from "../../../utils/date";
import {
  defaultCustomerData,
  defaultHealthCenterData,
} from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

interface Props {
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  open: boolean;
  appointmentId: string;
  healthCenters: Schemas.ProfessionalHealthCenterResponse[];
  specialties: Schemas.SpecialtyResponse[];
  handleShow: () => void;
}

export default function AppointmentContainer({
  loadingProfessional,
  currentProfessional,
  open,
  appointmentId,
  healthCenters,
  specialties,
  handleShow,
}: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [visibleEditModal, setVisibleModal] = useState<boolean>(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState<boolean>(false);

  const { addLastAlerts } = useAddLastAlerts();

  const [
    appointmentToEdit,
    setAppointmentToEdit,
  ] = useState<Schemas.AppointmentCustomerRequest>();

  const { loading, data } = useGetAppointmentByCodeQuery({
    showError: true,
    code: appointmentId,
  });

  const healthCenter = useMemo(
    () => !loading && data && data.healthCenterData,
    [data, loading],
  );

  const dateTime = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !loading && data && data.from ? getDateTimeObject(data.from) : new Date(),
    [data, loading],
  );

  const appointmentDuration = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !loading && data && data.from && data.to
        ? getMinutesBetweenDates(
            getDateTimeObject(data.to) || new Date(),
            getDateTimeObject(data.from) || new Date(),
          )
        : 30,
    [data, loading],
  );

  const customer = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !loading && data && data.customerData
        ? data.customerData
        : defaultCustomerData,
    [data, loading],
  );

  const appointmentFromDate = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () => (!loading && data && data.from ? data.from : {}),
    [data, loading],
  );

  const appointmentState = useMemo(
    () => (!loading && data && data.state ? data.state : ""),
    [data, loading],
  );

  const firstTime = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !loading && data && data.isFirstTimeWithProfessional
        ? data.isFirstTimeWithProfessional
        : false,
    [data, loading],
  );

  const appointmentStringDate = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !loading && data && data.from
        ? dateTimeObjectFormatter(
            {
              ...data.from,
              dateMonth: data.from.dateMonth ? data.from.dateMonth - 1 : 0,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatDate["dddd, D [de] MMMM [de] YYYY, h:mm a"] as any,
          )
        : "",
    [data, loading],
  );

  const invalidateAllCaches = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-appointment-list-key"],
    );
    queryCache.invalidateQueries([ReactQueryKeys["patient-appointment-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
  }, []);

  const handleVisibleEditAppointmentModal = useCallback(() => {
    setVisibleModal(!visibleEditModal);
  }, [visibleEditModal]);

  const handleVisibleDeleteAppointmentModal = useCallback(() => {
    setVisibleDeleteModal(!visibleDeleteModal);
  }, [visibleDeleteModal]);

  const onRescheduleSuccess = useCallback(() => {
    invalidateAllCaches();
    handleShow();
    handleVisibleEditAppointmentModal();
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.schedule.SUCCESS_RESCHEDULE,
    });
  }, [
    addLastAlerts,
    handleVisibleEditAppointmentModal,
    handleShow,
    invalidateAllCaches,
  ]);

  const { mutate, loading: rescheduling } = useRescheduleAppointmentMutation({
    showError: true,
    onSuccess: onRescheduleSuccess,
  });

  const handleEdit = useCallback(
    (request: Schemas.AppointmentCustomerRequest) => {
      setAppointmentToEdit(request);
      handleVisibleEditAppointmentModal();
    },
    [handleVisibleEditAppointmentModal],
  );

  const onDeleteSuccess = useCallback(() => {
    invalidateAllCaches();
    handleVisibleDeleteAppointmentModal();
    handleShow();
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.schedule.SUCCESS_CANCEL,
    });
  }, [
    addLastAlerts,
    handleShow,
    handleVisibleDeleteAppointmentModal,
    invalidateAllCaches,
  ]);

  const {
    mutate: deleteAppointmentMutate,
    loading: deletingAppointment,
  } = useCancelAppointmentMutation({
    showError: true,
    onSuccess: onDeleteSuccess,
  });

  const deleteAppointment = useCallback(() => {
    handleVisibleDeleteAppointmentModal();
  }, [handleVisibleDeleteAppointmentModal]);

  const handleOnEditMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const handleOnClose = useCallback(() => {
    setEditMode(false);
    handleShow();
  }, [handleShow]);

  const handleEditConfirm = useCallback(() => {
    appointmentToEdit &&
      mutate({
        code: appointmentId,
        ...appointmentToEdit,
      });
  }, [appointmentId, appointmentToEdit, mutate]);

  const handleDeleteAppointmentConfirm = useCallback(() => {
    appointmentId && deleteAppointmentMutate({ code: appointmentId });
  }, [appointmentId, deleteAppointmentMutate]);

  return (
    <EventDialog open={open} handleShow={handleShow}>
      <HeaderAppointmentDialog
        label={appointmentStringDate}
        handleOnClose={handleOnClose}
        handleOnEdit={handleOnEditMode}
        editMode={editMode}
        loading={loading}
      />
      {!loading && (
        <>
          {!editMode && (
            <ShowAppointment
              loadingProfessional={loadingProfessional}
              currentProfessional={currentProfessional}
              customer={customer}
              healthCenter={healthCenter || defaultHealthCenterData}
              appointmentDate={appointmentFromDate}
              appointmentState={appointmentState}
              firstTime={firstTime}
              deleting={deletingAppointment}
              handleShow={handleShow}
              deleteAppointment={deleteAppointment}
            />
          )}
          {editMode && (
            <EditAppointment
              editingAppointment={rescheduling}
              healthCenters={healthCenters}
              dateTime={dateTime || new Date()}
              appointmentDurationTime={appointmentDuration}
              specialties={specialties}
              currentProfessional={currentProfessional}
              healthCenter={healthCenter || defaultHealthCenterData}
              loadingProfessional={loadingProfessional}
              customer={customer}
              handleShow={handleShow}
              onEdit={handleEdit}
            />
          )}
        </>
      )}
      <ConfirmModal
        open={visibleEditModal}
        loadingOnConfirm={rescheduling || loading}
        title={STRINGS.generals.ALERT}
        info={STRINGS.appointment.RESCHEDULE_INFO}
        confirmButtonText={STRINGS.appointment.RESCHEDULE}
        handleShow={handleVisibleEditAppointmentModal}
        onConfirm={handleEditConfirm}
      />
      <ConfirmModal
        open={visibleDeleteModal}
        loadingOnConfirm={deletingAppointment || loading}
        title={STRINGS.generals.ALERT}
        info={STRINGS.appointment.CANCEL_INFO}
        confirmButtonText={STRINGS.appointment.DELETE_APPOINTMENT}
        handleShow={handleVisibleDeleteAppointmentModal}
        onConfirm={handleDeleteAppointmentConfirm}
      />
    </EventDialog>
  );
}
