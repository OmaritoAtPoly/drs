/* eslint-disable import/prefer-default-export */
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchPatientBackgroundQuery from "./medications/query";

export const useBackgroundPatientCacheSelector = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;

  const { data, loading, refetch } = useFetchPatientBackgroundQuery({
    showError: true,
    code,
    retry: false,
    enabled: code,
  });

  const customerBackground = useMemo(
    () => (!loading && data ? data : undefined),
    [data, loading],
  );

  const allergies = useMemo(
    () => (!loading && data ? data.allergies : undefined),
    [data, loading],
  );

  const familyPathological = useMemo(
    () => (!loading && data ? data.familyPathologies : undefined),
    [data, loading],
  );

  const habits = useMemo(() => (!loading && data ? data.habits : undefined), [
    data,
    loading,
  ]);

  const pathologies = useMemo(
    () => (!loading && data ? data.pathologies : undefined),
    [data, loading],
  );

  const psychiatric = useMemo(
    () => (!loading && data ? data.psychiatric : undefined),
    [data, loading],
  );

  const surgical = useMemo(
    () => (!loading && data ? data.surgical : undefined),
    [data, loading],
  );

  const gynecology = useMemo(
    () => (!loading && data ? data.gynecology : undefined),
    [data, loading],
  );

  const nutrition = useMemo(
    () => (!loading && data ? data.nutrition : undefined),
    [data, loading],
  );

  return {
    loading,
    refetch,
    customerBackground,
    allergies,
    familyPathological,
    habits,
    pathologies,
    psychiatric,
    surgical,
    gynecology,
    nutrition,
  };
};
