import { useCallback } from "react";
import { QueryKey, useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_PAGE_SIZE_LARGER } from "../../utils/constants";
import {
  ReactQueryKeys,
  UseInfiniteQueryArgs,
  UseQueryArgs,
} from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const fetchAppointment = ({ code }: Paths.Appointment.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${code}` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useGetAppointmentByCodeQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.AppointmentData, TreatedError> &
  Paths.Appointment.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AppointmentData,
    TreatedError
  >(
    [ReactQueryKeys["professional-appointment-key"], { code }],
    () => fetchAppointment({ code }),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchAppointmentList = (
  _key: QueryKey,
  {
    from,
    to,
    lightData,
    healthCenterCode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    healthServiceCode,
  }: Omit<Paths.Appointments2.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/appointment/list?page=${page}&pageSize=${DEFAULT_PAGE_SIZE_LARGER}&from=${from}&to=${to}${
      healthServiceCode ? `&healthServiceCode=${healthServiceCode}` : ""
    }${
      healthCenterCode ? `&healthCenterCode=${healthCenterCode}` : ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }${lightData ? `&lightData=${lightData}` : ""}` as any,
    body: {},
    method: "GET",
  });

export const useProfessionalAppointmentListQuery = ({
  showError,
  from,
  to,
  lightData,
  healthCenterCode,
  healthServiceCode,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseAppointmentData, TreatedError> &
  Omit<Paths.Appointments2.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseAppointmentData, TreatedError>(
    [
      ReactQueryKeys["professional-appointment-list-key"],
      { from, to, lightData, healthCenterCode },
    ],
    fetchAppointmentList,
    {
      ...argsQuery,
      forceFetchOnMount: true,
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
