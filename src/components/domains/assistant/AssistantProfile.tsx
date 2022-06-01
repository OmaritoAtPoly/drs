import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import drRoundLogo from "../../../assert/dr_round_logo.png";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import BadgedButton from "../../buttons/BadgedButton";
import PasswordRequirement from "../auth/changePassword/PasswordRequirement";

interface Props {
  handleSubmitForm: (value: {
    firstName: string,
    email: string,
    firstPassword: string,
    secondPassword: string
  }) => void;
  loading?: boolean;
  initialValues: {
    firstName: string,
    email: string,
    firstPassword: string,
    secondPassword: string,
  };
  isAssistant: () => boolean;
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
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
  },
  labelStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    justifyContent: "center",
    paddingTop: "10px",
  },
  circularProgress: {
    display: "flex",
    alignSelf: "center",
  },
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBlock: theme.spacing(3),
  },
  badgedButtonStyle: {
    display: "flex",
    justifyContent: "center",
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginLeft: theme.spacing(1.5),
  },
  textInputContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(STRINGS.signUp.FIRST_NAME_MANDATORY)
    .min(3, STRINGS.signUp.MIN_LENGTH),
  email: yup.string()
    .email(STRINGS.recovery.WRONG_MAIL)
    .required(STRINGS.validation.TEXT_REGISTERED_EMAIL),
  firstPassword: yup.string().required(
    `${STRINGS.recovery.REQUIRED_KEYWORD}`),
  secondPassword: yup.string()
    .required(`${STRINGS.recovery.REQUIRED_KEYWORD}`)
    .oneOf([yup.ref("firstPassword")], STRINGS.error.SAME_KEYWORD),
});

const alternativeSignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, STRINGS.signUp.MIN_LENGTH),
  email: yup.string()
    .email(STRINGS.recovery.WRONG_MAIL),
  firstPassword: yup.string(),
  secondPassword: yup.string()
    .oneOf([yup.ref("firstPassword")], STRINGS.error.SAME_KEYWORD),
});

export default function AssistantProfile({
  handleSubmitForm,
  loading,
  initialValues,
  isAssistant,
}: Props) {
  const classes = styles();
  const [showFirstPassword, setShowFirstPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: isAssistant() ? alternativeSignupSchema : signupSchema,
    onSubmit: () => {
      handleSubmitForm(values);
    },
  });
  return (
    <div className={classes.container} id="assistant-profile">
      <form onSubmit={handleSubmit} className={classes.content}>
        {isAssistant() ||
          <div className={classes.logo}>
            <img src={drRoundLogo} alt="magenta-logo" className={classes.roundIconStyle} />
          </div>}
        <TextField
          type="text"
          id="firstName"
          error={!!(errors.firstName && touched.firstName)}
          name="firstName"
          label={errors.firstName && touched.firstName
            ? STRINGS.error.ERROR
            : STRINGS.signUp.NAME_LAST_NAME}
          helperText={errors.firstName && touched.firstName ? errors.firstName : ""}
          placeholder={STRINGS.signUp.NAME_LAST_NAME}
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
        />
        <TextField
          type="email"
          id="email"
          error={!!(errors.email && touched.email)}
          name="email"
          label={errors.email && touched.email
            ? STRINGS.error.ERROR
            : STRINGS.patientInfo.EMAIL}
          helperText={errors.email && touched.email ? errors.email : ""}
          placeholder={STRINGS.patientInfo.EMAIL}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
        />
        <div className={classes.formGroup}>
          <Typography className={classes.labelStyle}>
            {STRINGS.recovery.KEYWORD}
          </Typography>
          <div id="text-keyword-container" className={classes.textInputContainerStyle}>
            <TextField
              type={showFirstPassword ? "text" : "password"}
              id="firstPassword"
              error={!!(errors.firstPassword && touched.firstPassword)}
              name="firstPassword"
              label={
                errors.firstPassword && touched.firstPassword
                  ? STRINGS.error.ERROR
                  : STRINGS.recovery.NEW_KEYWORD
              }
              helperText={
                errors.firstPassword && touched.firstPassword
                  ? errors.firstPassword
                  : ""
              }
              placeholder={STRINGS.recovery.NEW_KEYWORD}
              value={values.firstPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              margin="dense"
            />
            <BadgedButton
              iconName={showFirstPassword ? "lock" : "openEye"}
              onClick={() => setShowFirstPassword(!showFirstPassword)}
              containerStyle={classes.badgedButtonStyle}
              iconWidth={showFirstPassword ? theme.spacing(2.1) : theme.spacing(1.75)}
              iconHeight={showFirstPassword ? theme.spacing(2.1) : theme.spacing(1.75)}
            />
          </div>
          <Typography className={classes.labelStyle}>
            {STRINGS.recovery.CONFIRM_NEW_KEYWORD}
          </Typography>
          <div className={classes.textInputContainerStyle}>
            <TextField
              type={showSecondPassword ? "text" : "password"}
              id="secondPassword"
              error={!!(errors.secondPassword && touched.secondPassword)}
              name="secondPassword"
              label={
                errors.secondPassword && touched.secondPassword
                  ? STRINGS.error.ERROR
                  : STRINGS.recovery.CONFIRM_NEW_KEYWORD
              }
              helperText={
                errors.secondPassword && touched.secondPassword
                  ? errors.secondPassword
                  : ""
              }
              placeholder={STRINGS.recovery.CONFIRM_NEW_KEYWORD}
              value={values.secondPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              margin="dense"
            />
            <BadgedButton
              iconName={showSecondPassword ? "lock" : "openEye"}
              onClick={() => setShowSecondPassword(!showSecondPassword)}
              containerStyle={classes.badgedButtonStyle}
              iconWidth={showSecondPassword ? theme.spacing(2.1) : theme.spacing(1.75)}
              iconHeight={showSecondPassword ? theme.spacing(2.1) : theme.spacing(1.75)}
            />
          </div>
          <PasswordRequirement password={values.firstPassword} />
        </div>
        <div className={classes.wrapper}>
          {loading &&
            <CircularProgress className={classes.circularProgress} size={theme.spacing(3)} />}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {isAssistant()
              ? STRINGS.signUp.UPDATE_PROFILE
              : STRINGS.signUp.REGISTER}
          </Button>
        </div>
      </form>
    </div>
  );
}
