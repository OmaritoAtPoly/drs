import { EventApi } from "@fullcalendar/react";
import { useCallback, useMemo } from "react";
import shortid from "shortid";
import theme from "../../styles/theme";
import useProfessionalAppointmentListQueryCacheSelector from "../appointment/queryCacheSelector";
import useProfessionalScheduleAvailabilityCacheSelector from "../schedule/professionalScheduleCacheSelector";

const useScheduleUtil = () => {
  const {
    appointments,
    healthCenterCode,
    loading,
    setHealthCenterCode: setHealthCenterCodeAppointmentList,
    refetch,
    setRangeDates: setAppointmentListRangeDate,
    from,
  } = useProfessionalAppointmentListQueryCacheSelector({});
  const {
    setHealthCenterCode: setScheduleAvailabilityHealthCenterCode,
    loading: scheduleAvailabilityLoading,
    data: scheduleAvailabilities,
    setRangeDates: setScheduleAvailabilityRangeDate,
  } = useProfessionalScheduleAvailabilityCacheSelector({});

  const getAppointmentEditableRange = useCallback((newEvent: EventApi) => {
    const startDateEvent = newEvent.start || new Date();
    const endDateEvent = newEvent.end || new Date();

    return {
      from: {
        dateDay: startDateEvent.getDate(),
        dateMonth: startDateEvent.getMonth() + 1,
        dateYear: startDateEvent.getFullYear(),
        timeHour: startDateEvent.getHours(),
        timeMinute: startDateEvent.getMinutes(),
      },
      to: {
        dateDay: endDateEvent.getDate(),
        dateMonth: endDateEvent.getMonth() + 1,
        dateYear: endDateEvent.getFullYear(),
        timeHour: endDateEvent.getHours(),
        timeMinute: endDateEvent.getMinutes(),
      },
    };
  }, []);

  const setHealthCenterCode = useCallback(
    (centerCode) => {
      setScheduleAvailabilityHealthCenterCode(centerCode);
      setHealthCenterCodeAppointmentList(centerCode);
    },
    [
      setHealthCenterCodeAppointmentList,
      setScheduleAvailabilityHealthCenterCode,
    ],
  );

  const disabledEvents = useMemo(() => {
    const availabilityEvents =
      !scheduleAvailabilityLoading && scheduleAvailabilities
        ? scheduleAvailabilities?.filter(
            (availabilityEvent) => availabilityEvent.state === "DISABLED",
          )
        : [];
    return availabilityEvents.map((event) => ({
      id: shortid(),
      title: "",
      start: new Date(
        event.from?.dateYear || 1990,
        (event.from?.dateMonth || 1) - 1,
        event.from?.dateDay || 1,
        event.from?.timeHour || 0,
        event.from?.timeMinute || 0,
      ),
      end: new Date(
        event.to?.dateYear || 1990,
        (event.to?.dateMonth || 1) - 1,
        event.to?.dateDay || 1,
        event.to?.timeHour || 0,
        event.to?.timeMinute || 0,
      ),
      durationEditable: false,
      backgroundColor: theme.palette.grey[300],
      editable: false,
      extendedProps: {
        state: event.state,
      },
    }));
  }, [scheduleAvailabilities, scheduleAvailabilityLoading]);

  const inProgressEvents = useMemo(() => {
    const progressEvent = appointments.filter(
      (appointment) =>
        appointment.state === "IN_PROGRESS" || appointment.state === "PENDENT",
    );

    return progressEvent.map((appointment) => ({
      id: appointment.code,
      title: `${appointment.customerData?.firstName} ${appointment.customerData?.firstFamilyName}`,
      start: new Date(
        appointment.from?.dateYear || 1990,
        (appointment.from?.dateMonth || 1) - 1,
        appointment.from?.dateDay || 1,
        appointment.from?.timeHour || 0,
        appointment.from?.timeMinute || 0,
      ),
      end: new Date(
        appointment.to?.dateYear || 1990,
        (appointment.to?.dateMonth || 1) - 1,
        appointment.to?.dateDay || 1,
        appointment.to?.timeHour || 0,
        appointment.to?.timeMinute || 0,
      ),
      durationEditable: true,
      backgroundColor: theme.palette.primary.main,
      extendedProps: {
        state: appointment.state,
      },
    }));
  }, [appointments]);

  const setRangeDates = useCallback(
    (fromDate: Date, toDate: Date) => {
      setAppointmentListRangeDate(fromDate, toDate);
      setScheduleAvailabilityRangeDate(fromDate, toDate);
    },
    [setAppointmentListRangeDate, setScheduleAvailabilityRangeDate],
  );

  return {
    from,
    events: [...inProgressEvents, ...disabledEvents],
    loading,
    appointments,
    healthCenterCode,
    refetch,
    setRangeDates,
    setHealthCenterCode,
    getAppointmentEditableRange,
  };
};

export default useScheduleUtil;
