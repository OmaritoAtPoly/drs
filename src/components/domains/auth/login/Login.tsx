import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import STRINGS from "../../../../utils/strings";
import drRoundLogo from "../../../../assert/dr_round_logo.png";
import leftBackgroundImage from "../../../../assert/left.png";
import rightBackgroundImage from "../../../../assert/right.png";

const styles = makeStyles((theme: Theme) => ({
  root: {
    backgroundImage: `url(${leftBackgroundImage}), url(${rightBackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left, right",
    height: "100%",
    backgroundAttachment: "fixed, fixed",
    backgroundPositionY: "bottom",
    [theme.breakpoints.down("sm")]: {
      backgroundImage: `url(${leftBackgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left, right",
      height: "100%",
      backgroundAttachment: "fixed, fixed",
      backgroundPositionY: "bottom",
      backgroundSize: "cover",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
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
  textFieldStyle: {
    backgroundColor: theme.palette.common.white,
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
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 2,
      marginRight: 2,
    },
  },
  policy: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
  },
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBottom: theme.spacing(3),
  },
}));

interface Props {
  handleLogin: (email: string, password: string) => void;
  loading: boolean;
  handleRecoveryPassword: () => void;
  handleSignUp: () => void;
}

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo incorrecto")
    .required("Su correo es requerido"),
  password: Yup.string()
    .label("Password")
    .required("Su contraseña no es válida.")
    .min(8, "Mínimo 8 caracteres"),
});

export default function Login({
  handleSignUp,
  handleLogin,
  loading,
  handleRecoveryPassword,
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
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      handleLogin(values.email, values.password);
    },
  });

  return (
    <div className={classes.root} id="div-bg-img">
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.content}>
          <div className={classes.logo}>
            <img
              src={drRoundLogo}
              alt="magenta-logo"
              className={classes.roundIconStyle}
            />
          </div>
          <div className={`${classes.formGroup} ${classes.textFieldStyle}`}>
            <TextField
              type="email"
              id="email"
              error={!!(errors.email && touched.email)}
              name="email"
              label={errors.email && touched.email ? "Error" : "Email"}
              helperText={errors.email && touched.email ? errors.email : ""}
              placeholder="Escribe su email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              margin="dense"
            />
          </div>
          <div className={`${classes.formGroup} ${classes.textFieldStyle}`}>
            <TextField
              type="password"
              id="password"
              error={!!(errors.password && touched.password)}
              label={
                errors.password && touched.password ? "Error" : "Contraseña"
              }
              helperText={
                errors.password && touched.password ? errors.password : ""
              }
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe su contraseña"
              variant="outlined"
              margin="dense"
            />
          </div>
          <div className={`${classes.formGroup} ${classes.textFieldStyle}`}>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}>
                Entrar
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.progressButtonContainer}
                />
              )}
            </div>
            <div className={classes.buttonContainer}>
              <Button color="primary" onClick={handleRecoveryPassword}>
                {STRINGS.recovery.FORGOT_KEYWORD}
              </Button>
              <Button color="primary" onClick={handleSignUp}>
                {STRINGS.signUp.NEW_USER}
              </Button>
            </div>
          </div>

          <div className={`${classes.policy} ${classes.textFieldStyle}`}>
            <Button color="primary">Términos y Condiciones</Button>
            <Button color="primary">Política de Privacidad</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
