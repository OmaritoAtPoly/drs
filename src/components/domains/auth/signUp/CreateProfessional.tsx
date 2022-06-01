/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import drRoundLogo from "../../../../assert/dr_round_logo.png";
import useHandlerError from "../../../../modules/utils/error/handleError";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import { ValueAndLabelType } from "../../../../utils/types";
import WizardAccordion, {
  StatePanel,
} from "../../../accordion/WizardAccordion";
import PrimaryButton from "../../../buttons/PrimaryButton";
import AcceptingConditions from "./consultatories/acceptingConditions/AcceptingConditions";
import SwitchButton from "./consultatories/SwitchButton";
import AdditionalGeneralData from "./generalData/AdditionalGeneralData";
import ContactData from "./generalData/ContactData";
import GeneralData from "./generalData/GeneralData";
import ProfessionalProfileData from "./generalData/ProfessionalProfileData";
import { signupSchema, useValidation } from "./generalData/validations";

interface Props {
  dataLoading?: boolean;
  loading?: boolean;
  gender?: ValueAndLabelType[];
  professions: Schemas.ProfessionResponse[] | undefined;
  languages: ValueAndLabelType[];
  handleSubmitForm: (value: Schemas.ProfessionalRequest) => void;
  specialties: Schemas.SpecialtyResponse[];
  purePhoneTypes?: ValueAndLabelType[];
  contactPerson: ValueAndLabelType[];
  pureInsurances: Schemas.HealthInsuranceData[];
  nationality: ValueAndLabelType[];
  loadingSpecialties?: boolean;
  onSpecialtyDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  setProfession: (value: string) => void;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
    alignItems: "center",
  },
  search: {
    minWidth: 250,
    marginRight: 3,
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: "25px",
    paddingBlock: "15px",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
  labelStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    justifyContent: "center",
    paddingTop: "10px",
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
  },
  circularProgress: {
    display: "flex",
    alignSelf: "center",
  },
  linkStyle: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 12,
    textDecoration: "underline",
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: 250,
  },
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBottom: theme.spacing(3),
  },
});

