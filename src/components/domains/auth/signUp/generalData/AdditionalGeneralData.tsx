/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, Typography } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../utils/types";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import LanguagesList from "../consultatories/languages/LanguagesList";
import SpecialtiesList from "../consultatories/specialties/SpecialtiesList";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalRequest>;
  touched: FormikErrors<Schemas.ProfessionalData>;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  values: Schemas.ProfessionalData & {
    specialtiesValues: Schemas.SpecialtyResponse[];
  };
  operationDataLoading?: boolean;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Schemas.ProfessionalRequest>>;
  onSpecialtyDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  loadingSpecialties?: boolean;
  specialties: Schemas.SpecialtyResponse[];
  languages: ValueAndLabelType[];
  nationality: ValueAndLabelType[];
  onlyNationality?: boolean;
}

const styles = makeStyles({
  container: {
    marginBottom: 20,
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
    marginTop: theme.spacing(1.9),
    width: "100%",
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
  },
  titleStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
});

export default function AdditionalGeneralData({
  errors,
  touched,
  handleBlur,
  handleChange,
  values,
  operationDataLoading = false,
  setFieldValue,
  onSpecialtyDebounceSearch,
  loadingSpecialties = false,
  specialties = [],
  languages = [],
  nationality = [],
  onlyNationality = false,
}: Props) {
  const classes = styles();
  const [specialtyLocal, setSpecialtyLocal] = useState({ code: "", name: "" });
  const noEmptySpecialties = useMemo(
    () => values.specialties?.filter((a) => a !== "") || [],
    [values.specialties],
  );

  const handleSpecialtyChange = useCallback(
    (value: Schemas.SpecialtyResponse) => {
      if (value && value.code) {
        setFieldValue("specialties", [...noEmptySpecialties, value.code]);
        setFieldValue("specialtiesValues", [
          ...values.specialtiesValues,
          value,
        ]);
        setSpecialtyLocal({ code: "", name: "" });
      }
    },
    [setFieldValue, noEmptySpecialties, values.specialtiesValues],
  );
  const onPressDelete = useCallback(
    (name: string) => {
      if (values.specialties) {
        const code = values.specialtiesValues.find((a) => a.name === name);
        const valueRemaining = values.specialties.filter(
          (a) => a !== code?.code,
        );
        setFieldValue("specialties", valueRemaining);
        setFieldValue(
          "specialtiesValues",
          values.specialtiesValues.filter((a) => a.name !== name),
        );
      }
    },
    [setFieldValue, values.specialties, values.specialtiesValues],
  );

  const handleLanguageChange = useCallback(
    (value?: ValueAndLabelType) => {
      if (value) {
        const ind = values.languages?.indexOf(value.label);
        if (ind !== -1) return;
        setFieldValue(
          "languages",
          values.languages ? [...values.languages, value.value] : [value.value],
        );
      }
    },
    [setFieldValue, values.languages],
  );
  const onPressLanguageDelete = useCallback(
    (name: string) => {
      const lan = languages.find((l) => l.label === name);
      const valueRemaining = values.languages?.filter(
        (a) => a !== (lan ? lan.value : ""),
      );
      setFieldValue("languages", valueRemaining);
    },
    [languages, setFieldValue, values.languages],
  );

  const handleNationalityChange = useCallback(
    (value?: ValueAndLabelType) => {
      setFieldValue("nationality", value?.value || "");
    },
    [setFieldValue],
  );

  return (
    <div className={classes.container}>
      {!onlyNationality && (
        <div className={classes.rowInput}>
          <div className={`${classes.formGroup} ${classes.marginTop}`}>
            <SpecialtiesList
              onDelete={onPressDelete}
              specialties={values.specialtiesValues || []}
            />
            <Autocomplete
              loading={loadingSpecialties}
              options={specialties}
              getOptionLabel={(option: Schemas.SpecialtyResponse) =>
                option.name || ""
              }
              autoComplete={false}
              onChange={handleSpecialtyChange}
              inputProps={{
                autoComplete: "off",
                placeholder: STRINGS.generals.SPECIALTIES,
              }}
              value={specialtyLocal}
              onDebounce={onSpecialtyDebounceSearch}
            />
            {errors.specialties && touched.specialties && (
              <Typography className={classes.errorStyle}>
                {errors.specialties}
              </Typography>
            )}
          </div>
          <div className={`${classes.formGroup} ${classes.marginTop}`}>
            <LanguagesList
              onDelete={onPressLanguageDelete}
              languages={values.languages || []}
              allLanguages={languages}
            />
            <Autocomplete
              loading={operationDataLoading}
              options={languages}
              getOptionLabel={(option: ValueAndLabelType) => option.label || ""}
              freeSolo
              autoComplete={false}
              onChange={handleLanguageChange}
              inputProps={{
                autoComplete: "off",
                placeholder: STRINGS.generals.LANGUAGES,
              }}
              value={{ label: "", value: "" }}
            />
          </div>
        </div>
      )}
      <div className={classes.rowInput}>
        <div className={`${classes.formGroup} ${classes.marginTop}`}>
          <Typography className={classes.titleStyle}>
            {STRINGS.generals.NATIONALITY}
          </Typography>
          <Autocomplete
            loading={operationDataLoading}
            options={nationality}
            getOptionLabel={(option: ValueAndLabelType) => option.label || ""}
            freeSolo
            autoComplete={false}
            onChange={handleNationalityChange}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.generals.NATIONALITY,
            }}
            value={{ label: values.nationality }}
          />
          {errors.nationality && (
            <Typography className={classes.errorStyle}>
              {errors.nationality}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
