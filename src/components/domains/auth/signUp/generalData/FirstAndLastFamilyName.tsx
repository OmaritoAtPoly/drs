import { makeStyles, TextField } from "@material-ui/core";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalData>;
  touched: FormikTouched<Schemas.ProfessionalData>;
  firstFamilyName: string;
  lastFamilyName: string;
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
  firstFamilyName,
  lastFamilyName,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.rowInput}>
      <div className={classes.formGroup}>
        <TextField
          type="text"
          id="firstFamilyName"
          error={!!(errors.firstFamilyName && touched.firstFamilyName)}
          name="firstFamilyName"
          label={
            errors.firstFamilyName && touched.firstFamilyName
              ? STRINGS.error.ERROR
              : STRINGS.signUp.WRITE_YOUR_FIRST_FAMILY
          }
          helperText={
            errors.firstFamilyName && touched.firstFamilyName
              ? errors.firstFamilyName
              : ""
          }
          placeholder={STRINGS.signUp.WRITE_YOUR_FIRST_FAMILY}
          value={firstFamilyName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          type="text"
          id="lastFamilyName"
          error={!!(errors.lastFamilyName && touched.lastFamilyName)}
          name="lastFamilyName"
          label={
            errors.lastFamilyName && touched.lastFamilyName
              ? STRINGS.error.ERROR
              : STRINGS.signUp.WRITE_YOUR_LAST_FAMILY
          }
          helperText={
            errors.lastFamilyName && touched.lastFamilyName
              ? errors.lastFamilyName
              : ""
          }
          placeholder={STRINGS.signUp.WRITE_YOUR_LAST_FAMILY}
          value={lastFamilyName}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
        />
      </div>
    </div>
  );
}
