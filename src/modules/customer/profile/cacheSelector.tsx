import { useCallback, useEffect, useMemo, useState } from "react";
import { queryCache, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useSearch } from "../../utils/route";
import { useCustomersQuery, usePatientQuery } from "./query";

export const usePatientCacheSelector = ({
  patientId,
}: {
  patientId?: string;
}) => {
  const { id: idParam } = useParams<{ id?: string }>();

  const id = useMemo(() => patientId || idParam, [idParam, patientId]);

  const { data, loading } = usePatientQuery({
    showError: true,
    code: id || "",
    retry: false,
    enabled: id,
  });

  return {
    currentPatient: data,
    patientLegalId: id || "",
    loading,
  };
};

export const useResetCurrentPatient = () => {
  const resetCurrentPatient = useCallback(() => {
    queryCache.setQueryData(ReactQueryKeys["current-patient"], undefined);
  }, []);

  return { resetCurrentPatient };
};

export const useCustomersCacheSelector = ({
  alwaysEnabled,
}: {
  alwaysEnabled?: boolean;
}) => {
  const {
    search: searchInRoute,
    city: cityInRoute,
    gender: genderInRoute,
    year: yearInRoute,
    insurance: insuranceInRoute,
  } = useSearch();
  const [{ search, city, gender, year, insurance }, setFilters] = useState({
    search: searchInRoute,
    city: cityInRoute,
    gender: genderInRoute,
    year: yearInRoute,
    insurance: insuranceInRoute,
  });

  const filters = {
    city,
    gender,
    year,
    insurance,
  } as Paths.GetCustomers.QueryParameters;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  search && (filters.search = search);
  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = useCustomersQuery({
    showError: true,
    retry: false,
    enabled: alwaysEnabled || !!search,
    ...filters,
  });

  useEffect(() => {
    setFilters({
      search: searchInRoute,
      city: cityInRoute,
      gender: genderInRoute,
      year: yearInRoute,
      insurance: insuranceInRoute,
    });
  }, [
    cityInRoute,
    genderInRoute,
    insuranceInRoute,
    searchInRoute,
    yearInRoute,
  ]);

  const setSearch = useCallback(
    (value?: string) => {
      setFilters({
        search: value || "",
        city: cityInRoute,
        gender: genderInRoute,
        year: yearInRoute,
        insurance: insuranceInRoute,
      });
    },
    [cityInRoute, genderInRoute, insuranceInRoute, yearInRoute],
  );

  return {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
    setFilters,
    setSearch,
  };
};

export const useCustomerCacheSelector = () => {
  const { data: currentCachedCustomer } = useQuery<
    Schemas.CustomerData,
    TreatedError
  >(ReactQueryKeys["current-patient"], {
    structuralSharing: false,
  } as Object);

  const saveCurrentCustomerOnCache = useCallback(
    (data: Schemas.CustomerData) => {
      queryCache.setQueryData([ReactQueryKeys["current-patient"]], data);
    },
    [],
  );

  return { currentCachedCustomer, saveCurrentCustomerOnCache };
};
