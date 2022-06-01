import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      marginTop: theme.spacing(1),
    },
    col: {
      margin: theme.spacing(1),
      width: "20%",
    },
    item: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(0.5),
    },
    subtitle: {
      marginBottom: theme.spacing(0.25),
    },
  }),
);

export default function VaccinationSkeleton() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.col}>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
      </div>
      <div className={classes.col}>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
      </div>
      <div className={classes.col}>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
        <div className={classes.item}>
          <Skeleton className={classes.title} variant="text" height={20} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
          <Skeleton className={classes.subtitle} variant="text" height={10} />
        </div>
      </div>
    </div>
  );
}
