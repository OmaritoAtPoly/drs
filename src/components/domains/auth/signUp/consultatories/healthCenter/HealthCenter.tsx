/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/useAutocomplete";
import { FormikErrors, FormikTouched } from "formik";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import Autocomplete from "../../../../../inputs/Search/Autocomplete";
import HealthCenterList from "./HealthCenterList";

interface Props {
  professionalEmail: string;
  handleChange: {
    (e: React.ChangeEvent<unknown>): void;
  };
  handleBlur: {
    (e: React.FocusEvent<unknown>): void;
  }
  errors: FormikErrors<{
    professionalEmail: string;
    city: string;
  }>;
  touched: FormikTouched<{
    professionalEmail: string;
  }>;
  loading: boolean;
  cities: Schemas.CityData[]
  provinces: Schemas.ProvinceData[];
  healthCenters: Schemas.ProfessionalHealthCenterRequest[];
  newHealthCenters: Schemas.ProfessionalHealthCenterRequest[];
  fieldName: string;
  setFieldValue: (field: string, value: Schemas.ProfessionalHealthCenterRequest[] | string) => void;
  provinceFieldName: string;
  cityFieldName: string;
}

const styles = makeStyles({
  firstNameInput: {
    marginInline: "10px",
    paddingBottom: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
  },
  proMail: {
    fontWeight: "bold",
    fontSize: "15px",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
  citySelect: {
    paddingBottom: "15px",
  },
  labelStyle: {
    color: theme.palette.primary.main,
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    justifyContent: "center",
    fontSize: "15px",
  },
});

export default function HealthCenter({
  errors,
  touched,
  professionalEmail,
  handleBlur,
  handleChange,
  loading,
  cities,
  provinces,
  healthCenters,
  newHealthCenters,
  fieldName,
  setFieldValue,
  provinceFieldName,
  cityFieldName,
}: Props) {
  const classes = styles();

  const filterHealthCenterOptions = createFilterOptions({
    stringify: (option: Schemas.ProfessionalHealthCenterRequest) => `${option.code} ${option.name} ${option.address} ${option.city}`,
  });

  const handleChangeHealthCenter = useCallback(
    (value?: Schemas.ProfessionalHealthCenterRequest) => {
      if (value) setFieldValue(fieldName, [...newHealthCenters, value]);
    },
    [setFieldValue, newHealthCenters, fieldName],
  );

  const onPressDelete = useCallback(
    (value: Schemas.ProfessionalHealthCenterRequest) => {
      const valueRemaining = newHealthCenters.filter((a) => a.code !== value.code);
      setFieldValue(fieldName, valueRemaining);
    },
    [fieldName, newHealthCenters, setFieldValue],
  );

  return (
    <div className={classes.container}>
      <div className={classes.formGroup}>
        <Typography className={classes.proMail}>
          {STRINGS.signUp.PROFESSIONAL_EMAIL_TITLE}
        </Typography>
        <TextField
          type="email"
          id="professionalEmail"
          error={!!(errors.professionalEmail && touched.professionalEmail)}
          name="professionalEmail"
          label={errors.professionalEmail && touched.professionalEmail
            ? STRINGS.error.ERROR
            : STRINGS.signUp.PRO_MAIL}
          helperText={errors.professionalEmail && touched.professionalEmail ? errors.professionalEmail : ""}
          placeholder={STRINGS.signUp.PRO_MAIL}
          value={professionalEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
          className={classes.firstNameInput}
        />
        <Typography className={classes.labelStyle}>{STRINGS.signUp.CONSULTING_ROOM}</Typography>
        <Autocomplete
          loading={loading}
          className={classes.citySelect}
          options={healthCenters}
          getOptionLabel={(option: Schemas.ProfessionalHealthCenterRequest) => option.name || ""}
          filterOptions={filterHealthCenterOptions}
          freeSolo
          autoComplete={false}
          onChange={handleChangeHealthCenter}
          inputProps={{
            autoComplete: "off",
          }}
        />
        <HealthCenterList healthCenters={newHealthCenters} onDelete={onPressDelete} />
      </div>
    </div>
  );
}
