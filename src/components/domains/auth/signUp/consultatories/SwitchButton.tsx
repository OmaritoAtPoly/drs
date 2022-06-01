import { makeStyles, Switch, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";

interface Props {
  checked?: boolean;
  toggleChecked: () => void;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBlock: "15px",
  },
  fontStyle: {
    textAlign: "justify",
    fontSize: 12,
  },
  textWrapper: { width: "70%" },
});

export default function SwitchButton({ checked = false, toggleChecked }: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Typography className={classes.fontStyle}>
        {STRINGS.signUp.BE_PUBLIC}
        <Typography className={classes.fontStyle}>
          {STRINGS.signUp.YOUR_PROFILE}
        </Typography>
      </Typography>
      <Switch checked={checked} onChange={toggleChecked} color="primary" />
    </div>
  );
}
