import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import BackgroundItemSkeleton from "./BackgroundItemSkeleton";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      marginTop: theme.spacing(1),
    },
    content: {
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
      width: "20%",
    },
    title: {
      marginBottom: theme.spacing(0.5),
    },
    subtitle: {
      marginBottom: theme.spacing(0.25),
    },
  }),
);

export default function NutritionSkeleton() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Skeleton className={classes.title} variant="text" height={50} />
        <Skeleton className={classes.subtitle} variant="text" height={15} />
        <Skeleton className={classes.subtitle} variant="text" height={15} />
        <Skeleton
          className={classes.subtitle}
          variant="text"
          height={10}
          width={150}
        />
        <Skeleton className={classes.subtitle} variant="text" height={15} />
        <Skeleton
          className={classes.subtitle}
          variant="text"
          height={10}
          width={100}
        />
      </div>
      <div className={classes.content}>
        <Skeleton className={classes.title} variant="text" height={40} />
        <Skeleton
          className={classes.subtitle}
          variant="text"
          height={10}
          width={150}
        />
        <Skeleton className={classes.subtitle} variant="text" height={15} />
        <Skeleton
          className={classes.subtitle}
          variant="text"
          height={10}
          width={100}
        />
      </div>
      <BackgroundItemSkeleton />
      <BackgroundItemSkeleton />
      <BackgroundItemSkeleton />
    </div>
  );
}
