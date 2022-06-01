import { uniqBy } from "lodash";
import { useMemo } from "react";
import { ValueAndLabelType } from "../../../utils/types";
import { ReactQueryStaleTime } from "../../apiTypes";
import { useOperationData } from "../../customer/profile/query";
import { useDefaultProfessionQuery } from "./query";

const useSignUpCacheSelector = () => {
  const { data, loading: dataLoading } = useOperationData({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
  });

  const { data: drProfession } = useDefaultProfessionQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
  });

  const professionsData = useMemo(
    () => data?.professions && data.professions.map((prof) => prof),
    [data?.professions],
  );

  const countriesData = useMemo(
    () => data?.countries && data.countries.map((country) => country),
    [data?.countries],
  );

  const gendersData = useMemo(() => {
    let value: ValueAndLabelType[] | undefined;
    const genders = data?.genders;
    if (genders) {
      value = Object.keys(genders).map((gen) => ({
        value: gen,
        label: genders[gen],
      }));
    }
    return value;
  }, [data?.genders]);

  const languagesData = useMemo(() => {
    let value: ValueAndLabelType[] | undefined;
    const languages = data?.languages;
    if (languages) {
      value = Object.keys(languages).map((lan) => ({
        value: lan,
        label: languages[lan],
      }));
    }
    return value;
  }, [data?.languages]);

  const pureProvinces = useMemo(() => {
    let result: Schemas.ProvinceData[] = [];
    countriesData?.forEach((prov) => {
      if (prov.provinces) result = [...result, ...prov.provinces];
    });
    return result;
  }, [countriesData]);

  const pureSpecialties = useMemo(() => {
    let result: Schemas.SpecialtyResponse[] = [];
    if (drProfession?.profession) {
      const professions = professionsData?.filter(
        (a) => a.code === drProfession?.profession,
      );
      if (professions) {
        professions.forEach((prof) => {
          if (!prof.specialties) return;
          prof.specialties.forEach((spec) => {
            if (spec.name) result = [...result, spec];
          });
        });
      }
    }
    return result;
  }, [drProfession, professionsData]);

  const pureCities = useMemo(() => {
    let result: Schemas.CityData[] = [];
    pureProvinces.forEach((prov) => {
      if (!prov.cities) return;
      prov.cities.forEach((city) => {
        if (city.name) result = [...result, city];
      });
    });
    return result;
  }, [pureProvinces]);

  const purePhoneTypes = useMemo(() => {
    let value: ValueAndLabelType[] | undefined;
    const phones = data?.phoneTypes;
    if (phones) {
      value = Object.keys(phones).map((phone) => ({
        value: phone,
        label: phones[phone],
      }));
    }
    return value;
  }, [data?.phoneTypes]);

  const pureInsurances = useMemo(() => {
    let value: Schemas.HealthInsuranceData[] = [];
    const insurances = data?.insurances;
    if (insurances) {
      value = [...insurances];
    }
    return value;
  }, [data?.insurances]);

  const pureHealthCenters = useMemo(() => {
    let value: Schemas.ProfessionalHealthCenterRequest[] = [];
    const healthCenters = data?.healthCenters;
    if (healthCenters) {
      value = [...healthCenters];
    }
    return value;
  }, [data?.healthCenters]);

  const hospitalsCenters = useMemo(() => {
    let value: Schemas.HospitalData[] = [];
    const hospitals = data?.hospitals;
    if (hospitals) {
      value = [...hospitals];
    }
    return value;
  }, [data?.hospitals]);

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

  return {
    dataLoading,
    gendersData,
    languagesData,
    pureSpecialties,
    pureCities,
    pureProvinces,
    professionsData,
    purePhoneTypes,
    pureInsurances,
    pureHealthCenters,
    hospitalsCenters,
    contactPerson,
    nationality,
  };
};

export default useSignUpCacheSelector;
