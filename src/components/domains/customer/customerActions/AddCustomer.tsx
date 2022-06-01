/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  createStyles,
  Divider,
  FormControlLabel,
  Link,
  makeStyles,
  Switch,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo } from "react";
import * as Yup from "yup";
import AvatarProfileContainer from "../../../../containers/customer/profile/info/AvatarProfileContainer";
import { EMAIL_REG_EXP } from "../../../../utils/constants";
import STRINGS from "../../../../utils/strings";
import { MapData } from "../../../../utils/types";
import {
  contactPhone,
  mainPhone,
  mainPhoneMobile,
} from "../../../../utils/user";
import validationSchema from "../../../../utils/yup/validationSchema";
import PrimaryButton from "../../../buttons/PrimaryButton";
import DatePicker from "../../../inputs/DatePicker";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import { ItemType } from "../../../inputs/Search/Search";
import LoadingWrapper from "../../../LoadingWrapper";
import ButtonMap from "../../../maps/ButtonMap";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      marginBottom: 150,
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    title: {
      color: "#323232",
      fontSize: "20px",
      lineHeight: "30px",
      fontWeight: "bold",
    },
    firstColum: {
      display: "flex",
      flexDirection: "column",
      width: "25%",
      alignItems: "center",
    },
    secondColum: {
      display: "flex",
      flexDirection: "column",
      width: "65%",
      marginTop: theme.spacing(0.5),
    },
    avatar: {
      display: "flex",
      flexDirection: "column",
    },
    divider: {
      width: "100%",
      height: 2,
      backgroundColor: "#D6E3F3",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      width: "48%",
      color: "#828282",
    },
    center: {
      alignItems: "center",
    },
    infoCustomer: {
      display: "flex",
      flexDirection: "column",
    },
    rowInput: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    input: {
      color: "#828282",
      fontFamily: "Nunito",
      fontStyle: "normal",
      fontSize: "100px",
      lineHeight: "20px",
    },
    demographic: {
      marginTop: theme.spacing(3),
      width: "100%",
    },
    map: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    rowMap: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    save: {
      fontSize: "15px",
      lineHeight: "20px",
      textTransform: "unset",
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
    buttonPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      textTransform: "none",
      fontSize: "15px",
      lineHeight: "20px",
    },
    img: {
      marginTop: theme.spacing(0.5),
    },
    cancel: {
      textDecorationLine: "underline",
      textTransform: "unset",
      marginRight: theme.spacing(1),
      alignSelf: "center",
    },
    date: {
      marginTop: 2,
      width: "100%",
      fontSize: 25,
    },
    marginTop: {
      marginTop: 6,
    },
    full: {
      width: "100%",
    },
    avatar2: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    inline: {
      display: "flex",
      flexDirection: "column",
    },
    link: {
      marginLeft: 5,
    },
    buttonStyle: {
      display: "flex",
      alignSelf: "center",
      width: "100%",
      marginTop: 2,
      height: 40,
    },
    switchLabelStyle: {
      width: "80%",
      textAlign: "justify",
    },
    switcherWrapper: {
      width: "45%",
      paddingBlock: theme.spacing(2),
    },
    phoneFormGroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    prefixContainer: {
      width: "70px",
      marginRight: theme.spacing(1),
    },
  }),
);

type Values = {
  customer: Schemas.CustomerData;
};

interface Props {
  onSubmit: (values: { customer: Schemas.CustomerData }) => void;
  onCancel: () => void;
  onValuesChange?: (values: Values) => void;
  customer: Schemas.CustomerData;
  genders: { [name: string]: string };
  bloodTypes: { [name: string]: string };
  maritalStatuses: { [name: string]: string };
  insurances: Schemas.HealthInsuranceData[];
  nationalities: ItemType[];
  contactPerson: ItemType[];
  loading?: boolean;
  loadingFetch?: boolean;
  loadingCities?: boolean;
  cities: Schemas.CityData[];
  containerStyle?: string;
  onDebounceCities: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}

