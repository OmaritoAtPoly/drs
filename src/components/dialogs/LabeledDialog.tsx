import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../styles/theme";
import STRINGS from "../../utils/strings";
import ActionPanel from "./ActionPanel";

export type DialogSelectionOptionType = {
  label: string;
  value: string;
};

const useStyles = makeStyles({
  root: {
    minWidth: "95%",
    position: "absolute",
    top: "35px",
    left: "30px",
    bottom: "-30px",
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
  },
  dividerStyle: {
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    height: "1px",
    width: "95%",
    alignSelf: "center",
  },
  content: {
    paddingLeft: "20px",
  },
  diagnosisTitleStyle: {
    paddingBlock: "15px",
  },
  cardLayoutStyle: {
    display: "flex",
    flexDirection: "column",
  },
  selector: {
    color: theme.palette.primary.main,
  },
});

interface Props {
  label: string;
  handleShow: () => void;
  onHistoryClicked?: () => void;
  actionPanel?: JSX.Element;
  rootClassName?: string;
  contentClassName?: string;
  titleStyle?: string;
}

const LabeledDialog = ({
  label,
  children,
  open,
  actionPanel = undefined,
  handleShow,
  onHistoryClicked,
  rootClassName,
  contentClassName,
  titleStyle = "",
}: Props & DialogProps) => {
  const classes = useStyles();
  return (
    <Dialog
      hideBackdrop // Disable the backdrop color/image
      disableEnforceFocus // Let the user focus on elements outside the dialog
      disableBackdropClick // Remove the backdrop click (just to be sure)
      classes={{ paper: rootClassName || classes.root }}
      onClose={handleShow}
      aria-labelledby="labelled-dialog"
      open={open}>
      <DialogTitle id="labelled-dialog">
        <div className={classes.titleContainer}>
          <div className={classes.titleStyle}>
            <Typography variant="h5" className={`${titleStyle}`}>
              {label}
            </Typography>
          </div>
          {actionPanel || (
            <ActionPanel
              onHistoryClicked={onHistoryClicked}
              historyToolTipLabel={STRINGS.generals.HISTORY}
            />
          )}
        </div>
      </DialogTitle>
      <Divider id="divider-section" className={classes.dividerStyle} />
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  );
};

export default LabeledDialog;
