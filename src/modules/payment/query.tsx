import { queryCache, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import { useGetCacheOrStorageTokenQuery } from "../auth/query";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

type Parameter = {
  page: number;
  pageSize: number;
};

const fetchPaymentCard = ({ page, pageSize }: Parameter) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/payment/cards?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const usePaymentCardsQuery = ({
  showError,
  page,
  pageSize,
  ...argsQuery
}: UseQueryArgs<Schemas.PageResponsePaymentCardData, TreatedError> &
  Parameter) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.PageResponsePaymentCardData,
    TreatedError
  >(
    [ReactQueryKeys["payment-card-key"]],
    () => fetchPaymentCard({ page, pageSize }),
    { ...argsQuery, enabled: !!token },
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};

export const usePlanExpiredQuery = () => {
  const { data, isLoading: loading } = useQuery<
    { planExpired: boolean },
    TreatedError
  >(
    [ReactQueryKeys["plan-expired"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["plan-expired"],
      ]) as unknown) as Promise<{ planExpired: boolean }>,
  );
  return { data, loading };
};
