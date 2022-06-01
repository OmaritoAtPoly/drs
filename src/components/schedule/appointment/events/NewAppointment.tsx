/* eslint-disable react/jsx-curly-newline */
import {
  createStyles,
  makeStyles,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import shortid from "shortid";
import * as Yup from "yup";
import AddCustomerContainer from "../../../../containers/customer/customerActions/AddCustomerContainer";
import useHandlerError from "../../../../modules/utils/error/handleError";
import { formatDate } from "../../../../utils/date";
import STRINGS from "../../../../utils/strings";
import { fullName } from "../../../../utils/user";
import { getTimeScheduleOption } from "../../../../utils/utils";
import Avatar from "../../../Avatar";
import PrimaryButton from "../../../buttons/PrimaryButton";
import DatePicker from "../../../inputs/DatePicker";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../inputs/Search/NoOptionMatchItem";
import TimePicker from "../../../inputs/TimePicker";
import LoadingWrapper from "../../../LoadingWrapper";

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
      width: "100%",
      padding: theme.spacing(2),
    },
    customerContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 0,
      marginTop: "50px",
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
    boldFont: {
      color: "#fff",
      fontWeight: "bold",
      marginLeft: theme.spacing(0.25),
      marginRight: theme.spacing(0.25),
    },
    info: {
      display: "flex",
      flexDirection: "row",
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
      marginTop: theme.spacing(1),
    },
    formItem: {
      margin: theme.spacing(1),
      minWidth: "200px",
      maxWidth: "250px",
    },
    textAreaContainer: {
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
    radioGroup: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing(2),
    },
    selectedCustomerContainer: {
      marginTop: theme.spacing(1),
    },
    selectedCustomerTextBold: {
      fontWeight: "bold",
    },
    selectedCustomerTitle: {
      fontSize: "16px",
    },
    selectedCustomerText: {
      fontSize: "14px",
    },
    customerAvatar: {
      width: "50px",
      height: "50px",
    },
    selectedCustomerRow: {
      display: "flex",
      alignItems: "center",
    },
  }),
);
const styleTextArea = { height: "150px", width: "100%" };

interface Props {
  creatingAppointment: boolean;
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  searching: boolean;
  customersResult: Schemas.CustomerData[];
  center: Schemas.ProfessionalHealthCenterResponse;
  healthCenters: Schemas.ProfessionalHealthCenterResponse[];
  appointmentDurationTime: number;
  specialties: Schemas.SpecialtyResponse[];
  pickedDate: Date;
  onSearch: (search: string) => void;
  handleShow: () => void;
  handleOnCreate: (request: Schemas.AppointmentProfessionalRequest) => void;
}

