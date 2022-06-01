import { useCallback } from "react";
import { queryCache, useQuery } from "react-query";
import { ReactQueryKeys, ReactQueryStaleTime } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";

// eslint-disable-next-line import/prefer-default-export
export const useCustomerActionCacheSelector = () => {
  const { data: open } = useQuery<boolean, TreatedError>(
    [ReactQueryKeys["opened-action-panel-key"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["opened-action-panel-key"],
      ]) as unknown) as Promise<boolean>,
    {
      staleTime: ReactQueryStaleTime.NEVER,
    },
  );

  const handleOpenActionPanel = useCallback((value: boolean) => {
    queryCache.setQueryData([ReactQueryKeys["opened-action-panel-key"]], value);
  }, []);

  const { data: name } = useQuery<string, TreatedError>(
    [ReactQueryKeys["action-panel-name-key"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["action-panel-name-key"],
      ]) as unknown) as Promise<string>,
    {
      staleTime: ReactQueryStaleTime.NEVER,
    },
  );

  const setActionPanelName = useCallback((value: string) => {
    queryCache.setQueryData([ReactQueryKeys["action-panel-name-key"]], value);
  }, []);

  return { open, name, setActionPanelName, handleOpenActionPanel };
};
