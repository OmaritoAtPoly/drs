import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import STRINGS from "../../../../utils/strings";
import { AuthModeType, authMode } from "../../../../utils/defaultData";
import drRoundLogo from "../../../../assert/dr_round_logo.png";

const styles = makeStyles((theme: Theme) => ({
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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
    position: "relative",
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
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBottom: theme.spacing(3),
  },
}));

interface Props {
  loading: boolean;
  sendEmailCode: (value: string) => void;
  goLogin?: () => void;
  mode: AuthModeType;
}

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo incorrecto")
    .required("Su correo es requerido"),
});

export default function RecoveryPassword({
  loading,
  sendEmailCode,
  goLogin = () => {},
  mode,
}: Props) {
  const classes = styles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      sendEmailCode(values.email);
    },
  });

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
        <div className={classes.formGroup}>
          {mode === authMode.recovery ? (
            <Typography className={classes.labelStyle}>
              {STRINGS.recovery.FORGOT_KEYWORD}
            </Typography>
          ) : (
            <Typography className={classes.labelStyle}>
              {STRINGS.register.ADD_NEW_USER}
            </Typography>
          )}
          <TextField
            type="email"
            id="email"
            error={!!(errors.email && touched.email)}
            name="email"
            label={errors.email && touched.email ? "Error" : "Email"}
            helperText={errors.email && touched.email ? errors.email : ""}
            placeholder={STRINGS.recovery.WRITE_YOUR_MAIL}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
            autoFocus
          />
        </div>

        <div className={classes.formGroup}>
          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}>
              {mode === authMode.recovery
                ? STRINGS.recovery.CONFIRM
                : STRINGS.register.CHECK_EMAIL}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                className={classes.progressButtonContainer}
              />
            )}
          </div>
          <div className={classes.buttonContainer}>
            {mode === authMode.recovery && (
              <Button color="primary" onClick={goLogin}>
                {STRINGS.generals.LOGIN}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
