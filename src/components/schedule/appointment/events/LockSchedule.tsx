import { createStyles, makeStyles, Typography } from "@material-ui/core";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import STRINGS from "../../../../utils/strings";
import Avatar from "../../../Avatar";
import PrimaryButton from "../../../buttons/PrimaryButton";
import DatePicker from "../../../inputs/DatePicker";
import TimePicker from "../../../inputs/TimePicker";
import LoadingWrapper from "../../../LoadingWrapper";

const validationSchema = Yup.object().shape({
  fromDate: Yup.date().required(STRINGS.validation.FIELD_MANDATORY),
  toDate: Yup.date().required(STRINGS.validation.FIELD_MANDATORY),
  fromTime: Yup.date().required(STRINGS.validation.FIELD_MANDATORY),
  toTime: Yup.date().required(STRINGS.validation.FIELD_MANDATORY),
});

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      padding: theme.spacing(2),
    },
    healthCenterPanel: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(2),
    },
    font: {
      color: "#fff",
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginRight: theme.spacing(2),
    },
    formContainer: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    formRow: {
      display: "flex",
      marginTop: theme.spacing(1),
    },
    formItem: {
      margin: theme.spacing(1),
      width: "100%",
    },
    textArea: {
      overflow: "hidden",
      border: "1px solid gray",
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1),
    },
    textField: {
      width: "100%",
    },
    optionContainer: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginTop: theme.spacing(1),
    },
    actionSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
  }),
);

interface Props {
  lockingSchedule: boolean;
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  pickedDate: Date;
  handleShow: () => void;
  onLockSchedule: (
    fromDate: Date,
    fromTime: Date,
    toDate: Date,
    toTime: Date,
  ) => void;
}

export default function LockSchedule({
  lockingSchedule,
  loadingProfessional,
  currentProfessional,
  pickedDate,
  handleShow,
  onLockSchedule,
}: Props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      fromDate: pickedDate,
      fromTime: pickedDate,
      toDate: pickedDate,
      toTime: pickedDate,
    },
    onSubmit: (values) => {
      onLockSchedule(
        values.fromDate,
        values.fromTime,
        values.toDate,
        values.toTime,
      );
    },
    validationSchema,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setFieldValue, errors, touched } = formik;

  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer}>
        <Avatar
          src={currentProfessional.avatarUrl}
          loading={loadingProfessional}
          className={classes.avatar}
        />
        <Typography variant="h5">
          {`Dr. ${currentProfessional.firstName} ${currentProfessional.firstFamilyName}`}
        </Typography>
      </div>
      <FormikProvider value={formik}>
        <Form className={classes.formContainer}>
          <div className={classes.formRow}>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.START_DATE}
              </Typography>
              <Field name="fromDate">
                {({ form: { values } }: FieldProps) => {
                  const onChange = (date?: Date) => {
                    date && setFieldValue("fromDate", date);
                  };
                  return (
                    <DatePicker
                      date={values.fromDate}
                      handleDateChange={onChange}
                      error={!!(errors.fromDate && touched.fromDate)}
                      helperText={
                        errors.fromDate && touched.fromDate
                          ? STRINGS.validation.FIELD_MANDATORY
                          : ""
                      }
                    />
                  );
                }}
              </Field>
            </div>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.START_TIME}
              </Typography>
              <Field name="fromTime">
                {({ form: { values } }: FieldProps) => {
                  const onChange = (time?: Date) => {
                    time && setFieldValue("fromTime", time);
                  };
                  return (
                    <TimePicker
                      date={values.fromTime}
                      handleDateChange={onChange}
                      error={!!(errors.fromTime && touched.fromTime)}
                      helperText={
                        errors.fromTime && touched.fromTime
                          ? STRINGS.validation.FIELD_MANDATORY
                          : ""
                      }
                    />
                  );
                }}
              </Field>
            </div>
          </div>
          <div className={classes.formRow}>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.END_DATE}
              </Typography>
              <Field name="toDate">
                {({ form: { values } }: FieldProps) => {
                  const onChange = (date?: Date) => {
                    date && setFieldValue("toDate", date);
                  };
                  return (
                    <DatePicker
                      date={values.toDate}
                      handleDateChange={onChange}
                      error={!!(errors.toDate && touched.toDate)}
                      helperText={
                        errors.toDate && touched.toDate
                          ? STRINGS.validation.FIELD_MANDATORY
                          : ""
                      }
                    />
                  );
                }}
              </Field>
            </div>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.END_TIME}
              </Typography>
              <Field name="toTime">
                {({ form: { values } }: FieldProps) => {
                  const onChange = (time?: Date) => {
                    time && setFieldValue("toTime", time);
                  };
                  return (
                    <TimePicker
                      date={values.toTime}
                      handleDateChange={onChange}
                      error={!!(errors.toTime && touched.toTime)}
                      helperText={
                        errors.toTime && touched.toTime
                          ? STRINGS.validation.FIELD_MANDATORY
                          : ""
                      }
                    />
                  );
                }}
              </Field>
            </div>
          </div>
          <div className={classes.actionSection}>
            <PrimaryButton
              label={STRINGS.generals.CANCEL}
              variant="text"
              color="primary"
              onClick={handleShow}
            />
            <LoadingWrapper loading={lockingSchedule}>
              <PrimaryButton
                variant="contained"
                color="primary"
                type="submit"
                label={STRINGS.generals.SAVE}
                disabled={lockingSchedule}
              />
            </LoadingWrapper>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
