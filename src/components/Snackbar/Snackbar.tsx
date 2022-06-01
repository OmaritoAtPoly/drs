import { createStyles, makeStyles, Theme } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import { getMessage } from "../../modules/utils/error/handleError";
import TreatedError from "../../modules/utils/error/TreatedError";

interface Props {
  alerts: (string | Error | TreatedError)[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    muiAlert: {
      minWidth: 200,
      [theme.breakpoints.up("md")]: {
        minWidth: 500,
      },
    },
  }),
);

const Snackbar = ({ alerts }: Props) => {
  const classes = useStyles();
  return (
    <div>
      {alerts.map((alert: string | Error | TreatedError) => (
        <MuiAlert
          className={classes.muiAlert}
          elevation={6}
          variant="filled"
          severity={(alert as TreatedError).severity || "error"}>
          {getMessage(alert)}
        </MuiAlert>
      ))}
    </div>
  );
};

export default Snackbar;
