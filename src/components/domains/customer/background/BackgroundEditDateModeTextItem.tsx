import {
  makeStyles,
  TextareaAutosize,
  TextField,
  Theme,
} from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import DatePicker from "../../../inputs/DatePicker";

const styles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(2),
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  leftColumn: {
    display: "flex",
    marginRight: theme.spacing(2),
  },
  selector: {
    height: theme.spacing(5),
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "white",
    minWidth: "100px",
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
  selectorFieldName: string;
  inputFieldNotes: string;
  inputFieldName: string;
  inputPlaceHolder: string;
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  dateTime?: Schemas.DateTimeObject;
  enabled: boolean;
}
const styleTextArea = { height: 45, width: 200 };

export default function BackgroundEditDateModeTextItem({
  index,
  selectorFieldName,
  inputFieldNotes,
  inputFieldName,
  inputPlaceHolder,
  setFieldValue,
  handleRemove,
  dateTime,
  enabled,
}: Props) {
  const classes = styles();
  const handlePicked = (date?: Date) => {
    if (!date) return;
    setFieldValue(`${selectorFieldName}`, {
      dateDay: date.getDate(),
      dateMonth: date.getMonth() + 1,
      dateYear: date.getFullYear(),
    } as Schemas.DateTimeObject);
  };

  const onRemove = useCallback(() => {
    handleRemove(index);
  }, [handleRemove, index]);

  return (
    <div className={classes.content}>
      <div className={classes.leftColumn}>
        <BadgedButton onClick={onRemove} iconName="delete" />
        <div className={classes.inputContainer}>
          <div className={classes.input}>
            <Field name={inputFieldName}>
              {({ field }: FieldProps) => (
                <TextField
                  placeholder={STRINGS.background.SURGICAL}
                  variant="outlined"
                  margin="dense"
                  {...field}
                />
              )}
            </Field>
          </div>
          <DatePicker
            disabled={enabled}
            date={
              dateTime &&
              dateTime.dateYear &&
              dateTime.dateMonth &&
              dateTime.dateDay
                ? new Date(
                    dateTime.dateYear,
                    dateTime.dateMonth - 1,
                    dateTime.dateDay,
                  )
                : new Date()
            }
            handleDateChange={handlePicked}
          />
        </div>
      </div>
      <Field name={inputFieldNotes}>
        {({ field }: FieldProps) => (
          <TextareaAutosize
            disabled={enabled}
            className={classes.textArea}
            style={styleTextArea}
            rowsMax={4}
            placeholder={inputPlaceHolder}
            {...field}
          />
        )}
      </Field>
    </div>
  );
}
