/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from "react";
import { useSearch } from "../utils/route";
import { useCitiesQuery, useInsurancesQuery } from "./query";

export const useCitiesCacheSelector = () => {
  const {
    pageSize: pageSizeInRoute,
    page: pageInRoute,
    filter: filterRoute,
  } = useSearch();
  const [filter, setFilter] = useState(filterRoute);
  const { data, loading } = useCitiesQuery({
    showError: true,
    pageSize: pageSizeInRoute,
    page: pageInRoute,
    filter,
    retry: false,
    enabled: !!filter,
  });

  return {
    cities: data,
    loading,
    setFilter,
  };
};

export const useCacheInsuranceSelector = ({
  alwaysEnabled,
}: {
  alwaysEnabled?: boolean;
}) => {
  const { filter: filterRoute } = useSearch();
  const [filter, setFilter] = useState(filterRoute || "");

  useEffect(() => {
    setFilter(filterRoute || "");
  }, [filterRoute]);

  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = useInsurancesQuery({
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
