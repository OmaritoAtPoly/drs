import { useCallback, useEffect, useState } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys, ReactQueryStaleTime } from "../apiTypes";
import { usePaymentCardsQuery } from "./query";

export const usePaymentCacheSelector = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);

  const { loading, data, refetch } = usePaymentCardsQuery({
    showError: true,
    page,
    pageSize,
  });

  const handleSetPage = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
  }, []);

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

  return { loading, data, refetch, handleSetPage, handleSetPageSize };
};

export const useSavePlanExpiredSelector = () => {
  const savePlanExpired = useCallback((data: { planExpired: boolean }) => {
    queryCache.setQueryData([ReactQueryKeys["plan-expired"]], data, {
      staleTime: ReactQueryStaleTime.NEVER,
    });
  }, []);
  return { savePlanExpired };
};
