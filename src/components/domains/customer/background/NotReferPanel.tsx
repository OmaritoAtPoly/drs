import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme: Theme) => ({
  notRefContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#f9f9f9",
  },
  notRefText: {
    fontWeight: "bold",
    fontSize: "16px",
    color: theme.palette.primary.main,
  },
}));

interface Props {
  label: string;
}

export default function NotReferPanel({ label }: Props) {
  const classes = styles();
  return (
    <div className={classes.notRefContainer}>
      <Typography className={classes.notRefText}>{label}</Typography>
    </div>
  );
}
