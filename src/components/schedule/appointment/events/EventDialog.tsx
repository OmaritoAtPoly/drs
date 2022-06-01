import {
  Dialog,
  DialogContent,
  DialogProps,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    minWidth: "60%",
    position: "absolute",
    top: "35px",
    bottom: "-30px",
  },
  content: {
    padding: 0,
    marginTop: "-20px",
  },
});

interface Props {
  open: boolean;
  rootClassName?: string;
  contentClassName?: string;
  handleShow: () => void;
}

export default function EventDialog({
  open,
  rootClassName,
  contentClassName,
  children,
  handleShow,
}: Props & DialogProps) {
  const classes = useStyles();
  return (
    <Dialog
      hideBackdrop // Disable the backdrop color/image
      disableEnforceFocus // Let the user focus on elements outside the dialog
      disableBackdropClick // Remove the backdrop click (just to be sure)
      classes={{ paper: rootClassName || classes.container }}
      onClose={handleShow}
      aria-labelledby="basic-dialog"
      open={open}>
      <DialogContent className={`${classes.content} ${contentClassName}`}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
