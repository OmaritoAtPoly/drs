import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React from "react";
import { defaultStyleTextArea } from "../../../../../../utils/defaultData";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: "450px",
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
}));

interface Props {
  label: string;
  placeHolder: string;
  inputFieldName: string;
  radioValue: string;
  onRadioChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MenstruationItemEditMode({
  label,
  inputFieldName,
  placeHolder,
  radioValue,
  onRadioChecked,
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div>
        <div className={classes.label}>
          <Typography>{label}</Typography>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="menstraution_type"
            name="menstruation"
            value={radioValue}
            onChange={onRadioChecked}>
            <FormControlLabel
              value="Regular"
              control={<Radio />}
              label="Regular"
            />
            <FormControlLabel
              value="Irregular"
              control={<Radio />}
              label="Irregular"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Field name={inputFieldName}>
        {({ field }: FieldProps) => (
          <TextareaAutosize
            className={classes.textArea}
            style={defaultStyleTextArea}
            rowsMax={4}
            placeholder={placeHolder}
            {...field}
          />
        )}
      </Field>
    </div>
  );
}