const signupSchema = Yup.object().shape({
  customer: Yup.object().shape({
    firstName: Yup.string().required(STRINGS.error.NAME_REQUIRED),
    firstFamilyName: Yup.string().required(
      STRINGS.error.LAST_FAMILY_NAME_REQUIRED,
    ),
    legalID: Yup.string().required(STRINGS.error.LEGAL_ID_REQUIRED),
    cell: validationSchema.phone,
    hasEmail: Yup.boolean(),
    email: Yup.string().when("hasEmail", {
      is: true,
      then: Yup.string()
        .matches(EMAIL_REG_EXP, STRINGS.validation.TEXT_VALID_EMAIL)
        .required(STRINGS.error.EMAIL_REQUIRED),
      otherwise: Yup.string().notRequired(),
    }),
  }),
});
const AddCustomer = ({
  onSubmit,
  onCancel,
  onValuesChange = () => {},
  customer,
  genders,
  bloodTypes,
  maritalStatuses,
  insurances,
  nationalities,
  contactPerson,
  loading,
  loadingFetch,
  loadingCities,
  cities,
  containerStyle = undefined,
  onDebounceCities,
}: Props) => {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      customer: {
        ...customer,
        oldLegalID: customer.legalID,
        hasEmail: customer.hasEmail,
      },
    },
    enableReinitialize: true,
    onSubmit,
    validationSchema: signupSchema,
  });

  useEffect(() => {
    onValuesChange(values);
  }, [onValuesChange, values]);

  const gendersMemo = useMemo(
    () => Object.keys(genders).map((k) => ({ value: k, label: genders[k] })),
    [genders],
  );
  const bloodTypeMemo = useMemo(
    () =>
      Object.keys(bloodTypes).map((k) => ({ value: k, label: bloodTypes[k] })),
    [bloodTypes],
  );

  const maritalStatusesMemo = useMemo(
    () =>
      Object.keys(maritalStatuses).map((k) => ({
        value: k,
        label: maritalStatuses[k],
      })),
    [maritalStatuses],
  );

  const handlePicked = (date?: Date) => {
    if (!date) return;
    setFieldValue("customer.birthdateDay", date.getDate());
    setFieldValue("customer.birthdateMonth", date.getMonth() + 1);
    setFieldValue("customer.birthdateYear", date.getFullYear());
  };

  const mainPhoneMemo = useMemo<Schemas.PhoneRequest | undefined>(
    () => mainPhone(values.customer),
    [values.customer],
  );
  const mainPhoneMobileMemo = useMemo<Schemas.PhoneRequest | undefined>(
    () => mainPhoneMobile(values.customer),
    [values.customer],
  );
  const contactPhoneMemo = useMemo<Schemas.PhoneRequest | undefined>(
    () => contactPhone(values.customer),
    [values.customer],
  );

  const onChangePhoneCreator = useCallback(
    (
      phoneType: "MOBILE" | "HOME" | "CONTACT",
      nameProp: string,
      name?: string,
    ) => (e: React.ChangeEvent) => {
      name && setFieldValue(name, (e.target as any).value, true);
      const phone =
        values.customer.phones &&
        values.customer.phones.find(
          (t) =>
            (t.label === "Yo" &&
              t.phoneType === phoneType &&
              phoneType !== "CONTACT") ||
            (phoneType === "CONTACT" && t.phoneType === "CONTACT"),
        );
      if (phone) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const newPhones =
          values.customer.phones &&
          values.customer.phones.map(
            // eslint-disable-next-line no-confusing-arrow
            (t) => {
              const newMap = { ...t } as Record<string, string>;
              newMap[nameProp] = (e.target as any).value;
              return (t.label === "Yo" &&
                t.phoneType === phoneType &&
                phoneType !== "CONTACT") ||
                (phoneType === "CONTACT" && t.phoneType === "CONTACT")
                ? newMap
                : t;
            },
            (e.target as any).value,
          );
        setFieldValue("customer.phones", newPhones, true);
      } else {
        const newMap = {
          label: "Yo",
          name: "",
          phoneType,
          number: "",
          prefix: "593",
        } as Record<string, string>;
        newMap[nameProp] = (e.target as any).value;
        let newPhones = ([newMap] as any) as Schemas.PhoneRequest[];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        values.customer &&
          values.customer.phones &&
          (newPhones = [...values.customer.phones, ...newPhones]);
        setFieldValue("customer.phones", newPhones, true);
      }
    },
    [setFieldValue, values.customer],
  );

  const onChangeContactPerson = useCallback(
    (val: { value: string; label: string }) => {
      onChangePhoneCreator(
        "CONTACT",
        "label",
      )({ target: { value: val.value } } as any);
    },
    [onChangePhoneCreator],
  );

  const filterOptionsSimple = createFilterOptions({
    stringify: (option: { value: string; label: string }) =>
      `${option.label} ${option.value}`,
  });

  const handleChangeSimple = useCallback(
    (name: string) => (value?: { label: string; value: string }) => {
      setFieldValue(name, value?.value || "", true);
    },
    [setFieldValue],
  );

  const handleChangeAnyValue = useCallback(
    (name: string) => (value?: Schemas.CityData) => {
      value && setFieldValue(name, value, true);
    },
    [setFieldValue],
  );

  const handleChangeAddressValue = useCallback(
    (value?: Schemas.CustomerAddressData) => {
      let newAddresses = values.customer.addresses;
      if (value) {
        const find = values.customer.addresses?.find(
          (v) => v.addressType === "HOME",
        );
        if (find) {
          // eslint-disable-next-line no-confusing-arrow
          newAddresses = values.customer.addresses?.map((v) =>
            v.addressType === "HOME" ? value : v,
          );
        } else {
          newAddresses = [...(values.customer.addresses as any), value];
        }
        setFieldValue("customer.addresses", newAddresses);
        !values.customer.billingAddress &&
          setFieldValue(
            "customer.billingCity",
            {
              ...value,
              name: value.city,
              code: value.city,
              country: value.country,
              province: value.province,
            } as Schemas.CityData,
            true,
          );
      }
    },
    [setFieldValue, values.customer.addresses, values.customer.billingAddress],
  );

  const onSaveAddress = useCallback(
    (data: MapData) => {
      const newAddress = {
        ...data,
        city: data.city,
        province: data.province,
        country: data.country,
        addressType: "HOME",
        address: data.address || "",
        latitude: data.markerPosition.lat,
        longitude: data.markerPosition.lng,
        notes: data.notes,
      } as Schemas.CustomerAddressData;
      handleChangeAddressValue(newAddress);
    },
    [handleChangeAddressValue],
  );

  const onSaveContactAddress = useCallback(
    (data: MapData) => {
      onChangePhoneCreator(
        "CONTACT",
        "address",
      )({
        target: {
          ...data,
          value: data.address,
          city: data.city,
          province: data.province,
          country: data.country,
          address: data.address || "",
          latitude: data.markerPosition.lat,
          longitude: data.markerPosition.lng,
          notes: data.notes,
        },
      } as any);
    },
    [onChangePhoneCreator],
  );

  const onSaveBillingAddress = useCallback(
    (data: MapData) => {
      setFieldValue(
        "customer.billingAddress",
        `${data.address || ""}${data.notes ? ` / ${data.notes}` : ""}`,
        true,
      );
      setFieldValue(
        "customer.billingCity",
        {
          ...data,
          name: data.city,
          code: data.city,
          country: data.country,
          province: data.province,
        } as Schemas.CityData,
        true,
      );
    },
    [setFieldValue],
  );

  const handleChangeInsurance = useCallback(
    (value?: Schemas.CustomerInsurance) => {
      if (values.customer.insurances && values.customer.insurances.length) {
        const newValue = value || {};
        setFieldValue(
          "customer.insurances[0]",
          { ...newValue, customerID: values.customer.insurances[0].customerID },
          true,
        );
        return;
      }
      if (!value) {
        setFieldValue("customer.insurances", [], true);
        return;
      }
      setFieldValue("customer.insurances", [{ ...value }], true);
    },
    [setFieldValue, values.customer.insurances],
  );

  const handleChangeInsuranceCustomerID = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (values.customer.insurances && values.customer.insurances.length) {
        setFieldValue(
          "customer.insurances[0].customerID",
          event.target.value,
          true,
        );
        return;
      }
      setFieldValue(
        "customer.insurances",
        [{ customerID: event.target.value }],
        true,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFieldValue, values.customer.insurances],
  );

  useEffect(() => {
    setFieldValue(
      "customer.cell",
      mainPhoneMobileMemo ? `${mainPhoneMobileMemo.number}` : "",
      true,
    );
  }, [mainPhoneMobileMemo, setFieldValue]);

  const homeAddress = useMemo(() => {
    const addressLocal = values.customer.addresses?.find(
      (v) => v.addressType === "HOME",
    );
    if (!addressLocal) return "";
    return `${addressLocal.address || ""}${
      addressLocal.notes ? ` / ${addressLocal.notes}` : ""
    }`;
  }, [values.customer.addresses]);

  const contactPhoneValue = useMemo(() => {
    const phoneLocal = values.customer.phones?.find(
      (v) => v.phoneType === "CONTACT",
    );
    if (!phoneLocal) return "";
    return `${phoneLocal.address || ""}${
      (phoneLocal as any).notes ? ` / ${(phoneLocal as any).notes}` : ""
    }`;
  }, [values.customer.phones]);

  const handleHasEmail = useCallback(() => {
    values.customer.hasEmail
      ? setFieldValue("customer.email", "", true)
      : setFieldValue("customer.email", customer.email, true);
    setFieldValue("customer.hasEmail", !values.customer.hasEmail, true);
  }, [values.customer.hasEmail, setFieldValue, customer.email]);

  return (
    <form onSubmit={handleSubmit}>
      <LoadingWrapper
        loading={loadingFetch}
        classNameContainer={classes.container}>
        <div className={` ${classes.container} ${containerStyle}`}>
          <div className={classes.firstColum}>
            <div>
              <Typography className={classes.title}>
                {STRINGS.signupCustomer.NEW_CUSTOMER}
              </Typography>
            </div>
            <AvatarProfileContainer />
          </div>
          <div className={classes.secondColum}>
            <div className={classes.row}>
              <Typography>{STRINGS.generals.GENERAL_DATA}</Typography>
              <Divider className={classes.divider} />
            </div>
            <div className={classes.infoCustomer}>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <TextField
                    type="name"
                    name="customer.firstName"
                    required
                    error={
                      !!(
                        errors.customer?.firstName &&
                        touched.customer?.firstName
                      )
                    }
                    helperText={
                      errors.customer?.firstName && touched.customer?.firstName
                        ? errors.customer?.firstName
                        : ""
                    }
                    placeholder={`${STRINGS.signupCustomer.NAME_REQUIRED}`}
                    value={values.customer.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                    autoFocus
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    error={
                      !!(
                        errors.customer?.lastName && touched.customer?.lastName
                      )
                    }
                    name="customer.lastName"
                    helperText={
                      errors.customer?.lastName && touched.customer?.lastName
                        ? errors.customer?.lastName
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.LAST_NAME}
                    value={values.customer.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <TextField
                    type="name"
                    name="customer.firstFamilyName"
                    required
                    error={
                      !!(
                        errors.customer?.firstFamilyName &&
                        touched.customer?.firstFamilyName
                      )
                    }
                    helperText={
                      errors.customer?.firstFamilyName &&
                      touched.customer?.firstFamilyName
                        ? errors.customer?.firstFamilyName
                        : ""
                    }
                    placeholder={`${STRINGS.signupCustomer.FIRST_FAMILY_NAME}`}
                    value={values.customer.firstFamilyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    error={
                      !!(
                        errors.customer?.lastFamilyName &&
                        touched.customer?.lastFamilyName
                      )
                    }
                    name="customer.lastFamilyName"
                    helperText={
                      errors.customer?.lastFamilyName &&
                      touched.customer?.lastFamilyName
                        ? errors.customer?.lastFamilyName
                        : ""
                    }
                    placeholder={`${STRINGS.signupCustomer.LAST_FAMILY_NAME}`}
                    value={values.customer.lastFamilyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <div className={classes.date}>
                    <DatePicker
                      name="date"
                      date={
                        values.customer.birthdateDay &&
                        values.customer.birthdateMonth &&
                        values.customer.birthdateYear
                          ? new Date(
                              values.customer.birthdateYear,
                              values.customer.birthdateMonth - 1,
                              values.customer.birthdateDay,
                            )
                          : new Date()
                      }
                      handleDateChange={handlePicked}
                      label={STRINGS.signUp.BIRTH_DATE}
                    />
                  </div>
                </div>
                <div className={`${classes.formGroup} ${classes.marginTop}`}>
                  <Autocomplete
                    options={gendersMemo || undefined}
                    getOptionLabel={
                      (option: { label: string; value: string }) => option.label
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    filterOptions={filterOptionsSimple}
                    notIcon
                    onChange={handleChangeSimple("customer.gender")}
                    inputProps={{
                      autoComplete: "off",
                      placeholder: STRINGS.signupCustomer.GENDER,
                      autoFocus: false,
                    }}
                    value={{
                      label:
                        gendersMemo.find(
                          (f) => f.value === values.customer.gender,
                        )?.label || "",
                      value: values.customer.gender,
                    }}
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <TextField
                    type="id"
                    id="customer.legalID"
                    error={
                      !!(errors.customer?.legalID && touched.customer?.legalID)
                    }
                    name="customer.legalID"
                    helperText={
                      errors.customer?.legalID && touched.customer?.legalID
                        ? errors.customer?.legalID
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.ID}
                    value={values.customer.legalID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    type="personalEmail"
                    id="personalEmail"
                    error={
                      !!(errors.customer?.email && touched.customer?.email)
                    }
                    name="customer.email"
                    helperText={
                      errors.customer?.email && touched.customer?.email
                        ? errors.customer?.email
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.PERSONAL_EMAIL_FAMILY}
                    value={values.customer.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                    disabled={!values.customer.hasEmail}
                    required={values.customer.hasEmail}
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary">
                    {
                      STRINGS.signupCustomer
                        .YOU_CAN_VERIFY_PATIENT_CI_IN_THIS_LINK
                    }
                    <Link
                      className={classes.link}
                      href="https://servicios.registrocivil.gob.ec/cdd/"
                      target="_blank">
                      https://servicios.registrocivil.gob.ec/cdd/
                    </Link>
                  </Typography>
                </div>
                <div className={classes.switcherWrapper}>
                  {values.customer.hasEmail && (
                    <Typography>
                      {STRINGS.signupCustomer.WITHOUT_EMAIL}
                    </Typography>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!values.customer.hasEmail}
                        onChange={handleHasEmail}
                        color="primary"
                      />
                    }
                    className={classes.switchLabelStyle}
                    label={
                      !values.customer.hasEmail &&
                      STRINGS.signupCustomer.NO_NOTIFICATION_NOTE
                    }
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div
                  className={`${classes.formGroup} ${classes.phoneFormGroup}`}>
                  <div className={classes.prefixContainer}>
                    <TextField
                      type="cell"
                      id="cell-prefix"
                      required
                      placeholder={STRINGS.signupCustomer.DEFAULT_PREFIX}
                      value={
                        mainPhoneMobileMemo
                          ? `${mainPhoneMobileMemo.prefix}`
                          : ""
                      }
                      onChange={onChangePhoneCreator(
                        "MOBILE",
                        "prefix",
                        "customer.prefix",
                      )}
                      onBlur={handleBlur}
                      variant="outlined"
                      margin="dense"
                    />
                  </div>
                  <TextField
                    type="cell"
                    id="cell"
                    required
                    error={
                      !!(
                        (errors.customer as any)?.cell &&
                        (touched.customer as any)?.cell
                      )
                    }
                    name="customer.cell"
                    helperText={
                      (errors.customer as any)?.cell &&
                      (touched.customer as any)?.cell
                        ? (errors.customer as any)?.cell
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.CELL_REQUIRED}
                    value={
                      mainPhoneMobileMemo ? `${mainPhoneMobileMemo.number}` : ""
                    }
                    onChange={onChangePhoneCreator(
                      "MOBILE",
                      "number",
                      "customer.cell",
                    )}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
                <div
                  className={`${classes.formGroup} ${classes.phoneFormGroup}`}>
                  <div className={classes.prefixContainer}>
                    <TextField
                      type="phone"
                      id="phone-prefix"
                      placeholder={STRINGS.signupCustomer.DEFAULT_PREFIX}
                      value={mainPhoneMemo ? `${mainPhoneMemo.prefix}` : ""}
                      onChange={onChangePhoneCreator("HOME", "prefix")}
                      onBlur={handleBlur}
                      variant="outlined"
                      margin="dense"
                    />
                  </div>
                  <TextField
                    type="phone"
                    id="phone"
                    error={
                      !!(errors.customer?.phones && touched.customer?.phones)
                    }
                    name="customer.phones"
                    helperText={
                      errors.customer?.phones && touched.customer?.phones
                        ? errors.customer?.phones
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.PHONE}
                    value={mainPhoneMemo ? `${mainPhoneMemo.number}` : ""}
                    onChange={onChangePhoneCreator("HOME", "number")}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={`${classes.formGroup} ${classes.marginTop}`}>
                  <Autocomplete
                    options={bloodTypeMemo}
                    getOptionLabel={
                      (option: { label: string; value: string }) => option.label
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    filterOptions={filterOptionsSimple}
                    onChange={handleChangeSimple("customer.health.bloodType")}
                    value={{
                      label:
                        bloodTypeMemo.find(
                          (f) => f.value === values.customer.health?.bloodType,
                        )?.label || "",
                      value: values.customer.health?.bloodType,
                    }}
                    notIcon
                    inputProps={{
                      autoComplete: "off",
                      placeholder: STRINGS.signupCustomer.BLOOD_TYPE,
                      autoFocus: false,
                    }}
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    type="professionalRecordID"
                    id="professionalRecordID"
                    error={
                      !!(
                        errors.customer?.professionalRecordID &&
                        touched.customer?.professionalRecordID
                      )
                    }
                    name="customer.professionalRecordID"
                    helperText={
                      errors.customer?.professionalRecordID &&
                      touched.customer?.professionalRecordID
                        ? errors.customer?.professionalRecordID
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.NUMBER_EXPEDIENT}
                    value={values.customer.professionalRecordID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={`${classes.formGroup} ${classes.marginTop}`}>
                  <Autocomplete
                    options={nationalities}
                    getOptionLabel={
                      (option: { label: string; value: string }) => option.label
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    filterOptions={filterOptionsSimple}
                    onChange={handleChangeSimple("customer.nationality")}
                    value={{
                      label:
                        nationalities.find(
                          (f) => f.value === values.customer.nationality,
                        )?.label || "",
                      value: values.customer.nationality,
                    }}
                    notIcon
                    inputProps={{
                      autoComplete: "off",
                      placeholder: STRINGS.generals.NATIONALITY,
                      autoFocus: false,
                    }}
                  />
                </div>
                <div className={`${classes.formGroup} ${classes.marginTop}`}>
                  <Autocomplete
                    options={maritalStatusesMemo}
                    getOptionLabel={
                      (option: { label: string; value: string }) => option.label
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    filterOptions={filterOptionsSimple}
                    onChange={handleChangeSimple("customer.maritalStatus")}
                    value={{
                      label:
                        maritalStatusesMemo.find(
                          (f) => f.value === values.customer.maritalStatus,
                        )?.label || "",
                      value: values.customer.maritalStatus,
                    }}
                    notIcon
                    inputProps={{
                      autoComplete: "off",
                      placeholder: STRINGS.signupCustomer.MARITAL_STATUS,
                      autoFocus: false,
                    }}
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <TextField
                    id="occupation"
                    error={
                      !!(
                        errors.customer?.profession &&
                        touched.customer?.profession
                      )
                    }
                    name="customer.profession"
                    helperText={
                      errors.customer?.profession &&
                      touched.customer?.profession
                        ? errors.customer?.profession
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.OCCUPATION}
                    value={values.customer.profession}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </div>
              <div className={classes.demographic}>
                <Typography>
                  {STRINGS.signupCustomer.DEMOGRAPHIC_INFORMATION}
                </Typography>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.rowMap}>
                <div className={classes.map}>
                  <ButtonMap label={homeAddress} onSave={onSaveAddress} />
                </div>
              </div>
              <div className={classes.demographic}>
                <Typography>
                  {STRINGS.signupCustomer.INSURANCE_TITLE}
                </Typography>
              </div>
              <Divider className={classes.divider} />

              <div className={classes.rowInput}>
                <div className={`${classes.formGroup} ${classes.marginTop}`}>
                  <Autocomplete
                    options={insurances}
                    getOptionLabel={
                      (option: Schemas.CustomerInsurance) => option.name || ""
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    onChange={handleChangeInsurance}
                    // eslint-disable-next-line no-confusing-arrow
                    value={
                      values.customer.insurances &&
                      values.customer.insurances.length
                        ? { name: values.customer.insurances[0].name }
                        : { name: "" }
                    }
                    notIcon
                    inputProps={{
                      autoComplete: "off",
                      placeholder: STRINGS.signupCustomer.INSURANCE_TITLE,
                      autoFocus: false,
                    }}
                  />
                </div>
                <div className={classes.formGroup}>
                  <TextField
                    id="customer.insurances[0].customerID"
                    name="customer.insurances[0].customerID"
                    placeholder="Número de Póliza"
                    value={
                      values.customer.insurances &&
                      values.customer.insurances.length
                        ? values.customer.insurances[0].customerID
                        : undefined
                    }
                    onChange={handleChangeInsuranceCustomerID}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
              </div>
              <div className={classes.demographic}>
                <Typography>{STRINGS.signupCustomer.INVOICE_DATA}</Typography>
              </div>
              <Divider className={classes.divider} />
              <FormControlLabel
                control={
                  <Switch
                    checked={values.customer.billingFromData}
                    onChange={handleChange}
                    name="customer.billingFromData"
                    color="secondary"
                  />
                }
                label={STRINGS.signupCustomer.COMPLETE_CUSTOMER}
              />
              {!values.customer.billingFromData && (
                <>
                  <div className={classes.rowInput}>
                    <div className={classes.formGroup}>
                      <TextField
                        id="customer.billingName"
                        error={
                          !!(
                            errors.customer &&
                            errors.customer.billingName &&
                            touched.customer &&
                            touched.customer.billingName
                          )
                        }
                        name="customer.billingName"
                        helperText={
                          errors.customer &&
                          errors.customer.billingName &&
                          touched.customer &&
                          touched.customer.billingName
                            ? errors.customer.billingName
                            : ""
                        }
                        placeholder={STRINGS.signupCustomer.SOCIAL_REASON}
                        value={values.customer.billingName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        margin="dense"
                        className={classes.input}
                      />
                    </div>
                    <div className={classes.formGroup}>
                      <TextField
                        id="customer.billingLegalID"
                        error={
                          !!(
                            errors.customer &&
                            errors.customer.billingLegalID &&
                            touched.customer &&
                            touched.customer.billingLegalID
                          )
                        }
                        name="customer.billingLegalID"
                        helperText={
                          errors.customer &&
                          errors.customer.billingLegalID &&
                          touched.customer &&
                          touched.customer.billingLegalID
                            ? errors.customer.billingLegalID
                            : ""
                        }
                        placeholder={STRINGS.signupCustomer.DOCUMENT}
                        value={values.customer.billingLegalID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        margin="dense"
                      />
                    </div>
                  </div>
                  <div className={classes.rowInput}>
                    <div className={classes.formGroup}>
                      <ButtonMap
                        label={values.customer.billingAddress || ""}
                        onSave={onSaveBillingAddress}
                      />
                    </div>
                    <div
                      className={`${classes.formGroup} ${classes.marginTop}`}>
                      <Autocomplete
                        loading={loadingCities}
                        options={cities}
                        getOptionLabel={
                          (option: Schemas.CityData) => option.name || ""
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                        autoComplete={false}
                        onChange={handleChangeAnyValue("customer.billingCity")}
                        inputProps={{
                          autoComplete: "off",
                          placeholder: STRINGS.patientInfo.CITY,
                          autoFocus: false,
                        }}
                        onDebounce={onDebounceCities}
                        value={{
                          name: values.customer.billingCity?.name || "",
                        }}
                      />
                    </div>
                  </div>
                  <div className={classes.rowInput}>
                    <div className={classes.formGroup}>
                      <TextField
                        type="billingPhone"
                        id="billingPhone"
                        error={
                          !!(
                            errors.customer?.billingPhone &&
                            touched.customer?.billingPhone
                          )
                        }
                        name="customer.billingPhone"
                        helperText={
                          errors.customer?.billingPhone &&
                          touched.customer?.billingPhone
                            ? errors.customer?.billingPhone
                            : ""
                        }
                        placeholder={STRINGS.signupCustomer.PHONE}
                        value={values.customer?.billingPhone || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        margin="dense"
                      />
                    </div>
                  </div>
                </>
              )}
              <div className={classes.demographic}>
                <Typography>
                  {STRINGS.signupCustomer.EMERGENCY_CONTACT}
                </Typography>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <TextField
                    type="phone"
                    id="emergencyContactName"
                    error={
                      !!(errors.customer?.phones && touched.customer?.phones)
                    }
                    name="customer.phones"
                    helperText={
                      errors.customer?.phones && touched.customer?.phones
                        ? errors.customer?.phones
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.NAME}
                    value={
                      contactPhoneMemo
                        ? `${(contactPhoneMemo as any).name || ""}`
                        : ""
                    }
                    onChange={onChangePhoneCreator("CONTACT", "name")}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
                <div className={`${classes.formGroup} ${classes.marginTop}`}>
                  <Autocomplete
                    options={contactPerson}
                    getOptionLabel={
                      (option: ItemType) => option.label || ""
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    notIcon
                    onChange={onChangeContactPerson}
                    inputProps={{
                      autoComplete: "off",
                      placeholder: STRINGS.signupCustomer.RELATIONSHIP,
                      autoFocus: false,
                    }}
                    value={
                      contactPhoneMemo
                        ? { label: `${(contactPhoneMemo as any).label || ""}` }
                        : { label: "" }
                    }
                  />
                </div>
              </div>
              <div className={classes.rowInput}>
                <div className={classes.formGroup}>
                  <TextField
                    type="phone"
                    id="emergence.phone.emergency"
                    error={
                      !!(errors.customer?.phones && touched.customer?.phones)
                    }
                    name="customer.phones"
                    helperText={
                      errors.customer?.phones && touched.customer?.phones
                        ? errors.customer?.phones
                        : ""
                    }
                    placeholder={STRINGS.signupCustomer.CELL_PHONE_EMERGENCY}
                    value={contactPhoneMemo ? `${contactPhoneMemo.number}` : ""}
                    onChange={onChangePhoneCreator("CONTACT", "number")}
                    onBlur={handleBlur}
                    variant="outlined"
                    margin="dense"
                  />
                </div>
                <div className={classes.formGroup}>
                  <ButtonMap
                    label={contactPhoneValue}
                    onSave={onSaveContactAddress}
                  />
                </div>
              </div>
              <div className={classes.button}>
                <div className={classes.cancel}>
                  <Button
                    color="primary"
                    className={classes.cancel}
                    onClick={onCancel}>
                    {STRINGS.allergies.CANCEL}
                  </Button>
                </div>
                <div className={classes.save}>
                  <PrimaryButton
                    loading={loading}
                    variant="contained"
                    className={classes.buttonPrimary}
                    label={STRINGS.signupCustomer.SAVE_CUSTOMER}
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </form>
  );
};

export default AddCustomer;
