import { queryCache, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { AsyncStorageKeys } from "../utils/storage/AsyncStorageKeys";
import useGetStringItemAsyncStorage from "../utils/storage/useGetStringItemAsyncStorage";

// eslint-disable-next-line import/prefer-default-export
export const useGetCacheOrStorageTokenQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<string | undefined, TreatedError>) => {
  const {
    data: tokenCache,
    error,
    isLoading: loadingTokenCache,
    refetch,
  } = useQuery<string | undefined, TreatedError>(
    [ReactQueryKeys["token-key"]],
    () => queryCache.getQueryData([ReactQueryKeys["token-key"]]),
    { ...argsQuery, retry: false },
  );
  const {
    value: tokenStorage,
    loading: loadingTokenStorage,
  } = useGetStringItemAsyncStorage({
    key: AsyncStorageKeys.USER_TOKEN_KEY_STORE,
    enabled: !tokenCache && !loadingTokenCache,
  });
  return {
    loading: loadingTokenCache || loadingTokenStorage,
    data: tokenCache || tokenStorage,
    error,
    refetch,
  };
};

export const useDisabledProfessionalQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<{disabled: boolean}, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    {disabled: boolean},
    TreatedError
  >([ReactQueryKeys["disabled-professional-key"]], () =>
    (queryCache.getQueryData([
      ReactQueryKeys["disabled-professional-key"],
    ]) as unknown) as Promise<{ disabled: boolean }>, argsQuery);
  return { loading, data, error, refetch };
};
