import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ProfessionalProfile from "../../components/domains/Professional/ProfessionalProfile";
import useSignUpCacheSelector from "../../modules/auth/signUp/cacheSelector";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import { defaultProfessionalData } from "../../utils/defaultData";
import STRINGS from "../../utils/strings";

const ProfessionalProfileContainer = () => {
  const {
    currentProfessional,
    loadingCurrentCustomer: loadingProfessional,
    currentProfessionalLanguages,
    currentProfessionalSpecialties,
    currentProfessionalInsurances,
  } = useProfileCacheSelector();

  const { professionsData } = useSignUpCacheSelector();

  const { push, goBack } = useHistory();
  const handleHealthServiceType = useCallback((value?: string) => {
    switch (value) {
      case "FACE_TO_FACE":
        return STRINGS.newConsult.FACE_TO_FACE_CONSULTATION;
      case "REMOTE":
        return STRINGS.newConsult.VIRTUAL_CONSULTATION;
      default:
        return "";
    }
  }, []);

  const handleEditPublicProfile = useCallback(
    () => push("edit-professional-public-profile"),
    [push],
  );
  const handleGoBack = useCallback(() => goBack(), [goBack]);

  return (
    <ProfessionalProfile
      loadingProfessional={loadingProfessional}
      currentProfessional={currentProfessional || defaultProfessionalData}
      handleHealthServiceType={handleHealthServiceType}
      handleEditPublicProfile={handleEditPublicProfile}
      languages={currentProfessionalLanguages}
      specialties={currentProfessionalSpecialties}
      insurances={currentProfessionalInsurances}
      handleGoBack={handleGoBack}
      professions={professionsData || []}
    />
  );
};

export default ProfessionalProfileContainer;
