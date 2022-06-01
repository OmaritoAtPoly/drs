import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import BackgroundRowSkeleton from "./BackgroundRowSkeleton";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(1),
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(1),
    },
    item: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
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

export default function GynecologySkeleton() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.item}>
          <Skeleton variant="rect" width={100} height={40} />
        </div>
        <div className={classes.item}>
          <Skeleton variant="rect" width={100} height={40} />
        </div>
        <div className={classes.item}>
          <Skeleton variant="rect" width={100} height={40} />
        </div>
        <div className={classes.item}>
          <Skeleton variant="rect" width={100} height={40} />
        </div>
      </div>
      <BackgroundRowSkeleton />
    </div>
  );
}
