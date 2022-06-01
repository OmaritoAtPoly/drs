import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
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

export default function RequestHistoryItemSkeleton() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Skeleton
        className={classes.title}
        variant="text"
        height={40}
        width={100}
      />
      <Skeleton className={classes.subtitle} variant="text" height={15} />
      <Skeleton className={classes.subtitle} variant="text" height={15} />
      <Skeleton className={classes.subtitle} variant="text" height={15} />
      <Skeleton
        className={classes.title}
        variant="text"
        height={40}
        width={200}
      />
    </div>
  );
}
