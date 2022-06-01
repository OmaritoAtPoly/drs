import { makeStyles } from "@material-ui/core";
import React from "react";
import SurgicalShowModeItem from "./SurgicalShowModeItem";

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: theme.spacing(29),
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  surgicalItems: Schemas.CustomerSurgicalItem[];
}

export default function CustomerSurgicalBackgroundList({
  surgicalItems,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.content}>
      {surgicalItems.map((surgicalItem: Schemas.CustomerSurgicalItem) => (
        <div className={classes.item}>
          <SurgicalShowModeItem surgical={surgicalItem} />
        </div>
      ))}
    </div>
  );
}
