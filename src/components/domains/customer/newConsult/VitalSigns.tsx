/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import { getIMC } from "../../../../utils/utils";
import PrimaryButton from "../../../buttons/PrimaryButton";
import TitleCard from "../../../cards/TitleCard";
import LoadingWrapper from "../../../LoadingWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: "#323232",
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: "bold",
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      color: "#828282",
    },
    cardStyle: {
      marginLeft: theme.spacing(0.4),
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    rowLast: {
      marginBottom: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    column: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(3),
    },
    labelStyle: {
      fontSize: "14px",
      lineHeight: " 19px",
      color: "#323232",
    },
    lastLabel: {
      fontSize: "14px",
      lineHeight: " 19px",
      color: "#D6E3F3",
    },
    inputSize: {
      width: "40%",
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1.5),
    },
    hidden: {
      display: "none",
    },
  }),
);
interface Props {
  onSubmit: (
    values: Omit<
      Schemas.AppointmentRecordResponse,
      "diseases" | "medicines" | "surgeries" | "familyDiseases"
    >,
  ) => void;
  loading?: boolean;
  loadingData?: boolean;
  readOnly?: boolean;
  data: Omit<
    Schemas.AppointmentRecordResponse,
    "diseases" | "medicines" | "surgeries" | "familyDiseases"
  >;
}

const VitalSigns = ({
  data,
  onSubmit,
  loading,
  readOnly = false,
  loadingData,
}: Props) => {
  const classes = useStyles();
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: data,
    onSubmit,
    enableReinitialize: true,
    // validationSchema: vitalSignsSchema,
  });
  const handleOnclickSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <TitleCard title={STRINGS.newConsult.VITAL_SIGNS} onClick={() => {}}>
      <LoadingWrapper loading={loadingData}>
        <form>
          <div className={classes.column}>
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {`${STRINGS.newConsult.WEIGHT} (Kg)`}
                </Typography>
                <TextField
                  type="number"
                  value={values.weight || ""}
                  id="weight"
                  name="weight"
                  placeholder="Kg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={!!(errors.weight && touched.weight)}
                  label={
                    errors.weight && touched.weight ? STRINGS.error.ERROR : ""
                  }
                />
              </div>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {`${STRINGS.newConsult.HEIGHT} (Cm)`}
                </Typography>
                <TextField
                  type="number"
                  value={values.height || ""}
                  id="height"
                  name="height"
                  placeholder={STRINGS.newConsult.CM}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={!!(errors.height && touched.height)}
                  label={
                    errors.height && touched.height ? STRINGS.error.ERROR : ""
                  }
                />
              </div>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.IMC}
                </Typography>
                <TextField
                  type="number"
                  value={getIMC(values.weight || 0, values.height || 0) || ""}
                  id="imc"
                  name="imc"
                  placeholder="IMC"
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                />
              </div>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.TEMPERATURE}
                </Typography>
                <TextField
                  type="number"
                  value={values.temperature || ""}
                  id="temperature"
                  name="temperature"
                  placeholder="Temp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={!!(errors.temperature && touched.temperature)}
                  label={
                    errors.temperature && touched.temperature
                      ? STRINGS.error.ERROR
                      : ""
                  }
                />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.HEART_FREQUENCY}
                </Typography>
                <TextField
                  type="number"
                  value={values.heartRate || ""}
                  id="heartRate"
                  name="heartRate"
                  placeholder="Fre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={!!(errors.heartRate && touched.heartRate)}
                  label={
                    errors.heartRate && touched.heartRate
                      ? STRINGS.error.ERROR
                      : ""
                  }
                />
              </div>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.RESPONSE_FREQUENCY}
                </Typography>
                <TextField
                  type="number"
                  value={values.respiratoryFrequency || ""}
                  id="respiratoryFrequency"
                  name="respiratoryFrequency"
                  placeholder="Resp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={
                    !!(
                      errors.respiratoryFrequency &&
                      touched.respiratoryFrequency
                    )
                  }
                  label={
                    errors.respiratoryFrequency && touched.respiratoryFrequency
                      ? STRINGS.error.ERROR
                      : ""
                  }
                />
              </div>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.SYSTOLIC}
                </Typography>
                <TextField
                  type="number"
                  value={values.systolicBloodPressure || ""}
                  id="systolicBloodPressure"
                  name="systolicBloodPressure"
                  placeholder="Sys"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={
                    !!(
                      errors.systolicBloodPressure &&
                      touched.systolicBloodPressure
                    )
                  }
                  label={
                    errors.systolicBloodPressure &&
                    touched.systolicBloodPressure
                      ? STRINGS.error.ERROR
                      : ""
                  }
                />
              </div>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.DIASTOLIC}
                </Typography>
                <TextField
                  type="number"
                  value={values.diastolicBloodPressure || ""}
                  id="diastolicBloodPressure"
                  name="diastolicBloodPressure"
                  placeholder="Diast"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={
                    !!(
                      errors.diastolicBloodPressure &&
                      touched.diastolicBloodPressure
                    )
                  }
                  label={
                    errors.diastolicBloodPressure &&
                    touched.diastolicBloodPressure
                      ? STRINGS.error.ERROR
                      : ""
                  }
                />
              </div>
            </div>
            <div className={classes.rowLast}>
              <div className={classes.formGroup}>
                <Typography className={classes.labelStyle}>
                  {STRINGS.newConsult.SATURATION_O2}
                </Typography>
                <TextField
                  type="number"
                  value={values.oxygenSaturation || ""}
                  id="oxygenSaturation"
                  name="oxygenSaturation"
                  placeholder="O2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  className={classes.inputSize}
                  inputProps={{
                    readOnly,
                    min: "0",
                    step: "1",
                  }}
                  error={
                    !!(errors.oxygenSaturation && touched.oxygenSaturation)
                  }
                  label={
                    errors.oxygenSaturation && touched.oxygenSaturation
                      ? STRINGS.error.ERROR
                      : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className={readOnly ? classes.hidden : classes.button}>
            <PrimaryButton
              loading={loading}
              variant="contained"
              className={classes.button}
              label={STRINGS.allergies.SAVE}
              onClick={handleOnclickSubmit}
              color="primary"
            />
          </div>
        </form>
      </LoadingWrapper>
    </TitleCard>
  );
};
export default VitalSigns;
