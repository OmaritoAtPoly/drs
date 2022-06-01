import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import drRoundLogo from "../../../../assert/dr_round_logo.png";
import {
  oneLowerLetter,
  oneUpperLetter,
  onNumber,
  passwordLength,
} from "../../../../modules/utils/regExpCheker/RegExpChecker";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import PasswordRequirement from "./PasswordRequirement";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  progressButtonContainer: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
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
    justifyContent: "center",
    color: theme.palette.primary.main,
  },
  badgedButtonStyle: {
    display: "flex",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    marginLeft: "10px",
  },
  textInputContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBottom: theme.spacing(3),
  },
  full: {
    width: "100%",
  },
});

interface Props {
  loading?: boolean;
  handleChangePassword: (value: string) => void;
}

const signupSchema = Yup.object().shape({
  firstPassword: Yup.string().required(`${STRINGS.recovery.REQUIRED_KEYWORD}`),
  secondPassword: Yup.string()
    .required(`${STRINGS.recovery.REQUIRED_KEYWORD}`)
    .oneOf([Yup.ref("firstPassword")], STRINGS.error.SAME_KEYWORD),
});

export default function ChangePassword({
  loading = false,
  handleChangePassword,
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
    initialValues: {
      firstPassword: "",
      secondPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      handleChangePassword(values.firstPassword);
    },
  });

  // eslint-disable-next-line arrow-body-style
  const disabledButton = useMemo(() => {
    return (
      oneLowerLetter(values.firstPassword) &&
      oneUpperLetter(values.firstPassword) &&
      !!onNumber(values.firstPassword) &&
      passwordLength(values.firstPassword)
    );
  }, [values.firstPassword]);

  return (
    <div className={classes.container} id="div-change-keyword">
      <form onSubmit={handleSubmit} className={classes.content}>
        <div className={classes.logo}>
          <img
            src={drRoundLogo}
            alt="magenta-logo"
            className={classes.roundIconStyle}
          />
        </div>
        <div className={classes.formGroup}>
          <Typography className={classes.labelStyle}>
            {STRINGS.recovery.NEW_KEYWORD}
          </Typography>
          <div
            id="text-keyword-container"
            className={classes.textInputContainerStyle}>
            <TextField
              className={classes.full}
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
              iconWidth={
                showFirstPassword ? theme.spacing(2.1) : theme.spacing(1.75)
              }
              iconHeight={
                showFirstPassword ? theme.spacing(2.1) : theme.spacing(1.75)
              }
            />
          </div>
          <Typography className={classes.labelStyle}>
            {STRINGS.recovery.CONFIRM_NEW_KEYWORD}
          </Typography>
          <div className={classes.textInputContainerStyle}>
            <TextField
              className={classes.full}
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
              iconWidth={
                showSecondPassword ? theme.spacing(2.1) : theme.spacing(1.75)
              }
              iconHeight={
                showSecondPassword ? theme.spacing(2.1) : theme.spacing(1.75)
              }
            />
          </div>
          <PasswordRequirement password={values.firstPassword} />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!disabledButton}>
              {STRINGS.recovery.CONFIRM}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.progressButtonContainer}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
