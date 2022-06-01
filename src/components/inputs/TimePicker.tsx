import DateFnsUtils from "@date-io/date-fns";
import { createStyles, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    full: {
      width: "100%",
    },
  }),
);

interface Props {
  date?: Date;
  label?: string;
  handleDateChange: (date?: Date) => void;
}

export default function TimePicker({
  date,
  label,
  handleDateChange,
}: Props & Partial<Omit<KeyboardTimePickerProps, "onChange">>) {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          className={classes.full}
          margin="none"
          id="time-picker"
          label={label || ""}
          value={date}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={handleDateChange as any}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
