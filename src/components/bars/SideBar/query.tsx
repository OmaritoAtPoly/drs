import { useCallback } from "react";
import { queryCache, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../../modules/apiTypes";
import TreatedError from "../../../modules/utils/error/TreatedError";
import { useShowError } from "../../../modules/utils/error/useShowError";

export const useTabIndexQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<{ tabIndex: number }, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    { tabIndex: number },
    TreatedError
  >([ReactQueryKeys["tab-index-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useUpdateTabIndex = () => {
  const updateTabIndex = useCallback((value: number) => {
    queryCache.setQueryData(ReactQueryKeys["tab-index-key"], {
      tabIndex: value,
    });
  }, []);

  const getTabIndexFromPathName = useCallback((pathname: string) => {
    if (pathname === "/") return 0;
    if (pathname.includes("patient")) return 1;
    if (pathname.includes("schedule")) return 2;
    if (pathname.includes("service")) return 3;
    if (pathname.includes("order")) return 4;
    return -1;
  }, []);

  return { updateTabIndex, getTabIndexFromPathName };
};

export const useTabVisibleQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<{ visible: number }, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    { visible: number },
    TreatedError
  >([ReactQueryKeys["tab-visible-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useUpdateTabVisible = () => {
  const updateTabVisible = useCallback((value: boolean) => {
    queryCache.setQueryData(ReactQueryKeys["tab-visible-key"], {
      visible: value,
    });
  }, []);

  return { updateTabVisible };
};
