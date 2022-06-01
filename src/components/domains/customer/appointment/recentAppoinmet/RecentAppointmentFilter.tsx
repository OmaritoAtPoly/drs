import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { fullFormatWithOptionalToday } from "../../../../../utils/date";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import Icon from "../../../../Icon/Icon";
import DatePicker from "../../../../inputs/DatePicker";

// eslint-disable-next-line @typescript-eslint/no-shadow
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      width: "100%",
    },
    searchContainer: {
      alignItems: "center",
      display: "flex",
      paddingLeft: 20,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    inputDate: {
      minWidth: 237,
      marginLeft: 10,
    },
    labelDate: {
      textAlign: "center",
    },
    todayButton: {
      boxShadow: "none",
    },
  }),
);
interface Props {
  today: Date;
  handleRestDay: () => void;
  handleAddDay: () => void;
  handleToday: () => void;
}

const RecentAppointmentFilter = ({
  today,
  handleRestDay,
  handleAddDay,
  handleToday,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <div className={classes.row}>
          <BadgedButton
            iconWidth={17}
            iconHeight={17}
            iconName="today"
            toolTip={STRINGS.appointment.TODAY}
            onClick={handleToday}
            containerStyle={classes.todayButton}
          />
          <IconButton onClick={handleRestDay}>
            <Icon height={17} width={15} name="arrowBack" />
          </IconButton>
          <div id="calendar-home-id">
            <DatePicker
              date={today}
              keyboardIcon={<></>}
              InputProps={{
                disableUnderline: true,
                readOnly: true,
                className: classes.inputDate,
                classes: { input: classes.labelDate },
                value: moment(today).format(fullFormatWithOptionalToday(false)),
              }}
            />
          </div>
          <IconButton onClick={handleAddDay}>
            <Icon height={17} width={15} name="arrow" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default RecentAppointmentFilter;
