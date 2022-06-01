import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import BackgroundShowModeItem from "../background/BackgroundShowModeItem";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  label: {
    border: "1px solid lightgray",
    padding: "6.1px 8px",
    marginRight: "10px",
    borderRadius: "3px",
  },
  textArea: {
    height: theme.spacing(5),
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  checkBoxContainer: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100px",
  },
  showModeContainer: {
    display: "flex",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  label: string;
  options: string[];
  checkedValue: string;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editMode?: boolean;
}

export default function NutritionCheckItem({
  label,
  checkedValue,
  options,
  onChecked,
  editMode = false,
}: Props) {
  const classes = styles();
  return (
    <div>
      {editMode && (
        <div className={classes.container}>
          <div>
            <div className={classes.label}>
              <Typography>{label}</Typography>
            </div>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options_type"
                value={checkedValue}
                onChange={onChecked}>
                {options.map((option, index) => (
                  <FormControlLabel
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      )}
      {!editMode && checkedValue !== "" && (
        <div className={classes.showModeContainer}>
          <BackgroundShowModeItem
            item={{
              title: label,
              items: [checkedValue],
              itemLabel: "",
            }}
            showBullet={false}
          />
        </div>
      )}
    </div>
  );
}
