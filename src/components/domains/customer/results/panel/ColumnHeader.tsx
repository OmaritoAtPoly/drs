import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    fontWeight: "bold",
  },
  amountContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "#CB0000",
    width: "12px",
    height: "12px",
    padding: theme.spacing(0.25),
  },
  amountText: {
    fontSize: "10px",
    color: "white",
  },
}));

interface Props {
  title: string;
  amount?: number;
}

export default function ColumnHeader({ title, amount = undefined }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title} color="primary">
        {title}
      </Typography>
      {amount && (
        <div className={classes.amountContainer}>
          <Typography className={classes.amountText}>{amount}</Typography>
        </div>
      )}
    </div>
  );
}
