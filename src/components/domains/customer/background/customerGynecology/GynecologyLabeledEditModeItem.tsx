import { makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React from "react";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  label: {
    border: "1px solid lightgray",
    padding: "6.1px 8px",
    marginRight: "10px",
    marginTop: "4px",
    borderRadius: "3px",
  },
}));

interface Props {
  label: string;
  placeHolder: string;
  inputFieldName: string;
  inputType?: string;
}

export default function GynecologyLabeledEditModeItem({
  label,
  inputFieldName,
  placeHolder,
  inputType = "text",
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.label}>
        <Typography>{label}</Typography>
      </div>
      <Field name={`${inputFieldName}`}>
        {({ field }: FieldProps) => (
          <TextField
            placeholder={placeHolder}
            label={placeHolder}
            variant="outlined"
            margin="dense"
            type={inputType}
            {...field}
          />
        )}
      </Field>
    </div>
  );
}
