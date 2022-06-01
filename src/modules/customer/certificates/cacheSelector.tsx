import { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../apiTypes";
import { usePatientCertificatesQuery } from "./query";

export const useCertificatesCacheSelector = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: certificatesData,
    loading: loadingData,
    refetch,
  } = usePatientCertificatesQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
    code: id,
  });
  return {
    loadingData,
    certificatesData,
    refetch,
  };
};

export const useCurrentCertificateToEditCacheSelector = () => {
  const saveCurrentCertificateToEdit = useCallback(
    (data?: Schemas.CertificateResponse) => {
      queryCache.setQueryData(
        [ReactQueryKeys["current-certificate-to-edit"]],
        data,
        { staleTime: ReactQueryStaleTime.NEVER },
      );
    },
    [],
  );
  return { saveCurrentCertificateToEdit };
};
