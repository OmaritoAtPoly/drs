/* eslint-disable no-nested-ternary */
import React from "react";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CheckBox from "../../../CheckBox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      border: 0,
      alignItems: "center",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    space: {
      marginTop: theme.spacing(2),
    },
    title: {
      fontSize: "15px",
      lineHeight: "20px",
      color: " #323232",
      width: "100%",
    },
    checkBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: 20,
      height: 20,
    },
  }),
);
type ItemsVaccination = {
  code: string;
  name: string;
  enabled: boolean;
};

interface Props {
  onClick: () => void;
  item: ItemsVaccination;
}

const ItemData = ({ onClick, item }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.cont}>
      <Typography className={classes.title}>{item.name}</Typography>
      <CheckBox
        checked={item.enabled}
        onClick={onClick}
        className={classes.checkBox}
      />
    </div>
  );
};

export default ItemData;
