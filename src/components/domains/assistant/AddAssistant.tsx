import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";

interface Props {
  loading?: boolean;
  handleSubmitForm: (value: Schemas.EmailNameRequest) => void;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
  },
  circularProgress: {
    display: "flex",
    alignSelf: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: "25px",
    paddingBlock: "15px",
  },
});

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required(STRINGS.signUp.FIRST_NAME_MANDATORY)
    .min(3, STRINGS.signUp.MIN_LENGTH),
  email: yup.string()
    .email(STRINGS.recovery.WRONG_MAIL)
    .required(STRINGS.error.EMAIL_REQUIRED),
});

export default function AddAssistant({
  handleSubmitForm,
  loading = false,
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
      name: "",
      email: "",
      forCustomer: false,
      forAssistant: true,
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      handleSubmitForm(values);
    },
  });

  return (
    <div className={classes.container} id="add-assistant">
      <form onSubmit={handleSubmit} className={classes.content}>
        <div className={classes.formGroup}>
          <Typography className={classes.titleStyle}>
            {STRINGS.generals.GENERAL_DATA}
          </Typography>
          <TextField
            type="text"
            id="name"
            error={!!(errors.name && touched.name)}
            name="name"
            label={errors.name && touched.name
              ? STRINGS.error.ERROR
              : STRINGS.signUp.NAME_LAST_NAME}
            helperText={errors.name && touched.name ? errors.name : ""}
            placeholder={STRINGS.signUp.NAME_LAST_NAME}
            value={values.name}
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
        </div>
        <div className={classes.formGroup}>
          <div className={classes.wrapper}>
            {loading &&
              <CircularProgress className={classes.circularProgress} size={theme.spacing(3)} />}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}>
              {STRINGS.signUp.REGISTER}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
