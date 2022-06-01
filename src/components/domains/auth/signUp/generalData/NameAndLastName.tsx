import { makeStyles, TextField } from "@material-ui/core";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalData>;
  touched: FormikTouched<Schemas.ProfessionalData>;
  firstName: string;
  lastName: string;
  handleChange: {
    (e: React.ChangeEvent<unknown>): void;
  };
  handleBlur: {
    (e: React.FocusEvent<unknown>): void;
  };
}

const styles = makeStyles({
  firstAndSecondNameStyle: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  rowInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    color: "#828282",
  },
});

export default function NameAndLastName({
  errors,
  touched,
  handleChange,
  handleBlur,
  firstName,
  lastName,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.rowInput}>
      <div className={classes.formGroup}>
        <TextField
          type="text"
          id="firstName"
          error={!!(errors.firstName && touched.firstName)}
          name="firstName"
          label={
            errors.firstName && touched.firstName
              ? STRINGS.error.ERROR
              : STRINGS.signUp.WRITE_YOUR_NAME
          }
          helperText={
            errors.firstName && touched.firstName ? errors.firstName : ""
          }
          placeholder={STRINGS.signUp.WRITE_YOUR_NAME}
          value={firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          type="text"
          id="lastName"
          name="lastName"
          label={STRINGS.signUp.WRITE_YOUR_LAST_NAME}
          placeholder={STRINGS.signUp.WRITE_YOUR_LAST_NAME}
          value={lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
        />
      </div>
    </div>
  );
}
