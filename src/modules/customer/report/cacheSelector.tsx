import { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../apiTypes";
import { usePatientReportQuery } from "./query";

export const useReportCacheSelector = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: reportsData,
    loading: loadingData,
    refetch,
  } = usePatientReportQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
    code: id,
  });
  return {
    loadingData,
    reportsData,
    refetch,
  };
};

export const useCurrentReportToEditCacheSelector = () => {
  const saveCurrentReportToEdit = useCallback(
    (data?: Schemas.ReportResponse) => {
      queryCache.setQueryData(
        [ReactQueryKeys["current-report-to-edit"]],
        data,
        { staleTime: ReactQueryStaleTime.NEVER },
      );
    },
    [],
  );
  return { saveCurrentReportToEdit };
};
