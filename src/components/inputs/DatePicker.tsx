import DateFnsUtils from "@date-io/date-fns";
import { createStyles, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import React from "react";
import { formatDate } from "../../utils/date";

const useStyles = makeStyles(() =>
  createStyles({
    full: {
      width: "100%",
    },
    label: {
      top: 4,
    },
  }),
);

interface Props {
  format?: string;
  date?: Date;
  handleDateChange?: (date?: Date) => void;
  writeable?: boolean;
}

export default function DatePicker({
  date = new Date(),
  handleDateChange = () => {},
  format = formatDate["dd MMM, yyyy"],
  writeable = false,
  ...rest
}: Props & Partial<Omit<KeyboardDatePickerProps, "onChange">>) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          InputLabelProps={{
            className: classes.label,
          }}
          className={classes.full}
          format={format}
          margin="none"
          value={date}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={handleDateChange as any}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          {...rest}
          inputProps={{ readOnly: !writeable }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
