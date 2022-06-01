/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys } from "../../../../../modules/apiTypes";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../utils/types";
import DatePicker from "../../../../inputs/DatePicker";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import FirstAndLastFamilyName from "./FirstAndLastFamilyName";
import NameAndLastName from "./NameAndLastName";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalRequest>;
  touched: FormikErrors<Schemas.ProfessionalData>;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  values: Schemas.ProfessionalRequest;
  handleDateChange?: (date?: Date) => void;
  operationDataLoading?: boolean;
  gender?: ValueAndLabelType[];
  professions?: Schemas.ProfessionResponse[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Schemas.ProfessionalRequest>>;
  hideProfession?: boolean;
  editMode?: boolean;
}

const styles = makeStyles({
  container: {
    marginBottom: 20,
    marginTop: 25,
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
  marginTop: {
    marginTop: 6,
  },
  dateTimeStyle: {
    display: "flex",
    paddingLeft: "10px",
    paddingBlock: "10px",
  },
  date: {
    marginTop: 2,
    width: "100%",
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
  },
});

export default function GeneralData({
  errors,
  touched,
  handleBlur,
  handleChange,
  handleDateChange,
  values,
  operationDataLoading = false,
  gender = [],
  professions = [],
  setFieldValue,
  hideProfession,
  editMode = false,
}: Props) {
  const classes = styles();

  const handleGenderChange = useCallback(
    (name: string) => (value?: ValueAndLabelType) => {
      setFieldValue(name, value?.label || "");
    },
    [setFieldValue],
  );

  const handleProfessionChange = useCallback(
    (name: string) => (value?: Schemas.ProfessionResponse) => {
      setFieldValue(name, value?.code || "");
      queryCache.setQueryData(ReactQueryKeys["default-dr-profession"], {
        profession: value?.code,
      });
    },
    [setFieldValue],
  );

  const genderValue = useMemo(
    () => ({
      label:
        gender?.find((g) => g.value === values.gender)?.label || values.gender,
    }),
    [gender, values.gender],
  );

  return (
    <div className={classes.container}>
      <NameAndLastName
        errors={errors}
        handleBlur={handleBlur}
        touched={touched as any}
        handleChange={handleChange}
        firstName={values.firstName}
        lastName={values.lastName || ""}
      />
      <FirstAndLastFamilyName
        errors={errors}
        handleBlur={handleBlur}
        touched={touched as any}
        handleChange={handleChange}
        firstFamilyName={values.firstFamilyName}
        lastFamilyName={values.lastFamilyName}
      />
      <div className={classes.rowInput}>
        <div className={classes.formGroup}>
          <div className={classes.date}>
            <DatePicker
              date={
                values.birthdateDay &&
                values.birthdateMonth &&
                values.birthdateYear
                  ? new Date(
                      values.birthdateYear,
                      values.birthdateMonth - 1,
                      values.birthdateDay,
                    )
                  : new Date()
              }
              handleDateChange={handleDateChange}
              label={STRINGS.signUp.BIRTH_DATE}
            />
          </div>
        </div>
        {!editMode && (
          <div className={classes.formGroup}>
            <TextField
              type="text"
              id="legalID"
              error={!!(errors.legalID && touched.legalID)}
              name="legalID"
              label={
                errors.legalID && touched.legalID
                  ? STRINGS.error.ERROR
                  : STRINGS.signUp.WRITE_YOUR_ID
              }
              helperText={
                errors.legalID && touched.legalID ? errors.legalID : ""
              }
              placeholder={STRINGS.signUp.WRITE_YOUR_ID}
              value={values.legalID}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              margin="dense"
            />
          </div>
        )}
      </div>
      <div className={classes.rowInput}>
        <div className={`${classes.formGroup} ${classes.marginTop}`}>
          <Autocomplete
            loading={operationDataLoading}
            options={gender}
            getOptionLabel={(option: ValueAndLabelType) => option.label || ""}
            freeSolo
            placeholder={STRINGS.signUp.GENDER}
            autoComplete={false}
            onChange={handleGenderChange("gender")}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.generals.GENDER,
            }}
            value={genderValue}
          />
          {errors.gender && (
            <Typography className={classes.errorStyle}>
              {errors.gender}
            </Typography>
          )}
        </div>
        <div className={`${classes.formGroup} ${classes.marginTop}`}>
          {!hideProfession && (
            <>
              <Autocomplete
                loading={operationDataLoading}
                options={professions}
                getOptionLabel={(option: Schemas.ProfessionResponse) =>
                  option.name || ""
                }
                freeSolo
                placeholder={STRINGS.signUp.PROFESSION}
                autoComplete={false}
                onChange={handleProfessionChange("profession")}
                inputProps={{
                  autoComplete: "off",
                  placeholder: STRINGS.generals.PROFESSION_REQUIRED,
                }}
              />
              {errors.profession && (
                <Typography className={classes.errorStyle}>
                  {errors.profession}
                </Typography>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
