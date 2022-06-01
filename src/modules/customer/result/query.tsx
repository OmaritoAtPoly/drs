/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { queryCache, QueryKey, useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { ReactQueryKeys, UseInfiniteQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchResults = (
  _key: QueryKey,
  {
    code,
    requestType,
    seen,
    from,
    to,
  }: Paths.Results.PathParameters &
    Omit<Paths.Results.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/results?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${
      requestType ? `&requestType=${requestType}` : ""
    }${seen ? `&seen=${seen}` : `&seen=${false}`}${
      from ? `&from=${from}` : ""
    }${to ? `&to=${to}` : ""}` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useResultsQuery = ({
  showError,
  code,
  requestType,
  seen,
  from,
  to,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseResultItem, TreatedError> &
  Omit<Paths.Results.QueryParameters, "page" | "pageSize"> &
  Paths.Results.PathParameters) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseResultItem, TreatedError>(
    [
      ReactQueryKeys["customer-results-key"],
      { code, requestType, seen, from, to },
    ],
    fetchResults,
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
    totalItems: data && data.length ? data[0].totalItems || 0 : 0,
  };
};

export const useCurrentResultToEditQuery = () => {
  const { data, isLoading: loading } = useQuery<
    Schemas.ResultResponse,
    TreatedError
  >(
    [ReactQueryKeys["current-customer-result"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-customer-result"],
      ]) as unknown) as Promise<Schemas.ResultResponse>,
  );
  return { data, loading };
};
export const useResultTypeRequestQuery = () => {
  const { data, isLoading: loading } = useQuery<string>(
    [ReactQueryKeys["result-request-type-key"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["result-request-type-key"],
      ]) as unknown) as Promise<string>,
  );
  return { data, loading };
};
