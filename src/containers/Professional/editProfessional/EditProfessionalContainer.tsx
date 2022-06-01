import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import EditProfessionalForm from "../../../components/domains/Professional/EditProfessionalForm/EditProfessionalForm";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useSignUpCacheSelector from "../../../modules/auth/signUp/cacheSelector";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useUpdateProfessionalMutation } from "../../../modules/profile/mutation";
import { defaultProfessionalData } from "../../../utils/defaultData";

const EditProfessionalContainer = () => {
  const { push } = useHistory();
  const { currentProfessional, email } = useProfileCacheSelector();
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

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["professional-me"]], {
      exact: true,
      refetchActive: true,
      refetchInactive: true,
    });
  }, []);

  const { mutate, loading: loadingMutation } = useUpdateProfessionalMutation({
    showError: true,
    onSuccess,
  });

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
      const gender =
        gendersData?.find((g) => g.label === value.gender)?.value ||
        value.gender;
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

  const handleSubmitForm = useCallback(
    (value: Schemas.ProfessionalRequest) => {
      const result = prepareData(value);
      mutate(result);
    },
    [mutate, prepareData],
  );

  const changePassword = useCallback(() => {
    push("/change-password/?edit=true");
  }, [push]);

  return (
    <EditProfessionalForm
      contactPerson={contactPerson || []}
      pureInsurances={pureInsurances || []}
      purePhoneTypes={purePhoneTypes || []}
      nationality={nationality || []}
      languages={languagesData || []}
      handleSubmitForm={handleSubmitForm}
      gender={gendersData || []}
      professions={professionsData || []}
      dataLoading={dataLoading}
      loading={loadingMutation}
      professional={currentProfessional || defaultProfessionalData}
      changePassword={changePassword}
      professionalEmail={currentProfessional?.professionalEmail || email}
    />
  );
};
export default EditProfessionalContainer;
