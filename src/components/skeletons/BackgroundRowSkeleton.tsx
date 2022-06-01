import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import BackgroundItemSkeleton from "./BackgroundItemSkeleton";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      marginTop: theme.spacing(1),
    },
  }),
);

export default function BackgroundRowSkeleton() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <BackgroundItemSkeleton />
      <BackgroundItemSkeleton />
      <BackgroundItemSkeleton />
    </div>
  );
}
