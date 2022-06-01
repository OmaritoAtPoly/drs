/* eslint-disable import/prefer-default-export */
import { useState } from "react";
import { useSearch } from "../../utils/route";
import { useFaqsQuery } from "./query";

export const useFaqsCacheSelector = ({
  alwaysEnabled,
}: {
  alwaysEnabled?: boolean;
}) => {
  const { filter: filterRoute } = useSearch();
  const [filter, setFilter] = useState(filterRoute || "");

  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = useFaqsQuery({
    showError: true,
    filter,
    retry: false,
    enabled: alwaysEnabled !== undefined ? alwaysEnabled : !!filter,
  });

  return {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilter: (setFilter as any) as (value?: string) => void,
  };
};
