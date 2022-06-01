/* eslint-disable no-confusing-arrow */
import { useCallback, useEffect, useState } from "react";
import { useSpecialtiesDataQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useSpecialtyCacheSelector = () => {
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [profession, setProfession] = useState<string>("");

  const { data, loading, refetch } = useSpecialtiesDataQuery({
    filter,
    page,
    pageSize,
    showError: true,
    profession,
    enabled: !!filter,
  });

  useEffect(() => {
    refetch();
  }, [refetch, page, pageSize, filter, profession]);

  const handleSetFilter = useCallback((filterParam: string) => {
    setFilter(filterParam);
  }, []);

  const setPageAndPageSize = useCallback(
    (pageNumber: number, pageNumberSize: number) => {
      setPage(pageNumber);
      setPageSize(pageNumberSize);
    },
    [],
  );

  return {
    loading,
    data,
    handleSetFilter,
    setProfession,
    setPageAndPageSize,
  };
};
