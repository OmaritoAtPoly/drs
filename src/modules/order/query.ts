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

const fetchAppointmentOrder = ({ code }: Paths.GetOrder2.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${code}/order` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAppointmentOrderQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.AppointmentOrderData, TreatedError> &
  Paths.GetOrder2.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AppointmentOrderData,
    TreatedError
  >(
    [ReactQueryKeys["appointment-order-key"], { code }],
    () => fetchAppointmentOrder({ code }),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchCustomerOrders = (
  _key: QueryKey,
  {
    customerCode,
    from,
    to,
    paymentMethod,
    state,
  }: Omit<Paths.ListOrders.QueryParameters, "page" | "pageSize">,
  page = 0,
) =>
  fetchCreator({
    endpoint: `/professional/orders?page=${page}&pageSize=${DEFAULT_PAGE_SIZE}${
      from !== undefined ? `&from=${from}` : ""
    }${to !== undefined ? `&to=${to}` : ""}${
      paymentMethod !== undefined ? `&paymentMethod=${paymentMethod}` : ""
    }${state !== undefined ? `&state=${state}` : ""}${
      customerCode !== undefined ? `&customerCode=${customerCode}` : ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }` as any,
    body: {},
    method: "GET",
  });

export const useCustomerOrdersQuery = ({
  showError,
  customerCode,
  from,
  to,
  paymentMethod,
  state,
  ...argsQuery
}: UseInfiniteQueryArgs<
  Schemas.PageResponseAppointmentOrderData,
  TreatedError
> &
  Omit<Paths.ListOrders.QueryParameters, "page" | "pageSize">) => {
  const {
    data,
    error,
    isLoading: loading,
    refetch,
    fetchMore: fetchMoreQuery,
    isFetchingMore,
    canFetchMore,
  } = useInfiniteQuery<Schemas.PageResponseAppointmentOrderData, TreatedError>(
    [
      ReactQueryKeys["customer-orders-key"],
      { customerCode, from, to, paymentMethod, state },
    ],
    fetchCustomerOrders,
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
