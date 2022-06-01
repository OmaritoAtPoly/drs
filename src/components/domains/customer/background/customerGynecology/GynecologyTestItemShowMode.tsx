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
  test: Schemas.DateTestsData;
}

export default function GynecologyTestItemShowMode({ test }: Props) {
  const textDate = useMemo(
    () =>
      `${test.date?.dateDay}/${test.date?.dateMonth}/${test.date?.dateYear}`,
    [test.date?.dateDay, test.date?.dateMonth, test.date?.dateYear],
  );
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title}>{test.name}</Typography>
      <Typography className={classes.date}>{textDate}</Typography>
      <Typography className={classes.description}>
        {test.description}
      </Typography>
    </div>
  );
}
