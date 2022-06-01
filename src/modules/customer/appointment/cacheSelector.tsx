
import { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../apiTypes";
import {
  useLastAppointmentRecordQuery,
  usePatientAppointmentQuery,
  useProfessionalLastAppointmentQuery,
} from "./query";

export const useProfessionalLastAppointmentCacheSelector = () => {
  const { data, loading } = useProfessionalLastAppointmentQuery({
    showError: true,
  });

  return {
    loading,
    data,
  };
};

export const useProfessionalLastAppointmentRecordCacheSelector = ({
  appointmentId,
}: {
  appointmentId?: string;
}) => {
  const { appointmentId: appointmentIdParam } = useParams<{
    appointmentId: string;
  }>();
  const { data, loading } = useLastAppointmentRecordQuery({
    code: appointmentId || appointmentIdParam,
    showError: true,
    enabled: appointmentId || appointmentIdParam,
  });

  return {
    loading,
    data,
  };
};

export const useAppointmentsCacheSelector = ({
  states,
}: {
  states?: string[];
}) => {
  const { id } = useParams<{ id: string }>();

  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = usePatientAppointmentQuery({
    showError: true,
    states,
    code: id,
    retry: false,
    refetchOnMount: "always",
    withPrescriptions: true,
  });

  return {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  };
};

export const useCurrentAppointmentDetailsCacheSelector = () => {
  const saveCurrentAppointmentDetails = useCallback(
    (data: { appointmentId?: string }) => {
      queryCache.setQueryData(
        [ReactQueryKeys["current-appointment-id-to-details"]],
        data,
        { staleTime: ReactQueryStaleTime.NEVER },
      );
    },
    [],
  );
  return { saveCurrentAppointmentDetails };
};
