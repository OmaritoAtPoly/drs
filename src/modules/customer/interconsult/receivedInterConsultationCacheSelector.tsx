/* eslint-disable no-confusing-arrow */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteInterConsultMutation } from "./mutation";
import { useFetchReceivedInterConsultationQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useReceivedInterConsultationCacheSelector = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const { id } = useParams<{ id?: string }>();

  const { data, loading, refetch } = useFetchReceivedInterConsultationQuery({
    code: id || "",
    page,
    pageSize,
    showError: true,
  });

  const { loading: deleting, mutate } = useDeleteInterConsultMutation({
    showError: true,
  });

  const receivedInterConsultation = useMemo(
    () => (!loading && data && data.items ? data.items : []),
    [data, loading],
  );

  const getCurrentInterConsultResp = useCallback(
    (code: string) =>
      data && data.items
        ? data.items.find((item) => item.code === code)
        : undefined,
    [data],
  );

  const deleteInterConsultation = useCallback(
    (code: string) => {
      mutate({
        code: id || "",
        requestCode: code,
      });
    },
    [id, mutate],
  );

  useEffect(() => {
    refetch();
  }, [refetch, page, pageSize]);

  const setPageAndPageSize = useCallback(
    (pageNumber: number, pageNumberSize: number) => {
      setPage(pageNumber);
      setPageSize(pageNumberSize);
    },
    [],
  );

  return {
    loading,
    deleting,
    data,
    receivedInterConsultation,
    setPageAndPageSize,
    getCurrentInterConsultResp,
    deleteInterConsultation,
  };
};
