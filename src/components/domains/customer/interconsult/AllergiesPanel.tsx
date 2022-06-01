import {
  createStyles,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import { referAllergyText } from "../../../../utils/user";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../inputs/Search/NoOptionMatchItem";
import { ItemType } from "../../../inputs/Search/Search";
import NotReferPanel from "../background/NotReferPanel";
import AllergiesPillsPanel from "./AllergiesPillsPanel";

const styles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    rightPanel: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
    leftPanel: {
      display: "flex",
      alignItems: "flex-start",
      flex: 1,
      flexDirection: "column",
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
    buttonPanel: {
      justifyContent: "flex-end",
      display: "flex",
    },
    pillAllergiesTitle: {
      fontSize: "15px",
    },
    otherAllergiesTitle: {
      paddingBottom: "10px",
      fontSize: "15px",
    },
    checkLabel: {
      alignSelf: "flex-start",
      fontSize: "12px",
      fontWeight: "bold",
    },
    searcherComponent: {
      width: "100%",
    },
    noAllergiesLabel: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: theme.palette.primary.main,
      marginRight: "30px",
    },
    search: {
      width: 300,
    },
    radioGroupRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  }),
);

const textAreaStyle = {
  height: "100px",
};

interface Props {
  allergies: string[];
  otherAllergies: string;
  disable: string;
  handleAddNewPill: (pill: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDeleteAllergy: (pill: string, index: number) => void;
  onNoReferCheck: () => void;
  newMedicineAllergy: string;
  setFieldValue: (
    field: string,
    value: string | boolean | undefined,
    shouldValidate?: boolean,
  ) => void;
}

export default function AllergiesPanel({
  allergies,
  otherAllergies,
  disable,
  handleAddNewPill,
  handleDeleteAllergy,
  onNoReferCheck,
  handleChange,
  newMedicineAllergy,
  setFieldValue,
}: Props) {
  const classes = styles();
  const { currentPatient } = usePatientCacheSelector({});

  const handleAddName = useCallback(() => {
    newMedicineAllergy && handleAddNewPill(newMedicineAllergy);
    setFieldValue("newMedicineAllergy", "", true);
  }, [handleAddNewPill, newMedicineAllergy, setFieldValue]);

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      event && setFieldValue("newMedicineAllergy", event.target.value, true);
    },
    [setFieldValue],
  );

  const allergiesDefinition = useMemo(() => {
    if (disable === "TRUE") return "TRUE";
    if (disable === "FALSE") return "FALSE";
    return "UNDEFINED";
  }, [disable]);

  const onRadioChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === "FALSE") { setFieldValue("hasAllergies", "FALSE", true); return; }
      if (event.target.value === "TRUE") { setFieldValue("hasAllergies", "TRUE", true); return; }
      setFieldValue("hasAllergies", "UNDEFINED", true);
      onNoReferCheck();
    },
    [setFieldValue, onNoReferCheck],
  );

  return (
    <div className={classes.container}>
      <div className={classes.leftPanel}>
        <Typography className={classes.pillAllergiesTitle}>
          {STRINGS.allergies.ALLERGIES_TITLE}
        </Typography>
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
        <Autocomplete
          loading={false}
          options={allergies}
          className={classes.search}
          getOptionLabel={(option: ItemType) => (option.value ? option.value : "")}
          freeSolo
          autoComplete={false}
          onChange={handleAddName}
          inputProps={{
            autoComplete: "off",
            placeholder: STRINGS.allergies.FIND_MEDICINE,
            onChange: onDebounceSearch,
          }}
          renderInitialOption={() => (
            <NoOptionMatchItem
              item={{
                label: newMedicineAllergy || "",
                value: newMedicineAllergy || "",
              }}
            />
          )}
          disabled={disable !== "TRUE"}
          onDebounce={onDebounceSearch}
        />
        <AllergiesPillsPanel
          pillAllergies={disable === "TRUE" ? allergies : []}
          handleDeleteAllergy={handleDeleteAllergy}
        />
        {disable === "FALSE" && <NotReferPanel label={referAllergyText(currentPatient)} />}
      </div>
      <div className={classes.rightPanel}>
        <Typography className={classes.otherAllergiesTitle}>
          {STRINGS.allergies.OTHER_ALLERGIES}
        </Typography>
        <TextareaAutosize
          name="other"
          value={disable === "TRUE" ? otherAllergies : ""}
          onChange={handleChange}
          style={textAreaStyle}
          disabled={disable !== "TRUE"}
        />
      </div>
    </div>
  );
}
