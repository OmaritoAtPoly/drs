import { makeStyles, Theme, Typography } from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React from "react";
import DatePicker from "../../../../inputs/DatePicker";

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
  input: {
    width: "232px",
  },
}));

interface Props {
  label: string;
  inputFieldName: string;
}

export default function GynecologyDateLabeledEditModeItem({
  label,
  inputFieldName,
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.label}>
        <Typography>{label}</Typography>
      </div>
      <div className={classes.input}>
        <Field name={inputFieldName}>
          {({ field, form: { setFieldValue } }: FieldProps) => {
            const handleChange = (date?: Date) => {
              date &&
                setFieldValue(inputFieldName, {
                  dateDay: date.getDate(),
                  dateMonth: date.getMonth() + 1,
                  dateYear: date.getFullYear(),
                });
            };
            return (
              <DatePicker
                autoOk
                animateYearScrolling
                inputVariant="outlined"
                margin="dense"
                variant="inline"
                date={
                  field.value.dateDay &&
                  field.value.dateMonth &&
                  field.value.dateYear &&
                  new Date(
                    field.value.dateYear,
                    field.value.dateMonth - 1,
                    field.value.dateDay,
                  )
                }
                handleDateChange={handleChange}
              />
            );
          }}
        </Field>
      </div>
    </div>
  );
}
