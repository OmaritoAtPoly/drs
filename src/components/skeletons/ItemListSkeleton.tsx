import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  }),
);

export default function ItemListSkeleton() {
  const classes = styles();
  return <Skeleton className={classes.container} variant="rect" height={100} />;
}
