import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import Icon from "../../Icon/Icon";
// eslint-disable-next-line import/no-cycle
import { ItemType } from "./Search";

const styles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface Props {
  item: ItemType;
  onClick?: () => void;
}

export default function NoOptionMatchItem({ item, onClick }: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Button
        variant="text"
        color="primary"
        onClick={onClick}
        startIcon={<Icon name="add" />}>
        {`Agregar manualmente ${item.label}`}
      </Button>
    </div>
  );
}
