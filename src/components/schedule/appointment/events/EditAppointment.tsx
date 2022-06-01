import {
  createStyles,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import { formatDate } from "../../../../utils/date";
import STRINGS from "../../../../utils/strings";
import { fullName } from "../../../../utils/user";
import { getTimeScheduleOption } from "../../../../utils/utils";
import Avatar from "../../../Avatar";
import PrimaryButton from "../../../buttons/PrimaryButton";
import DatePicker from "../../../inputs/DatePicker";
import TimePicker from "../../../inputs/TimePicker";
import LoadingWrapper from "../../../LoadingWrapper";
import ConfirmModal from "../../../modals/ConfirmModal";

const validationSchema = Yup.object().shape({
  date: Yup.date().required(STRINGS.validation.FIELD_MANDATORY),
  time: Yup.date().required(STRINGS.validation.FIELD_MANDATORY),
  specialty: Yup.string().required(STRINGS.validation.FIELD_MANDATORY),
  center: Yup.string().required(STRINGS.validation.FIELD_MANDATORY),
  appointmentDurationTime: Yup.number().required(
    STRINGS.validation.FIELD_MANDATORY,
  ),
});

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.spacing(2),
      marginTop: "70px",
    },
    healthCenterPanel: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.spacing(2),
      textAlign: "center",
      maxWidth: "450px",
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
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    formItem: {
      margin: theme.spacing(1),
      minWidth: "200px",
      maxWidth: "250px",
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
      justifyContent: "space-between",
      marginTop: theme.spacing(2),
    },
    leftActionSection: {
      display: "flex",
      alignItems: "center",
    },
    customerPanel: {
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(1),
    },
  }),
);

interface Props {
  healthCenter: Schemas.ProfessionalHealthCenterResponse;
  healthCenters: Schemas.ProfessionalHealthCenterResponse[];
  dateTime: Date;
  appointmentDurationTime: number;
  specialties: Schemas.SpecialtyResponse[];
  editingAppointment: boolean;
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  handleShow: () => void;
  onEdit: (request: Schemas.AppointmentCustomerRequest) => void;
}

