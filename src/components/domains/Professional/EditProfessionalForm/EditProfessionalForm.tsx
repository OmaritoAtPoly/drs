/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, makeStyles, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import { ValueAndLabelType } from "../../../../utils/types";
import PrimaryButton from "../../../buttons/PrimaryButton";
import Icon from "../../../Icon/Icon";
import AdditionalGeneralData from "../../auth/signUp/generalData/AdditionalGeneralData";
import ContactData from "../../auth/signUp/generalData/ContactData";
import GeneralData from "../../auth/signUp/generalData/GeneralData";
import ReadOnlyInfo from "./ReadOnlyInfo";

const styles = makeStyles({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  marginBottom: {
    marginBottom: 10,
  },
  marginBottomNationality: {
    marginBottom: 15,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: 250,
  },
  passwordButton: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    height: 40,
    borderRadius: 10,
  },
  buttonUpdate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    color: "#828282",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  startIcon: {
    alignItems: "center",
    display: "flex",
  },
});
interface Props {
  professional: Schemas.ProfessionalData;
  professions?: Schemas.ProfessionResponse[];
  handleSubmitForm: (value: Schemas.ProfessionalRequest) => void;
  gender?: ValueAndLabelType[];
  languages: ValueAndLabelType[];
  nationality: ValueAndLabelType[];
  pureInsurances: Schemas.HealthInsuranceData[];
  contactPerson: ValueAndLabelType[];
  purePhoneTypes?: ValueAndLabelType[];
  loading?: boolean;
  dataLoading: boolean;
  changePassword: () => void;
  professionalEmail: string;
}

export default function EditProfessionalForm({
  handleSubmitForm,
  professional,
  gender,
  professions,
  languages,
  nationality,
  pureInsurances,
  contactPerson,
  purePhoneTypes,
  loading,
  dataLoading,
  changePassword,
  professionalEmail,
}: Props) {
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
    initialValues: professional,
    enableReinitialize: true,
    onSubmit: () => {
      handleSubmitForm(values);
    },
  });

  const handleDateChange = (date?: Date) => {
    if (!date) return;
    setFieldValue("birthdateYear", date.getFullYear());
    setFieldValue("birthdateMonth", date.getMonth() + 1);
    setFieldValue("birthdateDay", date.getDate());
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.content}>
        <Divider component="div" />
        <Typography
          className={classes.dividerFullWidth}
          color="textSecondary"
          display="block"
          variant="caption">
          {STRINGS.generals.GENERAL_DATA}
        </Typography>
        <GeneralData
          hideProfession
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
          editMode
        />
        <Divider component="div" />
        <Typography
          className={`${classes.dividerFullWidth} ${classes.marginBottomNationality}`}
          color="textSecondary"
          display="block"
          variant="caption">
          {STRINGS.generals.NATIONALITY}
        </Typography>
        <AdditionalGeneralData
          onlyNationality
          specialties={[]}
          languages={languages}
          nationality={nationality}
          loadingSpecialties={false}
          onSpecialtyDebounceSearch={() => {}}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched as any}
          handleChange={handleChange}
          values={values as any}
          operationDataLoading={dataLoading}
          setFieldValue={setFieldValue}
        />
        <Divider component="div" />
        <Typography
          className={`${classes.dividerFullWidth} ${classes.marginBottom}`}
          color="textSecondary"
          display="block"
          variant="caption">
          {STRINGS.generals.CONTACT}
        </Typography>
        <ContactData
          onlyPhone
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
        <ReadOnlyInfo
          values={values}
          professions={professions || []}
          professionalEmail={professionalEmail}
        />
        <div className={classes.center}>
          <PrimaryButton
            classes={{ startIcon: classes.startIcon }}
            onClick={changePassword}
            loading={loading}
            variant="contained"
            type="submit"
            className={classes.passwordButton}
            label={STRINGS.professionalProfile.CHANGE_PASSWORD}
            startIcon={<Icon className={classes.startIcon} name="lock" />}
          />
        </div>
        <div className={classes.buttonUpdate}>
          <div className={classes.wrapper}>
            <PrimaryButton
              loading={loading}
              variant="contained"
              type="submit"
              className={classes.button}
              label={STRINGS.generals.SAVE}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
