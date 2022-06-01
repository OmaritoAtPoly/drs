import { FormikErrors } from "formik";
import { useCallback } from "react";
import * as yup from "yup";
import STRINGS from "../../../../../utils/strings";

const SPECIALTY_SCHEMA = yup
  .array()
  .of(yup.string().required(STRINGS.error.CHOOSE_SPECIALTY))
  .strict(true)
  .required(STRINGS.error.CHOOSE_SPECIALTY);

// eslint-disable-next-line import/prefer-default-export
export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(STRINGS.signUp.FIRST_NAME_MANDATORY)
    .min(3, STRINGS.signUp.MIN_LENGTH),
  firstFamilyName: yup
    .string()
    .required(STRINGS.signUp.FIRST_FAMILY_NAME_MANDATORY)
    .min(3, STRINGS.signUp.MIN_LENGTH),
  legalID: yup
    .string()
    .required(STRINGS.error.WRITE_YOUR_ID_REQUIRED)
    .min(6, STRINGS.signUp.MIN_ID_LENGTH),
  professionalID: yup
    .string()
    .required(STRINGS.signUp.WRITE_YOUR_PROFESSIONAL_ID)
    .min(6, STRINGS.signUp.MIN_ID_LENGTH),
  professionalEmail: yup.string().email(STRINGS.recovery.WRONG_MAIL),
  acceptToBeContacted: yup
    .bool()
    .oneOf([true], STRINGS.error.ACCEPTED_TERMS_ERROR),
  acceptedTerms: yup.bool().oneOf([true], STRINGS.error.ACCEPTED_TERMS_ERROR),
  declareTruth: yup.bool().oneOf([true], STRINGS.error.ACCEPTED_TERMS_ERROR),
  profession: yup.string().required(STRINGS.error.CHOOSE_PROFESSION),
  specialties: SPECIALTY_SCHEMA,
});

export const useValidation = () => {
  const thereErrorInAccordion0 = useCallback(
    (
      errors: FormikErrors<Schemas.ProfessionalRequest>,
      openPanelIndex?: number,
    ) =>
      openPanelIndex === 0 &&
      (errors.firstName ||
        errors.firstFamilyName ||
        errors.legalID ||
        errors.profession),
    [],
  );

  const thereErrorInAccordion1 = useCallback(
    (
      errors: FormikErrors<Schemas.ProfessionalRequest>,
      openPanelIndex?: number,
    ) => openPanelIndex === 1 && errors.specialties,
    [],
  );

  const thereErrorInAccordion2 = useCallback(
    (
      errors: FormikErrors<Schemas.ProfessionalRequest>,
      openPanelIndex?: number,
    ) => openPanelIndex === 2 && errors.professionalID,
    [],
  );

  const canBeCompleted = useCallback(
    (
      index: number,
      errors: FormikErrors<Schemas.ProfessionalRequest>,
      values: Schemas.ProfessionalRequest,
      openPanelIndex?: number,
    ) => {
      if (index === 0) {
        if (thereErrorInAccordion0(errors, openPanelIndex)) {
          return false;
        }
        if (
          openPanelIndex === index &&
          (!values.firstName ||
            !values.firstFamilyName ||
            !values.legalID ||
            !values.profession)
        ) {
          return false;
        }
        return true;
      }
      if (index === 1) {
        if (thereErrorInAccordion1(errors, openPanelIndex)) {
          return false;
        }
        if (
          openPanelIndex === index &&
          (!values.specialties ||
            (values.specialties &&
              !(values.specialties as Schemas.SpecialtyResponse[]).length))
        ) {
          return false;
        }
        return true;
      }
      if (index === 2) {
        if (thereErrorInAccordion2(errors, openPanelIndex)) {
          return false;
        }
        if (openPanelIndex === index && !values.professionalID) {
          return false;
        }
        return true;
      }
      return true;
    },
    [thereErrorInAccordion0, thereErrorInAccordion1, thereErrorInAccordion2],
  );

  return {
    thereErrorInAccordion0,
    thereErrorInAccordion1,
    thereErrorInAccordion2,
    canBeCompleted,
  };
};

export const updatePublicProfileSchema = yup.object().shape({
  legalID: yup
    .string()
    .required(STRINGS.error.WRITE_YOUR_ID_REQUIRED)
    .min(6, STRINGS.signUp.MIN_ID_LENGTH),
  specialties: SPECIALTY_SCHEMA,
});
