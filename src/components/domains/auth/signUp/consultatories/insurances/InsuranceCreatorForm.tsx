/* eslint-disable react/jsx-curly-newline */
import { Button, makeStyles, Typography } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import Autocomplete from "../../../../../inputs/Search/Autocomplete";

interface Props {
  handleSubmitValues: (values: string) => void;
  insurances: Schemas.CustomerInsurance[];
}

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
    alignItems: "flex-start",
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
    justifyContent: "center",
    paddingLeft: "15px",
  },
});

const InsuranceCreatorForm = ({ handleSubmitValues, insurances }: Props) => {
  const classes = styles();

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      insurance: {} as Schemas.HealthInsuranceData,
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onSubmit: (values, { resetForm }) => {
      values.insurance && handleSubmitValues(values.insurance.code || "");
      resetForm();
    },
  });

  const insuranceFilterOptions = createFilterOptions({
    stringify: (option: Schemas.HealthInsuranceData) => `${option.name}`,
  });

  const handleChangeInsurances = useCallback(
    (value?: Schemas.HealthInsuranceData) => {
      value && setFieldValue("insurance", value || "", true);
    },
    [setFieldValue],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div id="phone-container" className={classes.container}>
        <div className={classes.textFieldStyle}>
          <div className={classes.errorContainer}>
            <Typography className={classes.typeStyle}>
              {STRINGS.signUp.ADD_INSURANCES}
            </Typography>
            <Autocomplete
              classes={{ root: classes.autoComplete }}
              className={classes.search}
              options={insurances}
              getOptionLabel={(option: Schemas.HealthInsuranceData) =>
                option.name || ""
              }
              filterOptions={insuranceFilterOptions}
              freeSolo
              autoComplete={false}
              onChange={handleChangeInsurances}
              inputProps={{
                autoComplete: "off",
              }}
              value={{ name: values.insurance.name }}
            />
          </div>
        </div>
      </div>
      <div className={classes.buttonStyle}>
        <Button type="submit" variant="contained" color="primary">
          {STRINGS.generals.ADD}
        </Button>
      </div>
    </form>
  );
};

export default InsuranceCreatorForm;
