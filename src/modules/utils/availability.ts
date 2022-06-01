/* eslint-disable no-plusplus */
/* eslint-disable no-confusing-arrow */
import lodash from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useChangeDurationMutation,
  useConfigAvailabilityMutation,
} from "../schedule/mutation";
import { useAvailabilitiesConfigurationQuery } from "../schedule/query";
import useHandlerError from "./error/handleError";
import STRINGS from "../../utils/strings";
import { AvailabilityGridItem } from "../../utils/types";
import { getWeekDay } from "../../utils/utils";
import { addMinutesToDate } from "../../utils/date";

const useScheduleUtility = (centerCode: string, intervalTime: number) => {
  const {
    data,
    refetch,
    loading: loadingConfiguration,
  } = useAvailabilitiesConfigurationQuery({
    showError: true,
  });
  const [durationTime, setDurationTime] = useState<number>(intervalTime);
  const [
    startIntervalTime,
    setStartIntervalTime,
  ] = useState<AvailabilityGridItem>();
  const { handlerError } = useHandlerError();

  const onSetDurationTimeSuccess = useCallback(
    (professionalData: Schemas.ProfessionalData) => {
      setDurationTime(professionalData.appointmentDurationInMinutes || 30);
    },
    [],
  );

  const { mutate: setDurationTimeMutation } = useChangeDurationMutation({
    showError: true,
    onSuccess: onSetDurationTimeSuccess,
  });

  const handleOnSentDurationTime = useCallback(
    (time: number) => {
      setDurationTimeMutation({ appointmentDurationInMinutes: time });
    },
    [setDurationTimeMutation],
  );

  const [availabilityGrid, setAvailabilityGrid] = useState<
    AvailabilityGridItem[][]
  >();

  const availabilities = useMemo(
    () => (!loadingConfiguration && data ? data : []),
    [data, loadingConfiguration],
  );

  const getCloneDeepAvailabilityGrid = useCallback(
    () =>
      availabilityGrid ? lodash.map(availabilityGrid, lodash.cloneDeep) : [],
    [availabilityGrid],
  );

  const onConfigAvailabilitiesSuccess = useCallback(() => {
    refetch();
    setStartIntervalTime(undefined);
  }, [refetch]);

  const {
    mutate,
    loading: configuringAvailabilities,
  } = useConfigAvailabilityMutation({
    showError: true,
    onSuccess: onConfigAvailabilitiesSuccess,
  });

  const getStatusToUpdateGrid = useCallback((status: string) => {
    switch (status) {
      case "ACTIVE":
        return "REGULAR";
      case "REGULAR":
        return "ACTIVE";
      case "DISABLED":
        return "DISABLED";
      default:
        return "REGULAR";
    }
  }, []);

  const getTime = useCallback(
    (hour: number, minute: number, second: number) => {
      const startTime = new Date();
      return startTime.setHours(hour, minute, second);
    },
    [],
  );

  const isValidRangeConfiguration = useCallback(
    (availabilityDataArray: Schemas.AvailabilityData[]) => {
      for (let i = 0; i < availabilityDataArray.length; i++) {
        if (
          availabilityDataArray[i].startTimeHour ===
            availabilityDataArray[i].finishTimeHour &&
          availabilityDataArray[i].startTimeMinute ===
            availabilityDataArray[i].finishTimeMinute
        ) {
          return false;
        }
      }
      return true;
    },
    [],
  );

  const getWeekDayConfiguration = useCallback(
    (dayList: AvailabilityGridItem[], weekDayNumber: number) => {
      const availabilityDataArray: Schemas.AvailabilityData[] = [];
      let availabilityData: Schemas.AvailabilityData = {};

      for (let i = 0; i < dayList.length; i++) {
        if (dayList[i].status === "ACTIVE") {
          availabilityData = {
            startTimeHour: dayList[i].hour,
            startTimeMinute: dayList[i].minute,
            healthCenterCode:
              centerCode === STRINGS.schedule.REMOTE_APPOINTMENT
                ? undefined
                : centerCode || "",
            serviceCode:
              centerCode === STRINGS.schedule.REMOTE_APPOINTMENT
                ? STRINGS.schedule.REMOTE_SERVICE
                : STRINGS.schedule.FACE_TO_FACE_SERVICE,
            weekDays: [getWeekDay(weekDayNumber)],
          };
          for (let j = i; j < dayList.length; j++) {
            if (
              dayList[j].status === "REGULAR" ||
              dayList[j].status === "DISABLED"
            ) {
              availabilityData = {
                ...availabilityData,
                finishTimeHour: dayList[j - 1].hour,
                finishTimeMinute: dayList[j - 1].minute,
              };
              availabilityDataArray.push(availabilityData);
              i = j;
              break;
            }
          }
        }
      }
      return availabilityDataArray;
    },
    [centerCode],
  );

  const getWeekConfiguration = useCallback(
    (grid: AvailabilityGridItem[][]) => {
      let weekConfiguration: Schemas.AvailabilityData[] = [];
      for (let i = 0; i < 7; i++) {
        weekConfiguration = [
          ...weekConfiguration,
          ...getWeekDayConfiguration(grid[i], i),
        ];
      }
      return weekConfiguration;
    },
    [getWeekDayConfiguration],
  );

  const findIndexOnRemote = useCallback(
    (target: Schemas.AvailabilityData[], current: Schemas.AvailabilityData) =>
      target.findIndex(
        (result) =>
          result.startTimeHour === current.startTimeHour &&
          result.startTimeMinute === current.startTimeMinute &&
          result.finishTimeHour === current.finishTimeHour &&
          result.finishTimeMinute === current.finishTimeMinute &&
          result.serviceCode === STRINGS.schedule.REMOTE_SERVICE,
      ),
    [],
  );

  const findIndex = useCallback(
    (target: Schemas.AvailabilityData[], current: Schemas.AvailabilityData) =>
      target.findIndex(
        (result) =>
          result.startTimeHour === current.startTimeHour &&
          result.startTimeMinute === current.startTimeMinute &&
          result.finishTimeHour === current.finishTimeHour &&
          result.finishTimeMinute === current.finishTimeMinute &&
          result.healthCenterCode === current.healthCenterCode &&
          result.serviceCode === current.serviceCode,
      ),
    [],
  );

  const updateResult = useCallback(
    (
      availabilitiesResult: Schemas.AvailabilityData[],
      availability: Schemas.AvailabilityData,
      index: number,
    ) => {
      const result = [...availabilitiesResult];
      result[index] = {
        ...result[index],
        weekDays: [
          ...(result[index].weekDays || []),
          ...(availability.weekDays || []),
        ],
      };
      return result;
    },
    [],
  );

  const getJoinedArrayByWeekDays = useCallback(
    (grid: AvailabilityGridItem[][]) => {
      let availabilitiesResult: Schemas.AvailabilityData[] = [];
      const availabilitiesGrid = getWeekConfiguration(grid);

      // eslint-disable-next-line array-callback-return
      availabilitiesGrid.map((availability: Schemas.AvailabilityData) => {
        const availableIndex =
          availability.serviceCode === STRINGS.schedule.REMOTE_SERVICE
            ? findIndexOnRemote(availabilitiesResult, availability)
            : findIndex(availabilitiesResult, availability);
        if (availableIndex === -1) {
          availabilitiesResult.push(availability);
        } else {
          availabilitiesResult = updateResult(
            availabilitiesResult,
            availability,
            availableIndex,
          );
        }
      });

      return availabilitiesResult;
    },
    [findIndex, findIndexOnRemote, getWeekConfiguration, updateResult],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAvailabilitiesToUpdate = useCallback(
    () =>
      centerCode === STRINGS.schedule.REMOTE_APPOINTMENT
        ? availabilities.filter(
            (availability) =>
              availability.serviceCode !== STRINGS.schedule.REMOTE_SERVICE,
          )
        : availabilities.filter(
            (availability) => availability.healthCenterCode !== centerCode,
          ),
    [availabilities, centerCode],
  );

  const addCloseRangeToAvailabilityInterval = useCallback(
    (availabilityList: Schemas.AvailabilityData[]) => {
      const extendedAvailabilities: Schemas.AvailabilityData[] = [];
      // eslint-disable-next-line array-callback-return
      availabilityList.map((availability) => {
        const currentDate = new Date();
        currentDate.setHours(
          availability.finishTimeHour || 0,
          availability.finishTimeMinute,
        );
        const currentAvailabilityEndTime = addMinutesToDate(
          durationTime,
          currentDate,
        );
        extendedAvailabilities.push({
          ...availability,
          finishTimeHour: currentAvailabilityEndTime.getHours(),
          finishTimeMinute: currentAvailabilityEndTime.getMinutes(),
        });
      });
      return extendedAvailabilities;
    },
    [durationTime],
  );

  const handleOnUpdateAvailabilityConfig = useCallback(
    (grid: AvailabilityGridItem[][]) => {
      setAvailabilityGrid(grid);
      if (startIntervalTime) {
        setStartIntervalTime(undefined);
        const extendedAvailabilitiesRange = addCloseRangeToAvailabilityInterval(
          getJoinedArrayByWeekDays(grid),
        );
        if (isValidRangeConfiguration(extendedAvailabilitiesRange)) {
          mutate({
            availabilities: [
              ...getAvailabilitiesToUpdate(),
              ...extendedAvailabilitiesRange,
            ],
          });
        } else {
          handlerError(STRINGS.schedule.WRONG_RANGE);
        }
      }
    },
    [
      addCloseRangeToAvailabilityInterval,
      getAvailabilitiesToUpdate,
      getJoinedArrayByWeekDays,
      handlerError,
      isValidRangeConfiguration,
      mutate,
      startIntervalTime,
    ],
  );

  const getGridToUpdateInFullInterval = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval: AvailabilityGridItem,
    ) => {
      const grid = getCloneDeepAvailabilityGrid();
      for (let i = startInterval.column; i <= endInterval.column; i++) {
        for (let j = startInterval.row; j <= endInterval.row; j++) {
          grid[i][j] = {
            ...grid[i][j],
            status:
              grid[i][j].status === "DISABLED"
                ? "DISABLED"
                : getStatusToUpdateGrid(startInterval.status),
          };
        }
      }
      return grid;
    },
    [getCloneDeepAvailabilityGrid, getStatusToUpdateGrid],
  );

  const updateGridStateInFullInterval = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval?: AvailabilityGridItem,
    ) => {
      if (endInterval) {
        const grid = getGridToUpdateInFullInterval(startInterval, endInterval);
        handleOnUpdateAvailabilityConfig(grid);
        setStartIntervalTime(undefined);
      }
    },
    [getGridToUpdateInFullInterval, handleOnUpdateAvailabilityConfig],
  );

  const getGridToUpdateInPartialInterval = useCallback(
    (startInterval: AvailabilityGridItem) => {
      const grid = getCloneDeepAvailabilityGrid();
      grid[startInterval.column][startInterval.row] = {
        ...grid[startInterval.column][startInterval.row],
        status: getStatusToUpdateGrid(startInterval.status),
      };
      return grid;
    },
    [getCloneDeepAvailabilityGrid, getStatusToUpdateGrid],
  );

  const updateGridStateInPartialInterval = useCallback(
    (startInterval: AvailabilityGridItem) => {
      const grid = getGridToUpdateInPartialInterval(startInterval);
      setAvailabilityGrid(grid);
    },
    [getGridToUpdateInPartialInterval],
  );

  const updateGridState = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval?: AvailabilityGridItem,
    ) => {
      if (startInterval && endInterval) {
        updateGridStateInFullInterval(startInterval, endInterval);
      } else {
        updateGridStateInPartialInterval(startInterval);
      }
    },
    [updateGridStateInFullInterval, updateGridStateInPartialInterval],
  );

  const checkIntervalOrder = useCallback(
    (endInterval: AvailabilityGridItem) => {
      if (startIntervalTime && endInterval.column < startIntervalTime?.column) {
        if (endInterval.row < startIntervalTime.row) {
          const intervalTemp = startIntervalTime;
          setStartIntervalTime(endInterval);
          updateGridState(endInterval, intervalTemp);
        }
      } else if (
        startIntervalTime &&
        endInterval.column === startIntervalTime?.column &&
        endInterval.row < startIntervalTime?.row
      ) {
        const intervalTemp = startIntervalTime;
        setStartIntervalTime(endInterval);
        updateGridState(endInterval, intervalTemp);
      } else if (startIntervalTime) {
        updateGridState(startIntervalTime, endInterval);
      }
    },
    [startIntervalTime, updateGridState],
  );

  const onCellClicked = useCallback(
    (item: AvailabilityGridItem) => {
      if (item.status !== "DISABLED") {
        if (!startIntervalTime) {
          setStartIntervalTime(item);
          updateGridState(item);
        } else {
          checkIntervalOrder(item);
        }
      }
    },
    [checkIntervalOrder, startIntervalTime, updateGridState],
  );

  const updateGridStateOnHover = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval?: AvailabilityGridItem,
    ) => {
      if (endInterval) {
        const grid = (availabilityGrid && [...availabilityGrid]) || [];
        for (let i = startInterval.column; i <= endInterval.column; i++) {
          for (let j = startInterval.row; j <= endInterval.row; j++) {
            grid[i][j] = {
              ...grid[i][j],
              status: grid[i][j].status === "DISABLED" ? "DISABLED" : "HOVER",
            };
          }
        }
        setAvailabilityGrid(grid);
      }
    },
    [availabilityGrid],
  );

  const checkIntervalOrderOnHover = useCallback(
    (endInterval: AvailabilityGridItem) => {
      if (startIntervalTime && endInterval.column < startIntervalTime?.column) {
        const currentEndInterval = startIntervalTime;
        setStartIntervalTime(endInterval);
        updateGridStateOnHover(endInterval, currentEndInterval);
      } else if (
        startIntervalTime &&
        endInterval.column === startIntervalTime?.column &&
        endInterval.row < startIntervalTime?.row
      ) {
        const currentEndInterval = startIntervalTime;
        setStartIntervalTime(endInterval);
        updateGridStateOnHover(endInterval, currentEndInterval);
      } else if (startIntervalTime) {
        updateGridStateOnHover(startIntervalTime, endInterval);
      }
    },
    [startIntervalTime, updateGridStateOnHover],
  );

  const onCellHover = useCallback(
    (item: AvailabilityGridItem) => {
      if (item.status !== "DISABLED" && startIntervalTime) {
        checkIntervalOrderOnHover(item);
      }
    },
    [checkIntervalOrderOnHover, startIntervalTime],
  );

  const getInitialActiveStatus = useCallback(
    (hour: number, minute: number, weekDay: string) =>
      availabilities.findIndex((availability) => {
        const startTime = getTime(
          availability.startTimeHour || 0,
          availability.startTimeMinute || 0,
          0,
        );
        const endTime = getTime(
          availability.finishTimeHour || 0,
          availability.finishTimeMinute || 0,
          0,
        );
        const currentTime = getTime(hour, minute, 0);
        if (centerCode === STRINGS.schedule.REMOTE_APPOINTMENT) {
          return (
            currentTime >= startTime &&
            currentTime < endTime &&
            availability.serviceCode === STRINGS.schedule.REMOTE_SERVICE &&
            availability.weekDays &&
            availability.weekDays.findIndex((day) => day === weekDay) !== -1
          );
        }
        return (
          currentTime >= startTime &&
          currentTime < endTime &&
          availability.healthCenterCode === centerCode &&
          availability.weekDays &&
          availability.weekDays.findIndex((day) => day === weekDay) !== -1
        );
      }) !== -1,
    [centerCode, getTime, availabilities],
  );

  const getInitialDisabledStatus = useCallback(
    (hour: number, minute: number, weekDay: string) =>
      availabilities.findIndex((availability) => {
        const startTime = getTime(
          availability.startTimeHour || 0,
          availability.startTimeMinute || 0,
          0,
        );
        const endTime = getTime(
          availability.finishTimeHour || 0,
          availability.finishTimeMinute || 0,
          0,
        );
        const currentTime = getTime(hour, minute, 0);
        if (centerCode !== STRINGS.schedule.REMOTE_APPOINTMENT) {
          return (
            currentTime >= startTime &&
            currentTime < endTime &&
            availability.healthCenterCode !== centerCode &&
            availability.serviceCode !== STRINGS.schedule.REMOTE_SERVICE &&
            availability.weekDays &&
            availability.weekDays.findIndex((day) => day === weekDay) !== -1
          );
        }
        return 0;
      }) !== -1,
    [centerCode, getTime, availabilities],
  );

  const getInitialStatus = useCallback(
    (hour: number, minute: number, weekDay: string) => {
      if (getInitialActiveStatus(hour, minute, weekDay)) return "ACTIVE";
      if (getInitialDisabledStatus(hour, minute, weekDay)) return "DISABLED";
      return "REGULAR";
    },
    [getInitialActiveStatus, getInitialDisabledStatus],
  );

  const getAvailabilityArrayByInterval = useCallback(
    (interval: number, weekDay: string, column: number) => {
      const times: AvailabilityGridItem[] = [];
      let tt = 0;
      for (let i = 0; tt < 24 * 60; i++) {
        const hour = Math.floor(tt / 60);
        const minute = tt % 60;
        times.push({
          hour,
          minute,
          status: getInitialStatus(hour, minute, weekDay),
          row: i,
          column,
        });
        tt += interval;
      }
      return times;
    },
    [getInitialStatus],
  );

  const initGrid = useCallback(() => {
    const grid = [
      getAvailabilityArrayByInterval(durationTime, "monday", 0),
      getAvailabilityArrayByInterval(durationTime, "tuesday", 1),
      getAvailabilityArrayByInterval(durationTime, "wednesday", 2),
      getAvailabilityArrayByInterval(durationTime, "thursday", 3),
      getAvailabilityArrayByInterval(durationTime, "friday", 4),
      getAvailabilityArrayByInterval(durationTime, "saturday", 5),
      getAvailabilityArrayByInterval(durationTime, "sunday", 6),
    ];
    setAvailabilityGrid(grid);
  }, [durationTime, getAvailabilityArrayByInterval]);

  useEffect(() => {
    centerCode && initGrid();
  }, [initGrid, availabilities, centerCode]);

  return {
    loadingConfiguration,
    configuringAvailabilities,
    availabilityGrid,
    durationTime,
    setDurationTime,
    handleOnSentDurationTime,
    getAvailabilityArrayByInterval,
    onCellClicked,
    onCellHover,
  };
};
export default useScheduleUtility;