export default function CreateProfessional({
  handleSubmitForm,
  loading = false,
  dataLoading = false,
  gender,
  professions,
  languages,
  specialties,
  purePhoneTypes,
  contactPerson,
  pureInsurances,
  nationality,
  onSpecialtyDebounceSearch,
  loadingSpecialties,
  setProfession,
}: Props) {
  const [agreeToBePublic, setAgreeToBePublic] = useState<boolean>(false);
  const { handlerError } = useHandlerError();
  const [completedPanel, setCompleted] = useState<StatePanel[]>(
    new Array(4).fill(undefined),
  );
  const classes = styles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      firstFamilyName: "",
      lastFamilyName: "",
      birthdateDay: Number(moment().format("DD")),
      birthdateMonth: Number(moment().format("MM")),
      birthdateYear: Number(moment().subtract(30, "y").format("YYYY")),
      legalID: "",
      professionalID: "",
      gender: "",
      profession: "",
      specialties: [],
      specialtiesValues: [] as Schemas.SpecialtyResponse[],
      languages: [],
      nationality: "",
      professionalEmail: "",
      city: "",
      province: "",
      phones: [],
      agreeToBePublic: false,
      insurances: [],
      healthCenters: [],
      aboutMe: undefined,
      hospitals: [] as Schemas.ProfessionalHospitalRequest[],
      acceptedTerms: false,
      declareTruth: false,
      curriculum: [],
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      if (completedPanel.filter((v) => v === "completed").length === 4) {
        handleSubmitForm(values);
      } else {
        handlerError(STRINGS.error.ALL_PANEL_SALVED);
      }
    },
  });

  const handleDateChange = (date?: Date) => {
    if (!date) return;
    setFieldValue("birthdateYear", date.getFullYear());
    setFieldValue("birthdateMonth", date.getMonth() + 1);
    setFieldValue("birthdateDay", date.getDate());
  };

  const handleAgreeToBePublic = useCallback(() => {
    setAgreeToBePublic(!agreeToBePublic);
    setFieldValue("agreeToBePublic", !agreeToBePublic);
  }, [setFieldValue, agreeToBePublic]);

  const [openPanelIndex, setOpenPanelIndex] = useState<number | undefined>(0);
  const setCompletedWidthIndex = useCallback(
    (index: number, value?: StatePanel) => {
      setCompleted(completedPanel.map((v, i) => (i === index ? value : v)));
    },
    [completedPanel],
  );

  const {
    thereErrorInAccordion0,
    thereErrorInAccordion1,
    thereErrorInAccordion2,
    canBeCompleted,
  } = useValidation();
  const onSave = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      canBeCompleted: boolean,
    ) => {
      if (openPanelIndex === undefined) return;
      if (!canBeCompleted) {
        handlerError(STRINGS.error.VALID_DATE_INTRODUCE);
      } else {
        setCompletedWidthIndex(openPanelIndex, "completed");
        setOpenPanelIndex(openPanelIndex + 1);
      }
    },
    [handlerError, openPanelIndex, setCompletedWidthIndex],
  );

  const onBack = useCallback(() => {
    if (openPanelIndex === undefined) return;
    // eslint-disable-next-line consistent-return
    if (openPanelIndex === 0) {
      setOpenPanelIndex(0);
      return;
    }
    setOpenPanelIndex(openPanelIndex - 1);
  }, [openPanelIndex]);

  useEffect(() => {
    if (openPanelIndex === 0) {
      if (thereErrorInAccordion0(errors, openPanelIndex)) {
        setCompletedWidthIndex(0, "error");
        return;
      }
      if (completedPanel[0] === "error") {
        setCompletedWidthIndex(0, undefined);
      }
    }
    if (openPanelIndex === 1) {
      if (thereErrorInAccordion1(errors, openPanelIndex)) {
        setCompletedWidthIndex(1, "error");
        return;
      }
      if (completedPanel[1] === "error") {
        setCompletedWidthIndex(1, undefined);
      }
    }
    if (openPanelIndex === 2) {
      if (thereErrorInAccordion2(errors, openPanelIndex)) {
        setCompletedWidthIndex(2, "error");
        return;
      }
      if (completedPanel[2] === "error") {
        setCompletedWidthIndex(2, undefined);
      }
    }
    if (openPanelIndex === 3) {
      if (completedPanel[3] === "error") {
        setCompletedWidthIndex(3, undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errors,
    openPanelIndex,
    thereErrorInAccordion0,
    thereErrorInAccordion1,
    thereErrorInAccordion2,
  ]);

  useEffect(() => {
    if (values.profession) {
      setProfession(values.profession);
    }
  }, [setProfession, values.profession]);

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.content}>
        <div className={classes.logo}>
          <img
            src={drRoundLogo}
            alt="magenta-logo"
            className={classes.roundIconStyle}
          />
        </div>
        <WizardAccordion
          openPanelIndex={openPanelIndex}
          onChangeOpenPanelIndex={(index?: number) => {
            setOpenPanelIndex(index);
          }}
          mode="free"
          panels={[
            {
              title: STRINGS.generals.GENERAL_DATA,
              state: completedPanel[0] as any,
              canBeCompleted: () =>
                canBeCompleted(0, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <GeneralData
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched as any}
                  handleChange={handleChange}
                  handleDateChange={handleDateChange}
                  values={values}
                  operationDataLoading={dataLoading}
                  setFieldValue={setFieldValue}
                  professions={professions}
                  gender={gender}
                />
              ),
            },
            {
              title: STRINGS.generals.ADDITIONAL_GENERAL_DATA,
              state: completedPanel[1] as any,
              canBeCompleted: () =>
                canBeCompleted(1, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <AdditionalGeneralData
                  specialties={specialties}
                  languages={languages}
                  nationality={nationality}
                  loadingSpecialties={loadingSpecialties}
                  onSpecialtyDebounceSearch={onSpecialtyDebounceSearch}
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched as any}
                  handleChange={handleChange}
                  values={values}
                  operationDataLoading={dataLoading}
                  setFieldValue={setFieldValue}
                />
              ),
            },
            {
              title: STRINGS.generals.CONTACT_DATA,
              state: completedPanel[2] as any,
              canBeCompleted: () =>
                canBeCompleted(2, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <ContactData
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched as any}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                  purePhoneTypes={purePhoneTypes}
                  contactPerson={contactPerson}
                  pureInsurances={pureInsurances}
                />
              ),
            },
            {
              title: STRINGS.signUp.DR_PROFILE,
              state: completedPanel[3] as any,
              canBeCompleted: () =>
                canBeCompleted(3, errors, values, openPanelIndex),
              onSave,
              onBack,
              renderContent: (
                <ProfessionalProfileData
                  errors={errors}
                  handleBlur={handleBlur}
                  touched={touched as any}
                  handleChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              ),
            },
          ]}
        />
        <div className={classes.formGroup}>
          <SwitchButton
            checked={agreeToBePublic}
            toggleChecked={handleAgreeToBePublic}
          />
          <div id="dr-profile-section">
            <AcceptingConditions
              setFieldValue={setFieldValue}
              acceptedTerms={values.acceptedTerms}
              declareTruth={values.declareTruth}
            />
            {(errors.acceptedTerms || errors.declareTruth) && (
              <div className={classes.errorContainer}>
                <Typography className={classes.errorStyle}>
                  {STRINGS.error.ACCEPTED_TERMS_ERROR}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div className={classes.formGroup}>
          <div className={classes.wrapper}>
            <PrimaryButton
              loading={loading}
              variant="contained"
              type="submit"
              className={classes.button}
              label={STRINGS.signUp.REGISTER}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
