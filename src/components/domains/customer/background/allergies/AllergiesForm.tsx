import {
  createStyles,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import { defaultStyleTextArea } from "../../../../../utils/defaultData";
import STRINGS from "../../../../../utils/strings";
import PrimaryButton from "../../../../buttons/PrimaryButton";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../../inputs/Search/NoOptionMatchItem";
import { ItemType } from "../../../../inputs/Search/Search";
import PillsAllergies from "./PillsAllergies";

const styles = makeStyles((theme) =>
  createStyles({
    centralPanel: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    rightPanel: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing(2),
    },
    leftPanel: {
      display: "flex",
      flexDirection: "column",
      paddingRight: theme.spacing(2),
    },
    buttonPanel: {
      justifyContent: "flex-end",
      display: "flex",
      paddingRight: "20px",
    },
    saveButton: {
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
    pillAllergiesTitle: {
      marginBlock: "2px",
      fontSize: "15px",
      paddingLeft: "20px",
    },
    otherAllergiesTitle: {
      paddingBottom: "10px",
      fontSize: "15px",
      fontWeight: "bold",
    },
    checkLabel: {
      justifyContent: "flex-end",
    },
    searcherComponent: {
      paddingLeft: "20px",
    },
    search: {
      margin: "10px",
      width: "200px",
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "row",
    },
    textArea: {
      height: theme.spacing(5),
      overflow: "hidden",
      border: "1px solid gray",
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1),
    },
    radioGroupRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  }),
);

interface Props {
  handleOpenForm: () => void;
  loading: boolean;
  noAllergies: string;
  pillAllergies?: Schemas.CustomerAllergyData[];
  handleNewAllergies: (value: {
    enabled: string;
    medicine: Schemas.CustomerAllergyData[];
    other: string;
  }) => void;
  otherAllergies: string[];
}
export default function AllergiesForm({
  handleOpenForm,
  loading,
  noAllergies,
  pillAllergies = [],
  handleNewAllergies,
  otherAllergies,
}: Props) {
  const classes = styles();
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      enabled: noAllergies,
      medicine: pillAllergies,
      other: (otherAllergies && otherAllergies.join("\n")) || "",
      newMedicine: "",
    },
    onSubmit: () => {
      if (values.enabled === "TRUE") {
        handleNewAllergies(values);
      return;
      }
      handleNewAllergies({
        enabled: values.enabled,
        medicine: [],
        other: "",
      });
    },
  });

  const handleDeleteAllergy = useCallback(
    (code) => {
      if (code) {
        const newAllergies = values.medicine.filter(
          (allergy) => code !== allergy.code,
        );
        setFieldValue("medicine", newAllergies);
      }
    },
    [setFieldValue, values.medicine],
  );

  const handlePickMedicine = useCallback(
    (option: ItemType | string) => {
      if (option) {
        const newPillAllergies = [...values.medicine];
        values.newMedicine && newPillAllergies.push({
          code: (option as ItemType).value || values.newMedicine,
          medicine: (option as ItemType).value || values.newMedicine,
        });
        setFieldValue("medicine", newPillAllergies);
        setFieldValue("newMedicine", "", true);
      }
    },
    [setFieldValue, values.medicine, values.newMedicine],
  );

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      event && setFieldValue("newMedicine", event.target.value, true);
    },
    [setFieldValue],
  );

  const handleDismiss = useCallback(() => {
    handleOpenForm();
    setFieldValue("medicine", pillAllergies);
  }, [handleOpenForm, pillAllergies, setFieldValue]);

  const allergiesDefinition = useMemo(() => {
    if (values.enabled === "TRUE") return "TRUE";
    if (values.enabled === "FALSE") return "FALSE";
    return "UNDEFINED";
  }, [values.enabled]);

  const onRadioChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === "FALSE") { setFieldValue("enabled", "FALSE", true); return; }
      if (event.target.value === "TRUE") { setFieldValue("enabled", "TRUE", true); return; }
      setFieldValue("enabled", "UNDEFINED", true);
    },
    [setFieldValue],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.centralPanel}>
        <FormControl component="fieldset">
          <RadioGroup
            className={classes.radioGroupRow}
            value={allergiesDefinition}
            onChange={onRadioChecked}>
            <FormControlLabel
              value="TRUE"
              control={<Radio size="small" />}
              label="Refiere alergias"
                />
            <FormControlLabel
              value="FALSE"
              control={<Radio size="small" />}
              label="No refiere alergias"
                />
            <FormControlLabel
              value="UNDEFINED"
              control={<Radio size="small" />}
              label="No definido"
                />
          </RadioGroup>
        </FormControl>
        <div className={classes.leftPanel}>
          <Typography className={classes.pillAllergiesTitle}>
            {STRINGS.allergies.ALLERGIES_TITLE}
          </Typography>
          <Autocomplete
            loading={false}
            options={[]}
            className={classes.search}
            getOptionLabel={
              (option: ItemType) => (option.value ? option.value : "")
            }
            freeSolo
            disabled={values.enabled !== "TRUE"}
            autoComplete={false}
            onChange={handlePickMedicine}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.allergies.FIND_MEDICINE,
              onChange: onDebounceSearch,
            }}
            renderInitialOption={() => (
              <NoOptionMatchItem
                item={{
                  label: values.newMedicine || "",
                  value: values.newMedicine || "",
                }}
              />
            )}
            onDebounce={onDebounceSearch}
          />
          {values.medicine && (
            <PillsAllergies
              pillAllergies={values.enabled === "TRUE" ? values.medicine : []}
              withTrash
              handleDeleteAllergy={handleDeleteAllergy}
            />
          )}
        </div>

        <div className={classes.rightPanel}>
          <div id="text-area-wrapper">
            <Typography className={classes.otherAllergiesTitle}>
              {STRINGS.allergies.OTHER_ALLERGIES}
            </Typography>
            <TextareaAutosize
              className={classes.textArea}
              rowsMax={4}
              name="other"
              value={values.enabled === "TRUE" ? values.other : ""}
              onChange={handleChange}
              style={defaultStyleTextArea}
              disabled={values.enabled !== "TRUE"}
            />
          </div>
        </div>
      </div>
      <div id="buttons-panels" className={classes.buttonPanel}>
        <PrimaryButton
          label={STRINGS.allergies.CANCEL}
          variant="text"
          color="primary"
          disabled={loading}
          onClick={handleDismiss}
        />
        <PrimaryButton
          className={classes.saveButton}
          label={STRINGS.allergies.SAVE}
          type="submit"
          variant="text"
          color="primary"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );
}
