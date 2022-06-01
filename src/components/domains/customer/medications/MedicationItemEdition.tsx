import DateUtils from "@date-io/moment";
import {
  makeStyles,
  TextareaAutosize,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Field, FieldProps } from "formik";
import moment from "moment";
import React from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";

const styles = makeStyles((theme: Theme) => ({
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  itemIndex: {
    backgroundColor: "black",
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    marginRight: theme.spacing(1),
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleLeftSide: {
    display: "flex",
    alignItems: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(1),
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
  index: number;
  fieldName: string;
  medication: Schemas.CustomerMedicationData;
  remove: () => void;
}

export default function MedicationItemEdition({
  index,
  fieldName,
  medication,
  remove,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.itemContainer}>
      <span className={classes.title}>
        <span className={classes.titleLeftSide}>
          <div className={classes.itemIndex} />
          <Typography>{medication.medicine}</Typography>
        </span>
        <BadgedButton onClick={remove} iconName="delete" />
      </span>
      <div className={classes.formGroup}>
        <Field name={`${fieldName}[${index}].diagnoses`}>
          {({ field }: FieldProps) => (
            <TextareaAutosize
              className={classes.textArea}
              rowsMax={4}
              aria-label="diagnosis"
              placeholder="Diagnóstico"
              {...field}
            />
          )}
        </Field>
      </div>
      <div className={classes.formGroup}>
        <MuiPickersUtilsProvider utils={DateUtils}>
          <Field name={`${fieldName}[${index}].fromDate`}>
            {({ field, form: { setFieldValue } }: FieldProps) => {
              const handleOnChange = (
                date: MaterialUiPickersDate,
                value?: string | null | undefined,
              ) => {
                const pickedDate = moment(value, "DD/MM/yyyy");
                setFieldValue(`${fieldName}[${index}].fromDate`, {
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
                  format="DD/MM/yyyy"
                  {...field}
                  value={moment(
                    `${field.value.dateDay}/${field.value.dateMonth}/${field.value.dateYear}`,
                    "DD/MM/yyyy",
                  )}
                  onChange={handleOnChange}
                  label={STRINGS.generals.INITIAL_DATE}
                />
              );
            }}
          </Field>
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.formGroup}>
        <Field name={`${fieldName}[${index}].currentIllness`}>
          {({ field }: FieldProps) => (
            <TextareaAutosize
              className={classes.textArea}
              rowsMax={4}
              aria-label="effects"
              placeholder="Efectos adversos"
              {...field}
            />
          )}
        </Field>
      </div>
    </div>
  );
}
