import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(1),
    },
  }),
);

interface Props {
  children: JSX.Element;
}

export default function RowSkeleton({ children }: Props) {
  const classes = styles();
  return <div className={classes.container}>{children}</div>;
}
