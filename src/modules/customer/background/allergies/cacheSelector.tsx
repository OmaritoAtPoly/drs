import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchCurrentUserAllergiesQuery from "./query";

const usePatientAllergiesCacheSelector = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id } = useParams() as any;

  const code = useMemo(() => id, [id]);

  const { data, loading, refetch } = useFetchCurrentUserAllergiesQuery({
    showError: true,
    code,
    retry: false,
    enabled: code,
  });

  return {
    currentPatientAllergies: data,
    loading,
    refetch,
  };
};

export default usePatientAllergiesCacheSelector;
