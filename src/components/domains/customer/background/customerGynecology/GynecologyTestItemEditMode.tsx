import DateUtils from "@date-io/moment";
import {
  makeStyles,
  TextareaAutosize,
  TextField,
  Theme,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Field, FieldProps } from "formik";
import moment from "moment";
import React, { useCallback } from "react";
import { defaultStyleTextArea } from "../../../../../utils/defaultData";
import BadgedButton from "../../../../buttons/BadgedButton";

const styles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: theme.spacing(1),
  },
  rowItem: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    border: "1px solid lightgray",
    padding: "6.1px 8px",
    borderRadius: "3px",
  },
  textInput: {
    width: "195px",
  },
  textArea: {
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  formGroup: {
    display: "flex",
    width: "195px",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  index: number;
  label: string;
  inputFieldLabel: string;
  inputFieldTextArea: string;
  inputFieldDate: string;
  inputPlaceHolder: string;
  handleRemove: (index: number) => void;
}

export default function GynecologyTestItemEditMode({
  index,
  inputFieldLabel,
  inputFieldTextArea,
  inputFieldDate,
  inputPlaceHolder,
  handleRemove,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = styles();

  const onRemove = useCallback(() => {
    handleRemove(index);
  }, [handleRemove, index]);

  return (
    <div className={classes.content}>
      <div className={classes.column}>
        <div className={classes.rowItem}>
          <BadgedButton onClick={onRemove} iconName="delete" />
          <Field name={inputFieldLabel}>
            {({ field }: FieldProps) => (
              <TextField
                className={classes.textInput}
                placeholder="Antecedente ginecológico"
                label="Antecedente"
                variant="outlined"
                margin="dense"
                {...field}
              />
            )}
          </Field>
        </div>
        <div className={classes.formGroup}>
          <MuiPickersUtilsProvider utils={DateUtils}>
            <Field name={inputFieldDate}>
              {({ field, form: { setFieldValue } }: FieldProps) => {
                const handleOnChange = (
                  date: MaterialUiPickersDate,
                  value?: string | null | undefined,
                ) => {
                  const pickedDate = moment(value, "DD/MM/yyyy");
                  setFieldValue(inputFieldDate, {
                    dateDay: pickedDate.date(),
                    dateMonth: pickedDate.month() + 1,
                    dateYear: pickedDate.year(),
                  });
                };
                return (
                  <KeyboardDatePicker
                    autoOk
                    animateYearScrolling
                    inputVariant="outlined"
                    margin="dense"
                    variant="inline"
                    placeholder="Selecciona la fecha"
                    format="DD/MM/yyyy"
                    {...field}
                    value={moment(
                      `${field.value.dateDay}/${field.value.dateMonth}/${field.value.dateYear}`,
                      "DD/MM/yyyy",
                    )}
                    onChange={handleOnChange}
                  />
                );
              }}
            </Field>
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <Field name={inputFieldTextArea}>
        {({ field }: FieldProps) => (
          <TextareaAutosize
            className={classes.textArea}
            style={defaultStyleTextArea}
            rowsMax={4}
            placeholder={inputPlaceHolder}
            {...field}
          />
        )}
      </Field>
    </div>
  );
}
