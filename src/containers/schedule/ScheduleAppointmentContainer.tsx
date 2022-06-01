import { DateClickArg, EventResizeDoneArg } from "@fullcalendar/interaction";
import { DatesSetArg, EventClickArg, EventDropArg } from "@fullcalendar/react";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { queryCache } from "react-query";
import ConfirmModal from "../../components/modals/ConfirmModal";
import ScheduleAppointment from "../../components/schedule/appointment/ScheduleAppointment";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useCurrentAppointmentIdCacheSelectorState } from "../../modules/appointment/cacheSelector";
import { useRescheduleAppointmentMutation } from "../../modules/appointment/mutation";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import { useEnableScheduleMutation } from "../../modules/schedule/mutation";
import { useAddLastAlerts } from "../../modules/utils/error/handleError";
import useScheduleUtil from "../../modules/utils/scheduleUtil";
import {
  getFirstDateOfCurrentWeek,
  getLastDateOfCurrentWeek,
} from "../../utils/date";
import { defaultProfessionalData } from "../../utils/defaultData";
import STRINGS from "../../utils/strings";
import AppointmentContainer from "./events/AppointmentContainer";
import EventContainer from "./events/EventContainer";

export default function ScheduleAppointmentContainer() {
  const { loadingUserMe, currentProfessional } = useProfileCacheSelector();
  const [openedEventDialog, setOpenEventDialog] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openedUnlockModal, setOpenUnlockModal] = useState<boolean>(false);
  const { addLastAlerts } = useAddLastAlerts();
  const [eventToEdit, setEventToEdit] = useState<
    EventDropArg | EventResizeDoneArg
  >();
  const [eventToUnlock, setEventToUnlock] = useState<EventClickArg>();
  const [
    openedEditAppointmentDialog,
    setOpenEditAppointmentDialog,
  ] = useState<boolean>(false);

  const [pickedDate, setPickedDate] = useState<Date>();
  const {
    appointmentId,
    saveCurrentAppointmentId,
  } = useCurrentAppointmentIdCacheSelectorState();

  const {
    events,
    loading,
    healthCenterCode,
    setRangeDates,
    setHealthCenterCode,
    getAppointmentEditableRange,
  } = useScheduleUtil();

  const healthCenters = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !loadingUserMe && currentProfessional && currentProfessional.healthCenters
        ? currentProfessional?.healthCenters
        : [],
    [currentProfessional, loadingUserMe],
  );

  const specialties = useMemo(
    () =>
      (!loadingUserMe &&
        currentProfessional &&
        currentProfessional.specialtiesList) ||
      [],
    [currentProfessional, loadingUserMe],
  );

  const currentCenter = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () => {
      if (healthCenterCode) {
        return healthCenters && healthCenters.length > 0
          ? healthCenters.find((health) => health.code === healthCenterCode)
          : undefined;
      }
      return healthCenters && healthCenters.length > 0
        ? healthCenters[0]
        : undefined;
    },
    [healthCenterCode, healthCenters],
  );

  const handleOpenModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const handleOpenUnlockEventModal = useCallback(() => {
    setOpenUnlockModal(!openedUnlockModal);
  }, [openedUnlockModal]);

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-appointment-list-key"],
    );
    queryCache.invalidateQueries([ReactQueryKeys["patient-appointment-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    handleOpenModal();
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.schedule.SUCCESS_RESCHEDULE,
    });
  }, [addLastAlerts, handleOpenModal]);

  const onError = useCallback(() => {
    handleOpenModal();
  }, [handleOpenModal]);

  const { mutate, loading: rescheduling } = useRescheduleAppointmentMutation({
    showError: true,
    onSuccess,
    onError,
  });

  const handleOnEditConfirm = useCallback(() => {
    if (eventToEdit) {
      const range = getAppointmentEditableRange(eventToEdit.event);
      mutate({
        code: eventToEdit.event.id,
        ...range,
      });
    }
  }, [eventToEdit, getAppointmentEditableRange, mutate]);

  const onUnlockSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-schedule-availabilities-key"],
    );
    handleOpenUnlockEventModal();
    addLastAlerts({
      message: STRINGS.appointment.UNLOCK_SCHEDULE_SUCCESS,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts, handleOpenUnlockEventModal]);

  const onUnlockError = useCallback(() => {
    handleOpenUnlockEventModal();
  }, [handleOpenUnlockEventModal]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    mutate: unlockMutate,
    loading: enablingSchedule,
  } = useEnableScheduleMutation({
    showError: true,
    onSuccess: onUnlockSuccess,
    onError: onUnlockError,
  });

  const healCenterCode = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      currentCenter && currentCenter.code !== "REMOTE"
        ? currentCenter.code
        : undefined,
    [currentCenter],
  );
  const serviceCode = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      currentCenter && currentCenter.code === "REMOTE"
        ? "REMOTE"
        : "FACE_TO_FACE",
    [currentCenter],
  );

  const handleOnUnlockConfirm = useCallback(() => {
    if (eventToUnlock && eventToUnlock.event.start && eventToUnlock.event.end) {
      const from = `${eventToUnlock.event.start.getDate()}-${
        eventToUnlock.event.start.getMonth() + 1
      }-${eventToUnlock.event.start.getFullYear()} ${eventToUnlock.event.start.getHours()}:${eventToUnlock.event.start.getMinutes()}`;
      const to = `${eventToUnlock.event.end.getDate()}-${
        eventToUnlock.event.end.getMonth() + 1
      }-${eventToUnlock.event.end.getFullYear()} ${eventToUnlock.event.end.getHours()}:${eventToUnlock.event.end.getMinutes()}`;

      unlockMutate({
        from,
        to,
        healthCenterCode: healCenterCode,
        serviceCode,
      });
    }
  }, [eventToUnlock, healCenterCode, serviceCode, unlockMutate]);

  const handleOnSelectCenter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHealthCenterCode((event.target as HTMLInputElement).value);
    },
    [setHealthCenterCode],
  );

  const handleOpenEventDialog = useCallback(() => {
    setOpenEventDialog(!openedEventDialog);
  }, [openedEventDialog]);

  const handleOpenEditAppointmentDialog = useCallback(() => {
    setOpenEditAppointmentDialog(!openedEditAppointmentDialog);
  }, [openedEditAppointmentDialog]);

  const isValidDate = useCallback((date?: Date) => {
    const currentDate = moment();
    const selectedDate = moment(date || new Date());
    return selectedDate.isAfter(currentDate);
  }, []);

  const handleOnDateClick = useCallback(
    (dateArg: DateClickArg) => {
      if (isValidDate(dateArg.date)) {
        setPickedDate(dateArg.date);
        handleOpenEventDialog();
      } else {
        addLastAlerts({
          message: STRINGS.appointment.NOT_VALID_DATE,
          severity: "error",
          name: "",
        });
      }
    },
    [addLastAlerts, handleOpenEventDialog, isValidDate],
  );

  const handleOnEventClick = useCallback(
    (dateArg: EventClickArg) => {
      const { state } = dateArg.event.extendedProps;
      if (state === "IN_PROGRESS" || state === "PENDENT") {
        saveCurrentAppointmentId(dateArg.event.id);
        handleOpenEditAppointmentDialog();
      } else if (state === "DISABLED") {
        setEventToUnlock(dateArg);
        handleOpenUnlockEventModal();
      }
    },
    [
      handleOpenEditAppointmentDialog,
      handleOpenUnlockEventModal,
      saveCurrentAppointmentId,
    ],
  );

  const handleOnEventDrag = useCallback(
    (arg: EventDropArg) => {
      if (isValidDate(arg.event.start || new Date())) {
        setEventToEdit(arg);
        handleOpenModal();
      } else {
        addLastAlerts({
          message: STRINGS.appointment.NOT_VALID_DATE,
          severity: "error",
          name: "",
        });
        queryCache.invalidateQueries(
          ReactQueryKeys["professional-appointment-list-key"],
        );
      }
    },
    [addLastAlerts, handleOpenModal, isValidDate],
  );
  const handleOnEventResize = useCallback(
    (arg: EventResizeDoneArg) => {
      setEventToEdit(arg);
      handleOpenModal();
    },
    [handleOpenModal],
  );

  const handleOnChangeDate = useCallback(
    (selectedDate: Date) => {
      const firstDate = getFirstDateOfCurrentWeek(selectedDate);
      const lastDate = getLastDateOfCurrentWeek(selectedDate);
      setRangeDates(firstDate, lastDate);
    },
    [setRangeDates],
  );

  const handleOnCalendarSetDate = useCallback(
    (calendarDates: DatesSetArg) => {
      setRangeDates(calendarDates.start, calendarDates.end);
    },
    [setRangeDates],
  );

  useEffect(() => {
    if (!healthCenterCode && currentCenter && currentCenter.code !== "") {
      setHealthCenterCode(currentCenter.code || "");
    }
  });

  useEffect(() => {
    appointmentId && handleOpenEditAppointmentDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScheduleAppointment
        centers={healthCenters}
        centerCode={healthCenterCode || currentCenter?.code || ""}
        events={events || []}
        onSelectCenter={handleOnSelectCenter}
        onDateClick={handleOnDateClick}
        onEventClick={handleOnEventClick}
        handleOnEventDrop={handleOnEventDrag}
        handleOnEventResize={handleOnEventResize}
        handleOnChangeDate={handleOnChangeDate}
        handleOnCalendarSetDate={handleOnCalendarSetDate}
      />
      {pickedDate && (
        <EventContainer
          pickedDate={pickedDate}
          loadingProfessional={loadingUserMe}
          currentProfessional={currentProfessional || defaultProfessionalData}
          open={openedEventDialog}
          center={currentCenter || {}}
          healthCenters={healthCenters}
          specialties={specialties}
          handleShow={handleOpenEventDialog}
        />
      )}
      {appointmentId && (
        <AppointmentContainer
          open={openedEditAppointmentDialog}
          appointmentId={appointmentId}
          healthCenters={healthCenters}
          specialties={specialties}
          loadingProfessional={loadingUserMe}
          currentProfessional={currentProfessional || defaultProfessionalData}
          handleShow={handleOpenEditAppointmentDialog}
        />
      )}
      <ConfirmModal
        open={openModal}
        loadingOnConfirm={rescheduling || loading}
        title={STRINGS.generals.ALERT}
        info={STRINGS.appointment.RESCHEDULE_INFO}
        confirmButtonText={STRINGS.appointment.RESCHEDULE}
        handleShow={handleOpenModal}
        onConfirm={handleOnEditConfirm}
      />
      <ConfirmModal
        open={openedUnlockModal}
        loadingOnConfirm={enablingSchedule || loading}
        title={STRINGS.generals.ALERT}
        info={STRINGS.appointment.UNLOCK_INFO}
        confirmButtonText={STRINGS.generals.CONFIRM}
        handleShow={handleOpenUnlockEventModal}
        onConfirm={handleOnUnlockConfirm}
      />
    </>
  );
}
