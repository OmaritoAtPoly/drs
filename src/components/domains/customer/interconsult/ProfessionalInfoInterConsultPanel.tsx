/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, TextField, Theme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import React, { useCallback, useState } from "react";
import { defaultProfessionalData } from "../../../../utils/defaultData";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../inputs/Search/NoOptionMatchItem";

const styles = makeStyles((theme: Theme) => ({
  formGroup: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    width: "300px",
  },
  autocomplete: {
    width: "100%",
    marginTop: "5px",
  },
  standardWidth: {
    width: 300,
  },
}));

interface Props {
  targetSpecialtyCode: string;
  targetProfessionalName: string;
  targetProfessionalEmail: string;
  loadingProfessional: boolean;
  searchResult: Schemas.ProfessionalData[];
  loadingSpecialties: boolean;
  searchSpecialtyResults: Schemas.SpecialtyResponse[];

  // specialtyOptions: { value: string; label: string }[];
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleAddProfessional: (professional: Schemas.ProfessionalData) => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  onSpecialtyDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleSpecialty: (specialty: Schemas.SpecialtyResponse) => void;
  toProfessional?: Schemas.ProfessionalData;
}

export default function ProfessionalInfoInterConsultPanel({
  targetProfessionalName,
  targetProfessionalEmail,
  targetSpecialtyCode,
  loadingProfessional,
  loadingSpecialties,
  searchSpecialtyResults,
  searchResult,
  handleChange,
  handleBlur,
  handleAddProfessional,
  onDebounceSearch,
  onSpecialtyDebounceSearch,
  handleSpecialty,
  toProfessional,
}: Props) {
  const classes = styles();
  const [noOptionLabel, setNoOptionLabel] = useState<string>("");
  const [noSpecialtyOptionLabel, setNoSpecialtyOptionLabel] = useState<string>(
    "",
  );

  const filterOptions = createFilterOptions({
    stringify: (option: Schemas.ProfessionalData) =>
      `${option.firstName} ${option.firstFamilyName}`,
  });

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<any>) => {
      setNoOptionLabel(e.target.value);
      onDebounceSearch(e);
    },
    [onDebounceSearch],
  );

  const onAddProfessional = useCallback(
    (professional: Schemas.ProfessionalData | any) => {
      if (professional) {
        if (professional.firstName === undefined) {
          const professionalData: Schemas.ProfessionalData = {
            ...(toProfessional || defaultProfessionalData),
            firstName: noOptionLabel,
            firstFamilyName: "",
            professionalEmail: "",
            legalID: "",
          };
          handleAddProfessional(professionalData);
        } else handleAddProfessional(professional);
      }
    },
    [handleAddProfessional, noOptionLabel, toProfessional],
  );

  const handleOnSpecialtyChange = useCallback(
    (e: React.ChangeEvent<any>) => {
      setNoSpecialtyOptionLabel(e.target.value);
      onSpecialtyDebounceSearch(e);
    },
    [onSpecialtyDebounceSearch],
  );

  const onAddSpecialty = useCallback(
    (specialty: Schemas.SpecialtyResponse | any) => {
      if (specialty) {
        if (specialty.code === undefined) {
          const theSpecialty: Schemas.SpecialtyResponse = {
            code: noSpecialtyOptionLabel,
            name: noSpecialtyOptionLabel,
          };
          handleSpecialty(theSpecialty);
        } else handleSpecialty(specialty);
      }
    },
    [handleSpecialty, noSpecialtyOptionLabel],
  );

  const filterSpecialtiesOptions = createFilterOptions({
    stringify: (option: Schemas.SpecialtyResponse) => `${option.name}`,
  });

  return (
    <>
      <div className={classes.formGroup}>
        <Autocomplete
          className={classes.autocomplete}
          loading={loadingSpecialties}
          options={searchSpecialtyResults}
          // eslint-disable-next-line no-confusing-arrow
          getOptionLabel={(option: Schemas.SpecialtyResponse) =>
            `${option.name || noSpecialtyOptionLabel}` || ""
          }
          filterOptions={filterSpecialtiesOptions}
          freeSolo
          autoComplete={false}
          onChange={onAddSpecialty}
          inputProps={{
            autoComplete: "off",
            placeholder: "Buscar Especialidad *",
            autoFocus: true,
          }}
          // renderInitialOption={() => (
          //   <NoOptionMatchItem
          //     item={{
          //       label: noSpecialtyOptionLabel,
          //       value: noSpecialtyOptionLabel,
          //     }}
          //   />
          // )}
          onDebounce={handleOnSpecialtyChange}
          value={{ code: targetSpecialtyCode, name: searchSpecialtyResults.find((f) => f.code === targetSpecialtyCode)?.name || "" }}
        />
      </div>
      <div className={classes.formGroup}>
        <Autocomplete
          className={classes.autocomplete}
          loading={loadingProfessional}
          options={searchResult}
          // eslint-disable-next-line no-confusing-arrow
          getOptionLabel={(option: Schemas.ProfessionalData) =>
            `${option.firstName || noOptionLabel} ${option.firstFamilyName || ""
            }` || ""
          }
          filterOptions={filterOptions}
          freeSolo
          autoComplete={false}
          onChange={onAddProfessional}
          inputProps={{
            autoComplete: "off",
            placeholder: "Buscar Profesional",
            autoFocus: true,
          }}
          renderInitialOption={() => (
            <NoOptionMatchItem
              item={{ label: noOptionLabel, value: noOptionLabel }}
            />
          )}
          onDebounce={handleOnChange}
          value={toProfessional}
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          type="text"
          id="targetProfessionalEmail"
          name="targetProfessionalEmail"
          placeholder="Correo profesional"
          value={targetProfessionalEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
          className={classes.standardWidth}
        />
      </div>
    </>
  );
}
