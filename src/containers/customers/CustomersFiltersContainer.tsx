import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import CustomersFilters from "../../components/domains/customers/CustomersFilters";
import useSignUpCacheSelector from "../../modules/auth/signUp/cacheSelector";
import {
  useCacheInsuranceSelector,
  useCitiesCacheSelector,
} from "../../modules/search/cacheSelector";
import { useSearch } from "../../modules/utils/route";

export default function CustomersFiltersContainer() {
  const { cities, loading, setFilter } = useCitiesCacheSelector();
  const { gendersData: gendersOptions } = useSignUpCacheSelector();
  const {
    items: insurances,
    loading: loadingInsurances,
    isFetchingMore: isFetchingMoreInsurances,
    setFilter: setFilterInsurances,
  } = useCacheInsuranceSelector({});
  const { pageSize, page } = useSearch();
  const { push } = useHistory();

  const onDebounceCities = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  const onDebounceInsurances = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFilterInsurances(event.target.value);
    },
    [setFilterInsurances],
  );

  const yearOptions = useMemo(() => {
    const now = new Date().getUTCFullYear();
    const years = Array(now - (now - (now - 2020)))
      .fill("")
      .map((v, idx) => `${now - idx}`);
    return years;
  }, []);

  const citiesPure = useMemo(() => {
    let result: Schemas.CityData[] = [];
    cities?.forEach((country) => {
      if (!country.provinces) return;
      country.provinces?.forEach((element) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element.cities && (result = [...result, ...element.cities]);
      });
    });
    return result;
  }, [cities]);

  const onRoute = useCallback(
    ({
      city,
      search,
      gender,
      insurance,
      year,
    }: {
      city?: Schemas.CityData;
      search?: string;
      gender?: string;
      insurance?: Schemas.CustomerInsurance;
      year?: number;
    }) => {
      push(
        `/patients/?page=${page}&pageSize=${pageSize}${
          city && city?.name ? `&city=${city.name}` : ""
        }${search ? `&search=${search}` : ""}${
          gender ? `&gender=${gender}` : ""
        }${year ? `&year=${year}` : ""}${
          insurance ? `&insurance=${insurance.name}` : ""
        }`,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [push],
  );

  return (
    <CustomersFilters
      loadingCities={loading}
      loadingInsurances={loadingInsurances || !!isFetchingMoreInsurances}
      cities={citiesPure}
      onDebounceCities={onDebounceCities}
      onDebounceInsurances={onDebounceInsurances}
      insurances={insurances || []}
      yearOptions={yearOptions}
      onRoute={onRoute}
      gendersOptions={gendersOptions || []}
    />
  );
}
