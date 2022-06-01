import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import BadgedButton from "../../../../../buttons/BadgedButton";

const styles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: "50%",
    maxHeight: "70%",
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  action: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

interface Props {
  title: string;
  open?: boolean;
  handleShow: () => void;
}

export default function PanelItemModal({
  title,
  handleShow,
  open = false,
  children,
}: Props & DialogProps) {
  const classes = styles();
  return (
    <Dialog
      hideBackdrop // Disable the backdrop color/image
      disableEnforceFocus // Let the user focus on elements outside the dialog
      disableBackdropClick // Remove the backdrop click (just to be sure)
      classes={{ paper: classes.root }}
      onClose={handleShow}
      aria-labelledby="lab_option_dialog"
      open={open}>
      <DialogTitle id="lab_option_dialog">
        <div className={classes.titleContainer}>
          <Typography className={classes.titleStyle}>{title}</Typography>
          <div className={classes.action}>
            <BadgedButton
              onClick={handleShow}
              iconName="closeIcon"
              iconWidth={15}
              iconHeight={15}
            />
          </div>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
