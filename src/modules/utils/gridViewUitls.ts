/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
import lodash from "lodash";
import { useCallback, useState } from "react";
import { AvailabilityGridItem } from "../../utils/types";

const useAvailabilityGridViewUtils = (gridItems: AvailabilityGridItem[][]) => {
  const [originGrid, setOriginGrid] = useState(gridItems);
  const [grid, setGrid] = useState(gridItems);

  const [selectionVariant, setSelectionVariant] = useState<
    "SINGLE" | "MULTIPLE"
  >("SINGLE");
  const [
    startIntervalTime,
    setStartIntervalTime,
  ] = useState<AvailabilityGridItem>();
  const [
    endIntervalTime,
    setEndIntervalTime,
  ] = useState<AvailabilityGridItem>();

  const getCloneDeepAvailabilityGrid = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    (gridToClone: AvailabilityGridItem[][]) =>
      gridToClone ? lodash.map(gridToClone, lodash.cloneDeep) : [],
    [],
  );

  const handleResetAll = useCallback(() => {
    setStartIntervalTime(undefined);
    setEndIntervalTime(undefined);
    setGrid(getCloneDeepAvailabilityGrid(originGrid));
  }, [getCloneDeepAvailabilityGrid, originGrid]);

  const handleInitGrid = useCallback(
    (gridItems: AvailabilityGridItem[][]) => {
      setGrid(getCloneDeepAvailabilityGrid(gridItems));
      setOriginGrid(getCloneDeepAvailabilityGrid(gridItems));
    },
    [getCloneDeepAvailabilityGrid],
  );

  const handleSetGrid = useCallback((gridItems: AvailabilityGridItem[][]) => {
    setGrid(gridItems);
  }, []);

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

  const getGridToUpdateInPartialInterval = useCallback(
    (startInterval: AvailabilityGridItem) => {
      const clonedGrid =
        selectionVariant === "SINGLE"
          ? getCloneDeepAvailabilityGrid(originGrid)
          : getCloneDeepAvailabilityGrid(grid);
      clonedGrid[startInterval.column][startInterval.row] = {
        ...clonedGrid[startInterval.column][startInterval.row],
        status: getStatusToUpdateGrid(startInterval.status),
      };
      return clonedGrid;
    },
    [
      getCloneDeepAvailabilityGrid,
      getStatusToUpdateGrid,
      grid,
      originGrid,
      selectionVariant,
    ],
  );

  const updateGridStateInPartialInterval = useCallback(
    (startInterval: AvailabilityGridItem) => {
      const grid = getGridToUpdateInPartialInterval(startInterval);
      setGrid(grid);
    },
    [getGridToUpdateInPartialInterval],
  );

  const fillClonedGridWithCorrectsStatus = useCallback(
    (
      clonedGrid: AvailabilityGridItem[][],
      startInterval: AvailabilityGridItem,
      endInterval: AvailabilityGridItem,
    ) => {
      const theGrid = getCloneDeepAvailabilityGrid(clonedGrid);
      for (let i = startInterval.column; i <= endInterval.column; i++) {
        for (let j = startInterval.row; j <= endInterval.row; j++) {
          theGrid[i][j] = {
            ...theGrid[i][j],
            status:
              theGrid[i][j].status === "DISABLED"
                ? "DISABLED"
                : getStatusToUpdateGrid(startInterval.status),
          };
        }
      }
      return theGrid;
    },
    [getCloneDeepAvailabilityGrid, getStatusToUpdateGrid],
  );

  const getGridToUpdateInFullInterval = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval: AvailabilityGridItem,
    ) => {
      const clonedGrid =
        selectionVariant === "SINGLE"
          ? getCloneDeepAvailabilityGrid(originGrid)
          : getCloneDeepAvailabilityGrid(grid);
      return fillClonedGridWithCorrectsStatus(
        clonedGrid,
        startInterval,
        endInterval,
      );
    },
    [
      fillClonedGridWithCorrectsStatus,
      getCloneDeepAvailabilityGrid,
      grid,
      originGrid,
      selectionVariant,
    ],
  );

  const updateGridStateInFullInterval = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval?: AvailabilityGridItem,
    ) => {
      if (endInterval) {
        const grid = getGridToUpdateInFullInterval(startInterval, endInterval);
        setGrid(grid);
      }
    },
    [getGridToUpdateInFullInterval],
  );

  const updateGridState = useCallback(
    (
      startInterval: AvailabilityGridItem,
      endInterval?: AvailabilityGridItem,
    ) => {
      startInterval && endInterval
        ? updateGridStateInFullInterval(startInterval, endInterval)
        : updateGridStateInPartialInterval(startInterval);
    },
    [updateGridStateInFullInterval, updateGridStateInPartialInterval],
  );

  const checkIntervalOrder = useCallback(
    (endInterval: AvailabilityGridItem) => {
      if (startIntervalTime && endInterval.column < startIntervalTime?.column) {
        if (endInterval.row < startIntervalTime.row) {
          const intervalTemp = startIntervalTime;
          setStartIntervalTime(endInterval);
          setEndIntervalTime(intervalTemp);
          updateGridState(endInterval, intervalTemp);
        }
      } else if (
        startIntervalTime &&
        endInterval.column === startIntervalTime?.column &&
        endInterval.row < startIntervalTime?.row
      ) {
        const intervalTemp = startIntervalTime;
        setStartIntervalTime(endInterval);
        setEndIntervalTime(intervalTemp);
        updateGridState(endInterval, intervalTemp);
      } else if (startIntervalTime) {
        updateGridState(startIntervalTime, endInterval);
      }
    },
    [startIntervalTime, updateGridState],
  );

  const handleOnCellClicked = useCallback(
    (item: AvailabilityGridItem) => {
      if (item.status !== "DISABLED") {
        if (!startIntervalTime || (startIntervalTime && endIntervalTime)) {
          setStartIntervalTime(item);
          setEndIntervalTime(undefined);
          updateGridState(item);
        } else if (item.row !== startIntervalTime.row) {
          setEndIntervalTime(item);
          checkIntervalOrder(item);
        }
      }
    },
    [checkIntervalOrder, endIntervalTime, startIntervalTime, updateGridState],
  );
  return {
    grid,
    startIntervalTime,
    endIntervalTime,
    selectionVariant,
    handleInitGrid,
    setSelectionVariant,
    handleSetGrid,
    handleOnCellClicked,
    handleResetAll,
  };
};

export default useAvailabilityGridViewUtils;
