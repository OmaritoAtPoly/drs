import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {
  onPredefinedPanelClick: () => void;
  onFreePanelClick: () => void;
  handleClose?: () => JSX.Element;
}

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    // borderRadius: theme.spacing(1),
    border: "2px solid #D6E3F3",
  },
}));

export default function PredefinedOrFreePanel({
  onFreePanelClick,
  onPredefinedPanelClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClose,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Button
        color="primary"
        title="Panel Predeterminado"
        onClick={onPredefinedPanelClick}>
        Panel Predeterminado
      </Button>
      <Button color="primary" onClick={onFreePanelClick}>
        Panel libre
      </Button>
    </div>
  );
}
