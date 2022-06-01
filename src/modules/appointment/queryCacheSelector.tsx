import { useCallback, useMemo, useState } from "react";
import {
  getFirstDateOfCurrentWeek,
  getLastDateOfCurrentWeek,
} from "../../utils/date";
import { useProfessionalAppointmentListQuery } from "./query";

const useProfessionalAppointmentListQueryCacheSelector = ({
  from: fromProp,
  to: toProp,
  alwaysEnabled,
}: {
  from?: Date;
  to?: Date;
  alwaysEnabled?: boolean;
}) => {
  const [healthCenterCode, setHealthCenterCode] = useState<string>();
  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: fromProp || getFirstDateOfCurrentWeek(),
    to: toProp || getLastDateOfCurrentWeek(),
  });

  const { from, to } = range;

  const initialFrom = useMemo(
    () => `${from.getDate()}-${from.getMonth() + 1}-${from.getFullYear()}`,
    [from],
  );

  const initialTo = useMemo(
    () => `${to.getDate()}-${to.getMonth() + 1}-${to.getFullYear()}`,
    [to],
  );

  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = useProfessionalAppointmentListQuery({
    showError: true,
    enabled: alwaysEnabled ? true : healthCenterCode !== undefined,
    from: initialFrom,
    to: initialTo,
    healthCenterCode:
      healthCenterCode !== "" && healthCenterCode !== "REMOTE"
        ? healthCenterCode
        : undefined,
    healthServiceCode:
      healthCenterCode !== undefined &&
      healthCenterCode !== "" &&
      healthCenterCode !== "REMOTE"
        ? "FACE_TO_FACE"
        : "REMOTE",
    lightData: false,
  });

  const setRangeDates = useCallback((fromDate: Date, toDate: Date) => {
    setRange({
      from: fromDate,
      to: toDate,
    });
  }, []);

  return {
    appointments: items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
    setRangeDates,
    setHealthCenterCode,
    from,
    to,
    healthCenterCode,
  };
};
export default useProfessionalAppointmentListQueryCacheSelector;
