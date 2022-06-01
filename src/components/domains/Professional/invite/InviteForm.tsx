import {
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";

interface Props {
  loading?: boolean;
  handleSubmitForm: (values: Schemas.EmailsNameRequest) => void;
}

const styles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    position: "relative",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  titleStyle: {
    display: "flex",
    justifyContent: "flex-start",
    color: theme.palette.primary.main,
    fontSize: "25px",
    paddingBlock: "15px",
  },
});

const signupSchema = yup.object().shape({
  emails: yup.string()
    .required(STRINGS.error.EMAIL_REQUIRED),
});

export default function InviteProfessionalForm({
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
      names: "",
      emails: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      handleSubmitForm(values);
    },
  });

  return (
    <div className={classes.container} id="invite-other-drs">
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <Typography className={classes.titleStyle}>
            {STRINGS.generals.GENERAL_DATA}
          </Typography>
          <TextField
            type="text"
            id="names"
            name="names"
            label={STRINGS.signupCustomer.NAME}
            helperText={STRINGS.signupCustomer.NAME}
            placeholder={STRINGS.signupCustomer.NAME}
            value={values.names}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
          />
          <TextField
            type="text"
            id="email"
            error={!!(errors.emails && touched.emails)}
            name="emails"
            label={errors.emails && touched.emails
              ? STRINGS.error.ERROR
              : STRINGS.patientInfo.EMAIL}
            helperText={errors.emails && touched.emails ? errors.emails : ""}
            placeholder={STRINGS.patientInfo.EMAIL}
            value={values.emails}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
          />
        </div>
        <div className={classes.wrapper}>
          <PrimaryButton
            label={STRINGS.generals.INVITE}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}