export default function NewAppointment({
  loadingProfessional,
  creatingAppointment,
  currentProfessional,
  searching,
  customersResult,
  center,
  healthCenters,
  appointmentDurationTime,
  specialties,
  pickedDate,
  onSearch,
  handleShow,
  handleOnCreate,
}: Props) {
  const classes = useStyles();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [customerPanel, showCustomerPanel] = useState<boolean>(false);

  const { handlerError } = useHandlerError();
  const formik = useFormik({
    initialValues: {
      reason: "",
      customerId: "",
      customerName: "",
      customerEmail: "",
      customerAvatarUrl: "",
      date: pickedDate,
      time: pickedDate,
      specialty: specialties.length === 1 ? specialties[0].code : "",
      center: center.code,
      appointmentDurationTime,
      serviceCode: center.code === "REMOTE" ? "REMOTE" : "FACE_TO_FACE",
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
      if (values.customerId !== "") {
        handleOnCreate({
          customerLegalID: values.customerId,
          reason: [values.reason],
          from: {
            dateDay: from.date(),
            dateMonth: from.month() + 1,
            dateYear: from.year(),
            timeHour: from.hour(),
            timeMinute: from.minute(),
          },
          healthCenterCode:
            values.serviceCode !== "REMOTE" ? values.center : undefined,
          serviceCode: values.serviceCode,
          specialtyCode: values.specialty,
          to: {
            dateDay: to.date(),
            dateMonth: to.month() + 1,
            dateYear: to.year(),
            timeHour: to.hour(),
            timeMinute: to.minute(),
          },
        });
      } else {
        handlerError(STRINGS.validation.SELECT_PATIENT);
      }
    },
  });
  const { setFieldValue, values, errors, touched } = formik;

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearchFilter(event.target.value || "");
      onSearch(event.target.value || "");
    },
    [onSearch],
  );

  const handleShowAddCustomerPanel = useCallback(() => {
    showCustomerPanel(!customerPanel);
  }, [customerPanel]);

  const onPickCustomer = useCallback(
    (customer: Schemas.CustomerData) => {
      if (customer && customer.legalID) {
        setFieldValue("customerId", customer.legalID);
        setFieldValue("customerName", fullName(customer));
        setFieldValue("customerEmail", customer.email);
        setFieldValue("customerAvatarUrl", customer.avatarUrl);
      } else {
        handleShowAddCustomerPanel();
      }
    },
    [handleShowAddCustomerPanel, setFieldValue],
  );

  const filterSpecialtiesOptions = createFilterOptions({
    stringify: (option: Schemas.CustomerData) => `${fullName(option)}`,
  });

  const theHealthCenter = useMemo(
    () => healthCenters.find((ctr) => ctr.code === values.center),
    [healthCenters, values.center],
  );

  /* TODO to add in next iteration to include remote service */
  // const handleOnServiceCodeChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setFieldValue("serviceCode", (event.target as HTMLInputElement).value);
  //   },
  //   [setFieldValue],
  // );

  const handleOnCreateCustomerSuccess = useCallback(
    (data: Schemas.CustomerData) => {
      setFieldValue("customerId", data.legalID);
      setFieldValue("customerName", fullName(data));
      setFieldValue("customerEmail", data.email);
      setFieldValue("customerAvatarUrl", data.avatarUrl);
      handleShowAddCustomerPanel();
    },
    [handleShowAddCustomerPanel, setFieldValue],
  );

  return customerPanel ? (
    <AddCustomerContainer
      handleOnCreateCustomerSuccess={handleOnCreateCustomerSuccess}
      handleOnCancel={handleShowAddCustomerPanel}
      containerStyle={classes.customerContainer}
    />
  ) : (
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
        {values.serviceCode === "REMOTE" ? (
          <div className={classes.info}>
            <Typography className={classes.font}>
              {STRINGS.appointment.VIRTUAL_APPOINTMENT_INFO}
            </Typography>
            <Typography className={classes.boldFont}>
              {`${STRINGS.appointment.VIRTUAL_APPOINTMENT}`}
            </Typography>
          </div>
        ) : (
          <Typography className={classes.font}>
            {`${theHealthCenter?.name} | ${theHealthCenter?.address}`}
          </Typography>
        )}
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
                    {getTimeScheduleOption(5, 180).map((option) => (
                      <MenuItem key={shortid()} value={option.value}>
                        <Typography>{option.label.toUpperCase()}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </div>
            {values.serviceCode !== "REMOTE" && (
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
                      {healthCenters.map((option) => (
                        <MenuItem key={shortid()} value={option.code}>
                          <Typography>{option.name}</Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
              </div>
            )}
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
                    {specialties.map((option) => (
                      <MenuItem key={shortid()} value={option.code}>
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </div>
          </div>
          <div className={classes.formRow}>
            <div className={classes.textAreaContainer}>
              <Typography className={classes.label}>
                {STRINGS.appointment.APPOINTMENT_REASON}
              </Typography>
              <Field name="reason">
                {({ field }: FieldProps) => (
                  <TextareaAutosize
                    className={classes.textArea}
                    rowsMax={4}
                    style={styleTextArea}
                    placeholder={
                      STRINGS.appointment.APPOINTMENT_REASON_PLACEHOLDER
                    }
                    {...field}
                  />
                )}
              </Field>
            </div>
          </div>
          <div>
            <Typography className={classes.label}>
              {STRINGS.generals.SEARCH_CUSTOMER}
            </Typography>
            <Autocomplete
              options={customersResult}
              // eslint-disable-next-line no-confusing-arrow
              getOptionLabel={(option: Schemas.CustomerData) =>
                option.legalID ? fullName(option) : searchFilter
              }
              freeSolo
              inputProps={{
                placeholder: STRINGS.generals.FIND_PATIENT_BY_NAME_ETC,
              }}
              renderOption={(option: Schemas.CustomerData) => (
                <div className={classes.optionContainer}>
                  <Typography variant="h6" color="primary">
                    {fullName(option)}
                  </Typography>
                  <Typography>{option.legalID}</Typography>
                </div>
              )}
              renderInitialOption={() => (
                <NoOptionMatchItem
                  item={{ label: searchFilter, value: searchFilter }}
                />
              )}
              loading={searching}
              filterOptions={filterSpecialtiesOptions}
              onChange={onPickCustomer}
              onDebounce={onDebounceSearch}
            />
          </div>
          {values.customerId !== "" && (
            <div className={classes.selectedCustomerContainer}>
              <Typography
                className={`${classes.selectedCustomerTitle} ${classes.selectedCustomerTextBold}`}>
                {STRINGS.schedule.SELECTED_CUSTOMER}
              </Typography>
              <div className={classes.selectedCustomerRow}>
                <Avatar
                  className={classes.customerAvatar}
                  src={values.customerAvatarUrl}
                />
                <div>
                  <Typography
                    className={`${classes.selectedCustomerText} ${classes.selectedCustomerTextBold}`}>
                    {values.customerName}
                  </Typography>
                  <Typography className={`${classes.selectedCustomerTitle}`}>
                    {values.customerEmail}
                  </Typography>
                </div>
              </div>
            </div>
          )}
          <div className={classes.actionSection}>
            <PrimaryButton
              label={STRINGS.generals.CANCEL}
              variant="text"
              color="primary"
              onClick={handleShow}
            />
            <LoadingWrapper loading={creatingAppointment}>
              <PrimaryButton
                variant="contained"
                color="primary"
                type="submit"
                label={STRINGS.generals.SAVE}
                disabled={creatingAppointment}
              />
            </LoadingWrapper>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
