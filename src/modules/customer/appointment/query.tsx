
import { useCallback } from "react";
import { queryCache, QueryKey, useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import {
  ReactQueryKeys,
  ReactQueryStaleTime,
  UseInfiniteQueryArgs,
  UseQueryArgs,
} from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchPatientAppointment = (
  _key: QueryKey,
  {
    code,
    states,
    withPrescriptions = false,
  }: Paths.Appointment1.PathParameters &
    Paths.Appointments2.QueryParameters &
    Omit<Paths.Appointments.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/appointments/?&withPrescriptions=${withPrescriptions}&page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${states ? `&states=${states}` : ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }` as any,
    body: {},
    method: "GET",
  });

export const usePatientAppointmentQuery = ({
  code,
  states,
  withPrescriptions,
  showError,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseAppointmentData, TreatedError> &
  Omit<Paths.Appointments2.QueryParameters, "page" | "pageSize"> &
  Omit<Paths.Appointments.QueryParameters, "page" | "pageSize"> & {
    code: string;
  }) => {
  const {
    data,
    error,
    isLoading: loading,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    refetch,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseAppointmentData, TreatedError>(
    [ReactQueryKeys["patient-appointment-key"], { code, states, withPrescriptions }],
    fetchPatientAppointment,
    {
      ...argsQuery,
      keepPreviousData: true,
      getFetchMore: (lastGroup) => {
        const hasNextPage = () => {
          if (!lastGroup?.totalPages) return false;
          const hasMore =
            lastGroup?.totalPages - ((lastGroup?.page || 0) + 1) > 0;
          return hasMore;
        };
        if (!hasNextPage()) return false;
        return (lastGroup.page || 0) + 1;
      },
    },
  );

  const fetchMore = useCallback(
    (page?: number) => {
      fetchMoreQuery(Number.isInteger(page) ? page : undefined);
    },
    [fetchMoreQuery],
  );

  useShowError({ showError, error: error as TreatedError | undefined });
  return {
    loading,
    groups: data,
    items: data?.flatMap((d) => d.items || []) || [],
    error,
    fetchMore,
    isFetchingMore,
    refetch,
    canFetchMore,
  };
};

const fetchAppointmentRecord = (
  _key: QueryKey,
  { code }: Paths.Appointment1.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${code}/record` as any,
    body: {},
    method: "GET",
  });

export const useLastAppointmentRecordQuery = ({
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AppointmentRecordResponse, TreatedError> &
  Paths.Appointment1.PathParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.AppointmentRecordResponse,
    TreatedError
  >(
    [ReactQueryKeys["professional-last-new-appointment-record-key"], { code }],
    fetchAppointmentRecord,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};

const fetchAppointment = (
  _key: QueryKey,
  { code }: Paths.Appointment1.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${code}` as any,
    body: {},
    method: "GET",
  });

export const useProfessionalLastAppointmentQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AppointmentData, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AppointmentData,
    TreatedError
  >(
    [ReactQueryKeys["professional-last-new-appointment-key"]],
    fetchAppointment,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCurrentAppointmentQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.AppointmentData, TreatedError> &
  Paths.Appointment1.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AppointmentData,
    TreatedError
  >(
    [ReactQueryKeys["professional-current-appointment-key"]],
    () =>
      fetchAppointment(
        [ReactQueryKeys["professional-current-appointment-key"]],
        { code },
      ),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCurrentAppointmentDetailsQuery = () => {
  const { data, isLoading: loading } = useQuery<
    { appointmentId?: string },
    TreatedError
  >(
    [ReactQueryKeys["current-appointment-id-to-details"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-appointment-id-to-details"],
      ]) as unknown) as Promise<{ appointmentId?: string }>,
    {
      staleTime: ReactQueryStaleTime.NEVER,
    },
  );
  return { appointmentId: data?.appointmentId, loading };
};
