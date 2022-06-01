/* eslint-disable no-plusplus */
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { queryCache } from "react-query";
import UnlockSchedule from "../../components/schedule/appointment/events/UnlockSchedule";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useEnableScheduleMutation } from "../../modules/schedule/mutation";
import useProfessionalScheduleAvailabilityCacheSelector from "../../modules/schedule/professionalScheduleCacheSelector";
import useScheduleUtility from "../../modules/utils/availability";
import { useAddLastAlerts } from "../../modules/utils/error/handleError";
import {
  getDateTimeObjectMoment,
  getLastDateOfCurrentWeek,
} from "../../utils/date";
import { defaultProfessionalAppointmentDurationInMinutes } from "../../utils/defaultData";
import STRINGS from "../../utils/strings";
import { AvailabilityGridItem } from "../../utils/types";

interface Props {
  healthCenter: Schemas.ProfessionalHealthCenterResponse;
  currentProfessional: Schemas.ProfessionalData;
  loadingProfessional: boolean;
  selectedDate: Date;
  handleShow: () => void;
}

export default function AvailabilityScheduleContainer({
  healthCenter,
  currentProfessional,
  loadingProfessional,
  selectedDate,
  handleShow,
}: Props) {
  const { availabilityGrid, loadingConfiguration } = useScheduleUtility(
    healthCenter.code === "REMOTE" || healthCenter.code === undefined
      ? STRINGS.schedule.REMOTE_APPOINTMENT
      : healthCenter.code,
    currentProfessional.appointmentDurationInMinutes || 30,
  );

  const {
    data,
    loading: loadingDisabledDates,
    setRangeDates,
  } = useProfessionalScheduleAvailabilityCacheSelector({
    centerCode: healthCenter.code,
  });

  const [pickedDate, setPickedDate] = useState<Date>(selectedDate);
  const { addLastAlerts } = useAddLastAlerts();

  const currentDisabledDates = useMemo(
    () =>
      data?.filter(
        (date) =>
          date.from?.dateDay === pickedDate.getDate() &&
          date.state === "DISABLED",
      ),
    [data, pickedDate],
  );

  const onSuccess = useCallback(() => {
    handleShow();
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-schedule-availabilities-key"],
    );
    addLastAlerts({
      message: STRINGS.appointment.UNLOCK_SCHEDULE_SUCCESS,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts, handleShow]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, loading: enablingSchedule } = useEnableScheduleMutation({
    showError: true,
    onSuccess,
  });

  const getWeekDayConfig = useCallback(
    (index: number) => {
      if (availabilityGrid) {
        return index === 0
          ? [...availabilityGrid[6]]
          : [...availabilityGrid[index - 1]];
      }
      return [];
    },
    [availabilityGrid],
  );

  const getWeekDayIndex = useCallback((date?: Date) => {
    const index = date ? date.getDay() : -1;
    return index;
  }, []);

  const isDisabledRange = useCallback(
    (
      currentHour: number,
      currentMinute: number,
      from?: Schemas.DateTimeObject,
      to?: Schemas.DateTimeObject,
    ) => {
      const momentFrom = from && getDateTimeObjectMoment(from);
      const momentTo = to && getDateTimeObjectMoment(to);
      const momentCurrent = moment(pickedDate);
      momentCurrent.set("hours", currentHour);
      momentCurrent.set("minutes", currentMinute);
      return momentCurrent.isBetween(momentFrom, momentTo, undefined, "[]");
    },
    [pickedDate],
  );

  const prepareGridWeekDayConfig = useCallback(
    (weekDayConfig: AvailabilityGridItem[]) => {
      const gridWeekDayConfig: AvailabilityGridItem[][] = [];
      for (let i = 0; i < 24; i++) {
        const gridWeekDayColumn: AvailabilityGridItem[] = [];
        let row = 0;
        for (let j = 0; j < weekDayConfig.length; j++) {
          if (weekDayConfig[j].hour === i) {
            gridWeekDayColumn.push({
              column: i,
              row: row++,
              hour: weekDayConfig[j].hour,
              minute: weekDayConfig[j].minute,
              status:
                weekDayConfig[j].status === "ACTIVE"
                  ? "DISABLED"
                  : weekDayConfig[j].status,
            });
          }
        }
        gridWeekDayConfig.push(gridWeekDayColumn);
      }
      return gridWeekDayConfig;
    },
    [],
  );

  const isDisabled = useCallback(
    (dayConfig: AvailabilityGridItem) => {
      const index = currentDisabledDates?.findIndex((disabledDate) =>
        isDisabledRange(
          dayConfig.hour,
          dayConfig.minute,
          disabledDate.from,
          disabledDate.to,
        ),
      );
      return index !== -1;
    },
    [currentDisabledDates, isDisabledRange],
  );

  const unselectDisabledDates = useCallback(
    (weekDayConfig: AvailabilityGridItem[]) => {
      const unselectedDisabledDates: AvailabilityGridItem[] = [];
      // eslint-disable-next-line array-callback-return
      weekDayConfig.map((dayConfig: AvailabilityGridItem) => {
        if (isDisabled(dayConfig)) {
          unselectedDisabledDates.push({ ...dayConfig, status: "REGULAR" });
        } else {
          unselectedDisabledDates.push(dayConfig);
        }
      }, []);
      return unselectedDisabledDates;
    },
    [isDisabled],
  );

  const preparedWeekGrid = useMemo(() => {
    if (pickedDate && !loadingConfiguration && !loadingDisabledDates) {
      const index = getWeekDayIndex(pickedDate);
      const weekDayConfig = getWeekDayConfig(index);
      const unselectedDates = unselectDisabledDates(weekDayConfig);
      return prepareGridWeekDayConfig(unselectedDates);
    }
    return [];
  }, [
    pickedDate,
    loadingConfiguration,
    loadingDisabledDates,
    getWeekDayIndex,
    getWeekDayConfig,
    unselectDisabledDates,
    prepareGridWeekDayConfig,
  ]);

  const handleOnPickedDate = useCallback(
    (date?: Date) => {
      const currentPickedDate = date || new Date();
      setPickedDate(currentPickedDate);
      setRangeDates(
        currentPickedDate,
        getLastDateOfCurrentWeek(currentPickedDate),
      );
    },
    [setRangeDates],
  );

  const healthCenterCode = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      healthCenter && healthCenter.code !== "REMOTE"
        ? healthCenter.code
        : undefined,
    [healthCenter],
  );
  const serviceCode = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      healthCenter && healthCenter.code === "REMOTE"
        ? "REMOTE"
        : "FACE_TO_FACE",
    [healthCenter],
  );

  const getPickedEndInterval = useCallback(
    (endIntervalTime: AvailabilityGridItem) =>
      `${pickedDate.getDate()}-${
        pickedDate.getMonth() + 1
      }-${pickedDate.getFullYear()} ${endIntervalTime.hour}:${
        endIntervalTime.minute
      }`,
    [pickedDate],
  );

  const getDefaultEndInterval = useCallback(
    (endIntervalTime: AvailabilityGridItem) => {
      const currentDate = moment(pickedDate);
      currentDate.set("hour", endIntervalTime.hour);
      currentDate.set("minute", endIntervalTime.minute);
      currentDate.add(
        currentProfessional.appointmentDurationInMinutes ||
          defaultProfessionalAppointmentDurationInMinutes,
        "minute",
      );
      return `${currentDate.date()}-${
        currentDate.month() + 1
      }-${currentDate.year()} ${currentDate.hour()}:${currentDate.minute()}`;
    },
    [currentProfessional.appointmentDurationInMinutes, pickedDate],
  );

  const handleEnableSchedule = useCallback(
    (
      startIntervalTime: AvailabilityGridItem,
      endIntervalTime?: AvailabilityGridItem,
    ) => {
      const from = `${pickedDate.getDate()}-${
        pickedDate.getMonth() + 1
      }-${pickedDate.getFullYear()} ${startIntervalTime.hour}:${
        startIntervalTime.minute
      }`;
      const to = endIntervalTime
        ? getPickedEndInterval(endIntervalTime)
        : getDefaultEndInterval(startIntervalTime);
      mutate({
        from,
        to,
        healthCenterCode,
        serviceCode,
      });
    },
    [
      getDefaultEndInterval,
      getPickedEndInterval,
      healthCenterCode,
      mutate,
      pickedDate,
      serviceCode,
    ],
  );

  return (
    <UnlockSchedule
      loadingProfessional={loadingProfessional}
      currentProfessional={currentProfessional}
      healthCenter={healthCenter}
      enablingSchedule={enablingSchedule}
      pickedDate={pickedDate || new Date()}
      loadingConfiguration={loadingConfiguration || loadingDisabledDates}
      preparedWeekGrid={preparedWeekGrid}
      handleOnEnableSchedule={handleEnableSchedule}
      handleOnPickedDate={handleOnPickedDate}
      handleShow={handleShow}
    />
  );
}
