/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/prefer-default-export */
import { uniqBy } from "lodash";
import { useCallback, useMemo } from "react";
import { useAppointmentOperationData, useOperationData } from "./query";

export const useOperationDataCacheSelector = () => {
  const { data } = useOperationData({
    showError: true,
    retry: false,
  });

  const insurances = useMemo(() => data?.insurances, [data?.insurances]);
  const bloodTypes = useMemo(() => data?.bloodTypes, [data?.bloodTypes]);
  const genders = useMemo(() => data?.genders, [data?.genders]);
  const countries = useMemo(() => data?.countries, [data?.countries]);
  const maritalStatuses = useMemo(() => data?.maritalStatuses, [
    data?.maritalStatuses,
  ]);

  const contactPerson = useMemo(
    () => [
      { label: "Yo", value: "Yo" },
      { label: "Mamá", value: "Mamá" },
      { label: "Papá", value: "Papá" },
      { label: "Esposa", value: "Esposa" },
      { label: "Esposo", value: "Esposo" },
      { label: "Hija", value: "Hija" },
      { label: "Hijo", value: "Hijo" },
      { label: "Otra persona", value: "Otro" },
    ],
    [],
  );

  const nationality = useMemo(
    () =>
      uniqBy(
        data?.countries?.map((country) => ({
          label: country.nationality || "",
          value: country.nationality || "",
        })) || [],
        "value",
      ),
    [data?.countries],
  );

  const paymentMethods = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      data && data.paymentTypes
        ? Object.entries(data.paymentTypes).map(([value, label]) => ({
            value,
            label,
          }))
        : [],
    [data],
  );

  const getCities = useCallback(
    // eslint-disable-next-line consistent-return
    (type: "province" | "city" | "country", name?: string) => {
      if (!name) return countries;
      if (!countries) return [];
      switch (type) {
        case "country":
          return countries.filter((c) => c.name === name);
        case "province":
          // eslint-disable-next-line no-case-declarations
          let provinceFind:
            | Schemas.ProvinceData
            | Schemas.ProvinceData[]
            | undefined = [];
          // eslint-disable-next-line no-case-declarations
          const countryFilters = countries.filter((c) => {
            const provinceTemp = c.provinces?.filter((p) => p.name === name);
            if (provinceTemp && provinceTemp.length > 0) {
              provinceFind = provinceTemp;
              return true;
            }
            return false;
          });
          countryFilters[0].provinces = provinceFind;
          return countryFilters;
        case "city":
          // eslint-disable-next-line no-case-declarations
          let citiesFind: Schemas.CityData[] | undefined = [];
          // eslint-disable-next-line no-case-declarations
          let provinceFind2:
            | Schemas.ProvinceData
            | Schemas.ProvinceData[]
            | undefined = [];
          // eslint-disable-next-line no-case-declarations
          const countryFilters2 = countries.filter((c) => {
            const provinceTemp = c.provinces?.filter((p) => {
              // eslint-disable-next-line @typescript-eslint/no-shadow
              const cityTmp = p.cities?.filter((c) => c.name === name);
              if (cityTmp && cityTmp.length > 0) {
                citiesFind = cityTmp;
                return true;
              }
              return false;
            });
            if (provinceTemp && provinceTemp.length > 0) {
              provinceFind2 = provinceTemp;
              return true;
            }
            return false;
          });
          countryFilters2[0].provinces = provinceFind2;
          countryFilters2[0].provinces[0].cities = citiesFind;
          return countryFilters2;

        default:
          break;
      }
    },
    [countries],
  );

  return {
    data,
    insurances,
    bloodTypes,
    contactPerson,
    nationality,
    genders,
    countries,
    maritalStatuses,
    paymentMethods,
    getCities,
  };
};

export const useAppointmentOperationDataCacheSelector = () => {
  const { data } = useAppointmentOperationData({
    showError: true,
    suspense: true,
    retry: false,
  });

  const customerTypes = useMemo(() => data?.customerTypes, [
    data?.customerTypes,
  ]);
  const physicalExamByBody = useMemo(() => data?.physicalExamByBody, [
    data?.physicalExamByBody,
  ]);
  const physicalExamBySystem = useMemo(() => data?.physicalExamBySystem, [
    data?.physicalExamBySystem,
  ]);

  return { data, customerTypes, physicalExamByBody, physicalExamBySystem };
};
