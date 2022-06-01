import { useCallback, useMemo, useState } from "react";
import {
  getFirstDateOfCurrentWeek,
  getLastDateOfCurrentWeek,
} from "../../utils/date";
import { useProfessionalScheduleAvailabilityQuery } from "./query";

export default function useProfessionalScheduleAvailabilityCacheSelector({
  centerCode,
  range,
}: {
  centerCode?: string;
  range?: { from: Date; to: Date };
}) {
  const [healthCenterCode, setHealthCenterCode] = useState<string | undefined>(
    centerCode,
  );
  const [dateRange, setRange] = useState<{ from: Date; to: Date }>(
    range || {
      from: getFirstDateOfCurrentWeek(),
      to: getLastDateOfCurrentWeek(),
    },
  );

  const initialFrom = useMemo(
    () =>
      `${dateRange.from.getDate()}-${
        dateRange.from.getMonth() + 1
      }-${dateRange.from.getFullYear()} 0:0`,
    [dateRange.from],
  );

  const initialTo = useMemo(
    () =>
      `${dateRange.to.getDate()}-${
        dateRange.to.getMonth() + 1
      }-${dateRange.to.getFullYear()} 23:0`,
    [dateRange.to],
  );

  const { data, loading, refetch } = useProfessionalScheduleAvailabilityQuery({
    showError: true,
    enabled: healthCenterCode !== undefined,
    code: healthCenterCode || "",
    from: initialFrom,
    to: initialTo,
  });

  const setRangeDates = useCallback((fromDate: Date, toDate: Date) => {
    setRange({ from: fromDate, to: toDate });
  }, []);

  return { loading, data, refetch, setRangeDates, setHealthCenterCode };
}
