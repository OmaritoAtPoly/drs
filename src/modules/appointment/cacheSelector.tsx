import { useCallback } from "react";
import { queryCache, useQuery } from "react-query";
import { ReactQueryKeys, ReactQueryStaleTime } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";

// eslint-disable-next-line import/prefer-default-export
export const useCurrentAppointmentIdCacheSelectorState = () => {
  const { data: appointmentId } = useQuery<string, TreatedError>(
    [ReactQueryKeys["current-appointment-id-key"]],
    { staleTime: ReactQueryStaleTime.NEVER },
  );
  const saveCurrentAppointmentId = useCallback(
    (currentAppointmentId: string) => {
      queryCache.setQueryData(
        ReactQueryKeys["current-appointment-id-key"],
        currentAppointmentId,
        {
          staleTime: ReactQueryStaleTime.NEVER,
        },
      );
    },
    [],
  );
  return { appointmentId, saveCurrentAppointmentId };
};