export default function EditAppointment({
  healthCenter,
  healthCenters,
  dateTime,
  appointmentDurationTime,
  specialties,
  editingAppointment,
  loadingProfessional,
  currentProfessional,
  customer,
  handleShow,
  onEdit,
}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      center: healthCenter.code,
      appointmentDurationTime,
      date: dateTime,
      time: dateTime,
      specialty: specialties.length === 1 ? specialties[0].code : "",
    },
    validationSchema,
    onSubmit: (values) => {
      const from = moment(values.date, formatDate.DD_MM_YYYY);
      const to = moment(values.date, formatDate.DD_MM_YYYY);
      from.set({
        hour: values.time.getHours(),
        minute: values.time.getMinutes(),
      });
      to.set({
        hour: values.time.getHours(),
        minute: values.time.getMinutes(),
      });
      to.add(values.appointmentDurationTime, "minute");

      onEdit({
        from: {
          dateDay: from.date(),
          dateMonth: from.month() + 1,
          dateYear: from.year(),
          timeHour: from.hour(),
          timeMinute: from.minute(),
        },
        to: {
          dateDay: to.date(),
          dateMonth: to.month() + 1,
          dateYear: to.year(),
          timeHour: to.hour(),
          timeMinute: to.minute(),
        },
        addToCart: false,
        professionalLegalID: currentProfessional.legalID,
        healthCenterCode: values.center,
        specialtyCode: values.specialty,
        serviceCode: "FACE_TO_FACE",
      });
    },
  });

  const { setFieldValue, values, errors, touched } = formik;

  const theHealthCenter = useMemo(
    () => healthCenters.find((center) => center.code === values.center),
    [healthCenters, values.center],
  );

  const handleOpenModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const handleOnEditConfirm = useCallback(() => {
    handleOpenModal();
    const from = moment(values.date, formatDate.DD_MM_YYYY);
    const to = moment(values.date, formatDate.DD_MM_YYYY);
    from.set({
      hour: values.time.getHours(),
      minute: values.time.getMinutes(),
    });
    to.set({
      hour: values.time.getHours(),
      minute: values.time.getMinutes(),
    });
    to.add(values.appointmentDurationTime, "minute");
    onEdit({
      from: {
        dateDay: from.date(),
        dateMonth: from.month() + 1,
        dateYear: from.year(),
        timeHour: from.hour(),
        timeMinute: from.minute(),
      },
      to: {
        dateDay: to.date(),
        dateMonth: to.month() + 1,
        dateYear: to.year(),
        timeHour: to.hour(),
        timeMinute: to.minute(),
      },
      addToCart: false,
      professionalLegalID: currentProfessional.legalID,
      healthCenterCode: undefined,
      specialtyCode: values.specialty,
      serviceCode: "REMOTE",
    });
  }, [
    currentProfessional.legalID,
    handleOpenModal,
    onEdit,
    values.appointmentDurationTime,
    values.date,
    values.specialty,
    values.time,
  ]);

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
      <div className={classes.healthCenterPanel}>
        <Typography className={classes.font}>
          {`${theHealthCenter?.name || ""} | ${theHealthCenter?.address || ""}`}
        </Typography>
      </div>
      <FormikProvider value={formik}>
        <Form className={classes.formContainer}>
          <div className={classes.formRow}>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.APPOINTMENT_DATE}
              </Typography>
              <Field name="date">
                {() => {
                  const onChange = (date?: Date) => {
                    date && setFieldValue("date", date);
                  };
                  return (
                    <DatePicker
                      date={values.date}
                      handleDateChange={onChange}
                      error={!!(errors.date && touched.date)}
                      helperText={
                        errors.date && touched.date
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
                {STRINGS.appointment.APPOINTMENT_TIME}
              </Typography>
              <Field name="time">
                {() => {
                  const onChange = (time?: Date) => {
                    time && setFieldValue("time", time);
                  };
                  return (
                    <TimePicker
                      date={values.time}
                      handleDateChange={onChange}
                      error={!!(errors.time && touched.time)}
                      helperText={
                        errors.time && touched.time
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
                {STRINGS.appointment.APPOINTMENT_DURATION}
              </Typography>
              <Field name="appointmentDurationTime">
                {({ field }: FieldProps) => (
                  <TextField
                    className={classes.textField}
                    id="select_hour"
                    InputProps={{ color: "primary" }}
                    select
                    variant="outlined"
                    size="small"
                    margin="dense"
                    error={
                      !!(
                        errors.appointmentDurationTime &&
                        touched.appointmentDurationTime
                      )
                    }
                    helperText={
                      errors.appointmentDurationTime &&
                      touched.appointmentDurationTime
                        ? STRINGS.validation.FIELD_MANDATORY
                        : ""
                    }
                    {...field}>
                    {getTimeScheduleOption(5, 180).map((option, index) => (
                      <MenuItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        value={option.value}>
                        <Typography>{option.label.toUpperCase()}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </div>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.APPOINTMENT_HEALTH_CENTER}
              </Typography>
              <Field name="center">
                {({ field }: FieldProps) => (
                  <TextField
                    className={classes.textField}
                    id="select_hour"
                    InputProps={{ color: "primary" }}
                    select
                    variant="outlined"
                    size="small"
                    margin="dense"
                    error={!!(errors.center && touched.center)}
                    helperText={
                      errors.center && touched.center
                        ? STRINGS.validation.FIELD_MANDATORY
                        : ""
                    }
                    {...field}>
                    {healthCenters.map((option, index) => (
                      <MenuItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        value={option.code}>
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </div>
            <div className={classes.formItem}>
              <Typography className={classes.label}>
                {STRINGS.appointment.APPOINTMENT_SPECIALTIES}
              </Typography>
              <Field name="specialty">
                {({ field }: FieldProps) => (
                  <TextField
                    className={classes.textField}
                    id="select_hour"
                    InputProps={{ color: "primary" }}
                    select
                    variant="outlined"
                    size="small"
                    margin="dense"
                    error={!!(errors.specialty && touched.specialty)}
                    helperText={
                      errors.specialty && touched.specialty
                        ? STRINGS.validation.FIELD_MANDATORY
                        : ""
                    }
                    {...field}>
                    {specialties.map((option, index) => (
                      <MenuItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        value={option.code}>
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </div>
          </div>

          <Typography className={classes.label}>
            {STRINGS.generals.PATIENT}
          </Typography>
          <div className={classes.customerPanel}>
            <Typography>
              {`${fullName(customer)} | ${STRINGS.generals.ID}:  ${
                customer.legalID
              }`}
            </Typography>
          </div>
          <div className={classes.actionSection}>
            <PrimaryButton
              label={STRINGS.generals.CANCEL}
              variant="text"
              color="primary"
              onClick={handleShow}
            />
            <div className={classes.leftActionSection}>
              {/* TODO to add in next iteration to include remote service */}
              {/* <PrimaryButton
                label={STRINGS.appointment.REMOTE_CHANGE}
                variant="text"
                color="primary"
                onClick={handleOpenModal}
              /> */}
              <LoadingWrapper loading={editingAppointment}>
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  label={STRINGS.generals.SAVE}
                  disabled={editingAppointment}
                />
              </LoadingWrapper>
            </div>
          </div>
        </Form>
      </FormikProvider>
      <ConfirmModal
        open={openModal}
        loadingOnConfirm={editingAppointment}
        title={STRINGS.generals.ALERT}
        info={STRINGS.appointment.CHANGE_APPOINTMENT_MODE_INFO}
        confirmButtonText={STRINGS.generals.CONFIRM}
        handleShow={handleOpenModal}
        onConfirm={handleOnEditConfirm}
      />
    </div>
  );
}
