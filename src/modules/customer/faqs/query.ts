/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { QueryKey, useInfiniteQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { ReactQueryKeys, UseInfiniteQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchFaqs = (
  _key: QueryKey,
  { filter }: Omit<Paths.FindFaqs.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/user/faqs/?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${`&filter=${filter}`}` as any,
    body: {},
    method: "GET",
  });

export const useFaqsQuery = ({
  showError,
  filter,
  ...argsQuery
}: UseInfiniteQueryArgs<Schemas.PageResponseFaqData, TreatedError> &
  Omit<Paths.FindFaqs.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseFaqData, TreatedError>(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    [ReactQueryKeys["faqs-search-key"], { filter }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchFaqs as any,
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
