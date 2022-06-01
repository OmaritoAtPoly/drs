import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import fetchCreator from "../utils/fetch.ts/fetchCreator";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import { useGetCacheOrStorageTokenQuery } from "../auth/query";

type ActionCache = {
  action: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchUserMe: any = () =>
  fetchCreator({
    endpoint: "/user/me-professional",
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUserMeQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.UserData, TreatedError>) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.UserData,
    TreatedError
  >([ReactQueryKeys["user-me-professional"]], fetchUserMe, {
    ...argsQuery,
    enabled: !!token,
  });
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};

const fetchProfessionalMe = () =>
  fetchCreator({
    endpoint: "/professional/me",
    body: {},
    method: "GET",
  });

export const useProfessionalMeQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.ProfessionalData, TreatedError>) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ProfessionalData,
    TreatedError
  >([ReactQueryKeys["professional-me"]], fetchProfessionalMe, {
    ...argsQuery,
    enabled: !!token,
  });
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};

export const useProfessionalMailQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.EmailRequest, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.EmailRequest,
    TreatedError
  >([ReactQueryKeys["email-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useActionModeQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<ActionCache, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    ActionCache,
    TreatedError
  >([ReactQueryKeys["action-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchNextRecordId = () =>
  fetchCreator({
    endpoint: "/professional/customers/next-record-id",
    body: {},
    method: "GET",
  });

export const useNextRecordIdQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<string, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    string,
    TreatedError
  >([ReactQueryKeys["next-record-id-key"]], fetchNextRecordId, argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
