import { useCallback } from "react";
import { QueryKey, useInfiniteQuery } from "react-query";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { ReactQueryKeys, UseInfiniteQueryArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const fetchProducts = (
  _key: QueryKey,
  {
    enabled,
    taxPercent,
    filter,
  }: Omit<Paths.GetProducts.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/products?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${
      filter ? `&filter=${filter}` : ""
    }${enabled !== undefined ? `&enabled=${enabled}` : ""}${
      taxPercent !== -1 ? `&taxPercent=${taxPercent}` : ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useProfessionalProductsQuery = ({
  showError,
  enabled,
  taxPercent,
  filter,
  ...argsQuery
}: UseInfiniteQueryArgs<
  Schemas.PageResponseProfessionalProductData,
  TreatedError
> &
  Omit<Paths.GetProducts.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<
    Schemas.PageResponseProfessionalProductData,
    TreatedError
  >(
    [
      ReactQueryKeys["professional-products-key"],
      { enabled, taxPercent, filter },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchProducts,
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
