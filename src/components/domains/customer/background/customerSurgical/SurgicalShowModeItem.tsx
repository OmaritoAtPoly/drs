import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useMemo } from "react";

const styles = makeStyles((theme: Theme) => ({
  container: {
    width: "232px",
    marginBottom: theme.spacing(2),
  },
  title: { fontWeight: "bold" },
  date: {
    textDecoration: "underline",
  },
  description: {
    textAlign: "justify",
  },
}));

interface Props {
  surgical: Schemas.CustomerSurgicalItem;
}

export default function SurgicalShowModeItem({ surgical }: Props) {
  const textDate = useMemo(
    () =>
      `${surgical.dateTime?.dateDay}/${surgical.dateTime?.dateMonth}/${surgical.dateTime?.dateYear}`,
    [
      surgical.dateTime?.dateDay,
      surgical.dateTime?.dateMonth,
      surgical.dateTime?.dateYear,
    ],
  );
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title}>{surgical.surgical}</Typography>
      <Typography className={classes.date}>{textDate}</Typography>
      <Typography className={classes.description}>{surgical.notes}</Typography>
    </div>
  );
}
