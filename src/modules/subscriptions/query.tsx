import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import { useGetCacheOrStorageTokenQuery } from "../auth/query";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const fetchProfessionalSubscriptions = () =>
  fetchCreator({
    endpoint: "/professional/subscriptions",
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useProfessionalSubscriptionsQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.SubscriptionData[], TreatedError>) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.SubscriptionData[],
    TreatedError
  >(
    [ReactQueryKeys["professional-subscription"]],
    fetchProfessionalSubscriptions,
    { ...argsQuery, enabled: !!token },
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};

const fetchProfessionalSubscription = ({
  code,
}: Paths.GetSubscription.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/subscriptions/${code}` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useProfessionalSubscriptionQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.ProfessionalSubscriptionData, TreatedError> &
  Paths.GetSubscription.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ProfessionalSubscriptionData,
    TreatedError
  >(
    [ReactQueryKeys["professional-subscription-key"], { code }],
    () => fetchProfessionalSubscription({ code }),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
