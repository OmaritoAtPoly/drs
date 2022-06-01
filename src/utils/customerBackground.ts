import STRINGS from "./strings";

const getTextBySpecificGender = (gender: string) => {
  switch (gender) {
    case "FEMALE":
      return STRINGS.background.FEMALE_PATIENT;
    case "MALE":
      return STRINGS.background.MALE_PATIENT;
    default:
      return STRINGS.background.OTHER_PATIENT;
  }
};

const getTextBySpecificBackgroundSection = (backgroundSection: string) => {
  switch (backgroundSection) {
    case "ALLERGY":
      return STRINGS.background.DON_T_REF_ALLERGY;
    case "SURGICAL":
      return STRINGS.background.DON_T_REF_SURGICAL;
    case "PERSONAL":
      return STRINGS.background.DON_T_REF_PATHOLOGY;
    case "FAMILY":
      return STRINGS.background.DON_T_REF_FAMILY_PATHOLOGY;
    case "HABITS":
      return STRINGS.background.DON_T_REF_HABITS;
    case "PSYCHIATRIC":
      return STRINGS.background.DON_T_REF_PSYCHIATRIC;
    default:
      return "";
  }
};

const getNoReferText = (gender: string, backgroundSection: string) =>
  `${getTextBySpecificGender(gender)} ${getTextBySpecificBackgroundSection(
    backgroundSection,
  )}`;

export default getNoReferText;
