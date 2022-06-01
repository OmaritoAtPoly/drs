import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: "16px",
    fontWeight: "bold",
  },
}));

interface Props {
  value: string;
}

export default function NoItemToShow({ value }: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>
        {`${STRINGS.generals.ADD_SOMETHING} ${value}`}
      </Typography>
    </div>
  );
}
