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
    minWidth: "410px",
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
}));

interface Props {
  label: string;
  placeHolder: string;
  inputFieldName: string;
  checkedValue: string;
  onChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContraceptiveItemEditMode({
  label,
  inputFieldName,
  placeHolder,
  checkedValue,
  onChecked,
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
            aria-label="contraceptive_type"
            name="contraceptive"
            value={checkedValue}
            onChange={onChecked}>
            <FormControlLabel
              value="Ningún Método"
              control={<Radio />}
              label="Ningún Método"
            />
            <FormControlLabel
              value="Anticonceptivos orales"
              control={<Radio />}
              label="Anticonceptivos orales"
            />
            <FormControlLabel
              value="Dispositivo intrauterino"
              control={<Radio />}
              label="Dispositivo intrauterino"
            />
            <FormControlLabel
              value="Preservativo"
              control={<Radio />}
              label="Preservativo"
            />
            <FormControlLabel
              value="Calendario hormonal"
              control={<Radio />}
              label="Calendario hormonal"
            />
            <FormControlLabel
              value="Implante hormonal"
              control={<Radio />}
              label="Implante hormonal"
            />
            <FormControlLabel value="other" control={<Radio />} label="Otro" />
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
