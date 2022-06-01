import { makeStyles, Typography } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../utils/types";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import LanguagesList from "../../../auth/signUp/consultatories/languages/LanguagesList";
import SpecialtiesList from "../../../auth/signUp/consultatories/specialties/SpecialtiesList";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalRequest>;
  touched: FormikErrors<Schemas.ProfessionalData>;
  values: Schemas.ProfessionalData & {
    specialtiesValues: Schemas.SpecialtyResponse[];
  };
  operationDataLoading?: boolean;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Schemas.ProfessionalRequest>>;
  onSpecialtyDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  loadingSpecialties?: boolean;
  specialties: Schemas.SpecialtyResponse[];
  languages: ValueAndLabelType[];
  currentLanguagesValues?: string[];
  treatedCurrentSpecialties?: string[];
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
    color: "#828282", // todo add this color to palette
  },
  marginTop: {
    marginTop: 6,
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

export default function PublicGeneralData({
  errors,
  touched,
  values,
  operationDataLoading = false,
  setFieldValue,
  onSpecialtyDebounceSearch,
  loadingSpecialties = false,
  specialties = [],
  languages = [],
  currentLanguagesValues,
  treatedCurrentSpecialties,
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
        setSpecialtyLocal({ code: "", name: "" });
      }
    },
    [setFieldValue, noEmptySpecialties],
  );
  const onPressDelete = useCallback(
    (name: string) => {
      if (values.specialties && treatedCurrentSpecialties) {
        const code = values.specialties.find((a) => a === name);
        const valueRemaining = treatedCurrentSpecialties.filter(
          (a) => a !== code,
        );
        setFieldValue("specialties", valueRemaining);
      }
    },
    [setFieldValue, values.specialties, treatedCurrentSpecialties],
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
      const valueRemaining = currentLanguagesValues?.filter(
        (a) => a !== (lan ? lan.value : ""),
      );
      setFieldValue("languages", valueRemaining);
    },
    [currentLanguagesValues, languages, setFieldValue],
  );

  const currentSpecialtiesValues = useMemo(() => {
    let currentSpecialties: Schemas.SpecialtyResponse[] = [];
    if (treatedCurrentSpecialties) {
      currentSpecialties = treatedCurrentSpecialties?.map((a) => ({
        code: a,
        name: a,
      }));
    }
    return currentSpecialties;
  }, [treatedCurrentSpecialties]);

  return (
    <div className={classes.container}>
      <div className={classes.rowInput}>
        <div className={`${classes.formGroup} ${classes.marginTop}`}>
          <SpecialtiesList
            onDelete={onPressDelete}
            specialties={currentSpecialtiesValues}
          />
          <Autocomplete
            loading={loadingSpecialties}
            options={specialties}
            getOptionLabel={
              (option: Schemas.SpecialtyResponse) => option.name || ""
              // eslint-disable-next-line react/jsx-curly-newline
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
            languages={currentLanguagesValues || []}
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
    </div>
  );
}
