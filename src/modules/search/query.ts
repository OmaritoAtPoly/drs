/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { QueryKey, useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import {
  ReactQueryKeys,
  UseInfiniteQueryArgs,
  UseQueryArgs,
} from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const fetchCities = (
  _key: QueryKey,
  { page, pageSize, filter }: Paths.FindCities.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/user/cities/?page=${page}&pageSize=${pageSize}${`&filter=${filter}`}` as any,
    body: {},
    method: "GET",
  });

export const useCitiesQuery = ({
  showError,
  page,
  pageSize,
  filter,
  ...argsQuery
}: UseQueryArgs<Schemas.CountryData[], TreatedError> &
  Paths.FindCities.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.CountryData[],
    TreatedError
  >(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    [ReactQueryKeys["cities-search-key"], { page, pageSize, filter }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchCities as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchInsurances = (
  _key: QueryKey,
  { filter }: Omit<Paths.FindInsurances.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/user/insurances/?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${`&filter=${filter}`}` as any,
    body: {},
    method: "GET",
  });

export const useInsurancesQuery = ({
  showError,
  filter,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseHealthInsuranceData, TreatedError> &
  Omit<Paths.FindInsurances.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseHealthInsuranceData, TreatedError>(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    [ReactQueryKeys["insurances-search-key"], { filter }],
    fetchInsurances,
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
