import { debounce as debounceLodash } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys } from "../apiTypes";
import { useProfessionalProductsQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useServiceCacheSelector = () => {
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const [taxPercent, setTaxPercent] = useState<number>(-1);
  const [filter, setFilter] = useState<string>("");

  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = useProfessionalProductsQuery({
    showError: true,
    enabled: activeFilter,
    taxPercent,
    filter,
  });

  const handleOnFilterChange = useMemo(
    () =>
      debounceLodash(
        (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          setFilter(event.target.value);
        },
        500,
      ),
    [],
  );

  const invalidateQuery = useCallback(() => {
    queryCache.invalidateQueries(
      [ReactQueryKeys["professional-products-key"]],
      {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      },
    );
  }, []);

  return {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
    activeFilter,
    taxPercent,
    invalidateQuery,
    setActiveFilter,
    setTaxPercent,
    handleOnFilterChange,
  };
};
