/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import * as yup from "yup";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../../utils/types";
import Autocomplete from "../../../../../inputs/Search/Autocomplete";

interface Props {
  handleSubmitValues: (values: Schemas.PhoneRequest) => void;
  purePhoneTypes?: ValueAndLabelType[];
  contactPerson: ValueAndLabelType[];
}

const numberRegExp = /^[0-9]*$/;
const phoneRegExp = /^\+?(?:[0-9]●?){4,20}[0-9]$/;
const ValidationGeneralDataSchema = yup.object().shape({
  prefix: yup
    .string()
    .matches(numberRegExp, STRINGS.error.ONLY_NUMBERS)
    .required(STRINGS.signUp.ADD_NUMBER_PREFIX),
  number: yup
    .string()
    .matches(phoneRegExp, STRINGS.error.NUMBER_RANGE)
    .required(STRINGS.signUp.ADD_PHONE_NUMBER),
  phoneType: yup.string().required(STRINGS.signUp.ADD_PHONE_TYPE),
});

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  search: {
    margin: "10px",
    width: "200px",
  },
  autoComplete: {
    padding: 0,
  },
  textFieldStyle: {
    display: "flex",
    marginTop: "15px",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: "10px",
  },
  errorStyle: {
    color: theme.palette.error.main,
    fontSize: "12px",
    paddingLeft: "20px",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
  },
  typeStyle: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "15px",
  },
});

const PhoneCreatorForm = ({
  handleSubmitValues,
  purePhoneTypes,
  contactPerson,
}: Props) => {
  const classes = styles();
  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    handleChange,
    errors,
    values,
    touched,
  } = useFormik({
    validationSchema: ValidationGeneralDataSchema,
    initialValues: {
      prefix: "593",
      number: "",
      phoneType: "MOBILE",
      label: "Yo",
    },
    onSubmit: () => {
      handleSubmitValues(values);
    },
  });

  // TODO: maybe we need that again
  // const phoneTypesFilterOptions = createFilterOptions({
  //   stringify: (option: ValueAndLabelType) => `${option.value} ${option.label}`,
  // });

  // const handleChangePhoneType = useCallback(
  //   (value?: ValueAndLabelType) => {
  //     setFieldValue("phoneType", value?.value || "", true);
  //   },
  //   [setFieldValue],
  // );

  // const relativesTypesFilterOptions = createFilterOptions({
  //   stringify: (option: ValueAndLabelType) => `${option.value} ${option.label}`,
  // });

  // const handleChangeRelatives = useCallback(
  //   (value?: ValueAndLabelType) => {
  //     setFieldValue("label", value?.label || "", true);
  //   },
  //   [setFieldValue],
  // );

  return (
    <form onSubmit={handleSubmit}>
      <div id="phone-container" className={classes.container}>
        <div className={classes.textFieldStyle}>
          <TextField
            type="text"
            id="prefix"
            error={!!(errors.prefix && touched.prefix)}
            name="prefix"
            label={
              errors.prefix && touched.prefix
                ? STRINGS.error.ERROR
                : STRINGS.signUp.ADD_NUMBER_PREFIX
            }
            helperText={errors.prefix && touched.prefix ? errors.prefix : ""}
            placeholder={STRINGS.signUp.ADD_NUMBER_PREFIX}
            value={values.prefix}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
            className={`${classes.search} ${classes.textFieldStyle}`}
          />
          <TextField
            type="text"
            id="number"
            error={!!(errors.number && touched.number)}
            name="number"
            label={
              errors.number && touched.number
                ? STRINGS.error.ERROR
                : STRINGS.signUp.ADD_PHONE_NUMBER
            }
            helperText={errors.number && touched.number ? errors.number : ""}
            placeholder={STRINGS.signUp.ADD_PHONE_NUMBER}
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
            className={`${classes.search} ${classes.textFieldStyle}`}
          />
        </div>
        {/* <div className={classes.textFieldStyle}>
          <div className={classes.errorContainer}>
            <Typography className={classes.typeStyle}>
              {STRINGS.signUp.PHONE_TYPE}
            </Typography>
            <Autocomplete
              className={classes.search}
              options={purePhoneTypes}
              getOptionLabel={(option: ValueAndLabelType) => option.label || ""}
              filterOptions={phoneTypesFilterOptions}
              freeSolo
              autoComplete={false}
              onChange={handleChangePhoneType}
              inputProps={{
                autoComplete: "off",
              }}
            />
            {errors.phoneType && touched.phoneType && (
              <Typography className={classes.errorStyle}>
                {errors.phoneType}
              </Typography>
            )}
          </div>
          <div className={classes.errorContainer}>
            <Typography className={classes.typeStyle}>
              {STRINGS.signUp.PERSON_TO_CONTACT}
            </Typography>
            <Autocomplete
              classes={{ root: classes.autoComplete }}
              className={classes.search}
              options={contactPerson}
              getOptionLabel={(option: ValueAndLabelType) => option.label || ""}
              filterOptions={relativesTypesFilterOptions}
              freeSolo
              autoComplete={false}
              onChange={handleChangeRelatives}
              inputProps={{
                autoComplete: "off",
              }}
            />
          </div>
        </div> */}
      </div>
      <div className={classes.buttonStyle}>
        <Button type="submit" variant="contained" color="primary">
          {STRINGS.generals.ADD}
        </Button>
      </div>
    </form>
  );
};

export default PhoneCreatorForm;
