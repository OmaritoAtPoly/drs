/* eslint-disable react/jsx-curly-newline */
import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";
import { ValueAndLabelType } from "../../../../utils/types";
import { requestType } from "../../../../utils/utils";
import DatePicker from "../../../inputs/DatePicker";
import Autocomplete from "../../../inputs/Search/Autocomplete";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    padding: theme.spacing(1),
  },
  searchContainer: {
    width: "30%",
    marginRight: theme.spacing(2),
  },
  datePickerContainer: {
    width: "20%",
    marginRight: theme.spacing(2),
  },
  col: {
    display: "flex",
    flex: 1,
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
  },
  date: {
    marginTop: 10,
  },
}));

interface Props {
  handleFromDate: (date?: Date) => void;
  handleToDate: (date?: Date) => void;
  handleRequestType: (value: ValueAndLabelType) => void;
  from: Date;
  to: Date;
}

export default function FilterPanel({
  handleFromDate,
  handleToDate,
  handleRequestType,
  from,
  to,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <Autocomplete
          options={requestType}
          getOptionLabel={
            (option: ValueAndLabelType) => option.label || ""
            // eslint-disable-next-line react/jsx-curly-newline
          }
          autoComplete={false}
          onChange={handleRequestType}
          inputProps={{
            autoComplete: "off",
            placeholder: STRINGS.request.REQUEST_TYPE,
          }}
        />
      </div>
      <div className={classes.datePickerContainer}>
        <div className={classes.date}>
          <DatePicker
            placeholder="Desde"
            date={from}
            handleDateChange={handleFromDate}
            variant="inline"
          />
        </div>
      </div>
      <div className={classes.datePickerContainer}>
        <div className={classes.date}>
          <DatePicker
            placeholder="Hasta"
            date={to}
            handleDateChange={handleToDate}
            variant="inline"
          />
        </div>
      </div>
    </div>
  );
}
