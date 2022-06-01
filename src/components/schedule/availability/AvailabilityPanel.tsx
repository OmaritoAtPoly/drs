import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));

interface Props {
  index: number;
  value: number;
  children?: React.ReactNode;
}

export default function AvailabilityPanel({
  index,
  value,
  children,
  ...props
}: Props) {
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...props}>
      {value === index && <div className={classes.container}>{children}</div>}
    </div>
  );
}
