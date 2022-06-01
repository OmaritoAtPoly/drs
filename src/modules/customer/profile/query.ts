/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { QueryKey, useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import {
  ReactQueryKeys,
  UseInfiniteQueryArgs,
  UseQueryArgs,
} from "../../apiTypes";
import { useGetCacheOrStorageTokenQuery } from "../../auth/query";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchCustomers = (
  _key: QueryKey,
  {
    search,
    city,
    gender,
    year,
    insurance,
  }: Omit<Paths.GetCustomers.QueryParameters, "page" | "pageSize"> & {
    year?: number;
  },
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/customers/?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${
      search ? `&search=${search}` : ""
    }${city ? `&city=${city}` : ""}${gender ? `&gender=${gender}` : ""}${
      year ? `&year=${year}` : ""
    }${insurance ? `&insurance=${insurance}` : ""}` as any,
    body: {},
    method: "GET",
  });

export const useCustomersQuery = ({
  showError,
  search,
  city,
  gender,
  year,
  insurance,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseCustomerData, TreatedError> &
  Omit<Paths.GetCustomers.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseCustomerData, TreatedError>(
    [
      // eslint-disable-next-line @typescript-eslint/dot-notation
      ReactQueryKeys["patients"],
      { search, city, gender, year, insurance },
    ],
    fetchCustomers,
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

const fetchPatient = (key: QueryKey, { code }: { code: string }) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}` as any,
    body: {},
    method: "GET",
  });

export const usePatientQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.CustomerData, TreatedError> & { code: string }) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.CustomerData,
    TreatedError
  >(
    [ReactQueryKeys["current-patient"], { code }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchPatient as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const operationData = () =>
  fetchCreator({
    endpoint: "/user/operation-data",
    body: {},
    method: "GET",
    headers: {},
  });

export const useOperationData = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.OperationData, TreatedError>) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.OperationData,
    TreatedError
  >([ReactQueryKeys["operation-data-key"]], operationData as any, {
    ...argsQuery,
    retry: false,
    enabled: !!token,
  });
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};
