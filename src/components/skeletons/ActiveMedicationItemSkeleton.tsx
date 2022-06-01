import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(1),
      width: "40%",
    },
    title: {
      marginBottom: theme.spacing(0.5),
    },
    subtitle: {
      marginBottom: theme.spacing(0.25),
    },
  }),
);

export default function ActiveMedicationItemSkeleton() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Skeleton className={classes.title} variant="text" height={25} />
      <Skeleton className={classes.subtitle} variant="text" height={10} />
      <Skeleton
        className={classes.subtitle}
        variant="text"
        height={10}
        width={100}
      />
      <Skeleton className={classes.subtitle} variant="text" height={15} />
    </div>
  );
}
