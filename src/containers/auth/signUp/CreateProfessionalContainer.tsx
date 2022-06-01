import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import CreateProfessional from "../../../components/domains/auth/signUp/CreateProfessional";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useSignUpCacheSelector from "../../../modules/auth/signUp/cacheSelector";
import { useCreateProfessionalMutation } from "../../../modules/auth/signUp/mutation";
import { useSpecialtyCacheSelector } from "../../../modules/operationData/specialtyCacheSelector";
import { AsyncStorageKeys } from "../../../modules/utils/storage/AsyncStorageKeys";
import useSetStringItemAsyncStorage from "../../../modules/utils/storage/useSetStringItemAsyncStorage";
import { ValueAndLabelType } from "../../../utils/types";

export default function CreateProfessionalContainer() {
  const history = useHistory();
  const {
    professionsData,
    gendersData,
    languagesData,
    dataLoading,
    purePhoneTypes,
    pureInsurances,
    contactPerson,
    nationality,
  } = useSignUpCacheSelector();

  const { mutate: asyncStorageMutate } = useSetStringItemAsyncStorage({
    showError: true,
  });

  const {
    data: specialties,
    loading: loadingSpecialties,
    handleSetFilter,
    setProfession,
  } = useSpecialtyCacheSelector();

  const onSpecialtyDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      handleSetFilter(event.target.value);
    },
    [handleSetFilter],
  );

  const phonesCleaner = useCallback(
    (value?: Schemas.PhoneRequest[]) => value?.filter((a) => a.number !== ""),
    [],
  );

  const healthCentersCleaner = useCallback(
    (value?: Schemas.ProfessionalHealthCenterRequest[]) =>
      value?.filter((a) => a.name !== ""),
    [],
  );

  const specialtiesCleaner = useCallback(
    (value?: string[]) => value?.filter((a) => a !== ""),
    [],
  );

  const languagesCleaner = useCallback(
    (value?: string[]) => value?.filter((a) => a !== ""),
    [],
  );

  const insurancesCleaner = useCallback(
    (value?: string[]) => value?.filter((a) => a !== ""),
    [],
  );

  const curriculumCleaner = useCallback(
    (value?: string[]) => value?.filter((a) => a !== ""),
    [],
  );

  const prepareData = useCallback(
    (value: Schemas.ProfessionalRequest) => {
      const newPhones = phonesCleaner(value.phones);
      const newHealthCenter = healthCentersCleaner(value.healthCenters);
      const newSpecialties = specialtiesCleaner(value.specialties);
      const newLanguages = languagesCleaner(value.languages);
      const newInsurances = insurancesCleaner(value.insurances);
      const newCurriculum = curriculumCleaner(value.curriculum);
      const gender = gendersData?.find((g) => g.label === value.gender)?.value;
      const finalData = {
        ...value,
        gender,
        phones: newPhones,
        healthCenters: newHealthCenter,
        specialties: newSpecialties,
        languages: newLanguages,
        insurances: newInsurances,
        curriculum: newCurriculum,
      };
      return finalData;
    },
    [
      phonesCleaner,
      healthCentersCleaner,
      specialtiesCleaner,
      languagesCleaner,
      insurancesCleaner,
      curriculumCleaner,
      gendersData,
    ],
  );

  const onSuccess = useCallback(
    async (data: Schemas.ProfessionalRequest) => {
      if (data) {
        queryCache.setQueryData(ReactQueryKeys["action-key"], {
          action: "",
        });

        await asyncStorageMutate({
          key: AsyncStorageKeys.USER_LEGAL_ID_KEY_STORE,
          data: data.legalID,
        });

        history.push("/");
      }
    },
    [asyncStorageMutate, history],
  );

  const { mutate, loading } = useCreateProfessionalMutation({
    onSuccess,
    showError: true,
  });

  const handleSubmitForm = useCallback(
    (value: Schemas.ProfessionalRequest) => {
      const result = prepareData(value);
      mutate(result);
    },
    [prepareData, mutate],
  );

  return (
    <CreateProfessional
      loading={loading}
      handleSubmitForm={handleSubmitForm}
      professions={professionsData || []}
      gender={gendersData || []}
      languages={languagesData || []}
      dataLoading={dataLoading}
      specialties={specialties || []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProfession={setProfession as any}
      loadingSpecialties={loadingSpecialties}
      onSpecialtyDebounceSearch={onSpecialtyDebounceSearch}
      purePhoneTypes={purePhoneTypes}
      contactPerson={contactPerson as ValueAndLabelType[]}
      pureInsurances={pureInsurances}
      nationality={nationality}
    />
  );
}
