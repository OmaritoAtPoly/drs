import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import Search, { ItemType } from "../../../../inputs/Search/Search";
import ImagesRequestForm from "./ImagesRequestForm";
import TwoButtons from "./TwoButtons";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  searchRequestItems?: ItemType[];
  diagnosisList?: ItemType[];
  requestList?: ItemType[];
}
const useStyles = makeStyles({
  root: {
    minWidth: "80%",
  },
  titleAndSearchStyle: {
    display: "flex",
    flexDirection: "column",
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
});

const ImagesRequestDialog = ({
  open,
  setOpen,
  searchRequestItems = [],
  diagnosisList = [],
  requestList = [],
}: Props) => {
  const handleClose = useCallback(() => setOpen(!open), [open, setOpen]);
  const classes = useStyles();

  return (
    <Dialog
      id="RX_REQUEST"
      hideBackdrop // Disable the backdrop color/image
      disableEnforceFocus // Let the user focus on elements outside the dialog
      disableBackdropClick // Remove the backdrop click (just to be sure)
      classes={{ paper: classes.root }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle id="customized-dialog-title">
        <div className={classes.titleContainer}>
          <div className={classes.titleAndSearchStyle}>
            <Typography className={classes.titleStyle}>
              {STRINGS.buttonGrid.RX_REQUESTS}
            </Typography>
            <Search items={searchRequestItems} />
            {/* // todo Fix search component to add a right icon and change the placeholder  */}
          </div>
          <TwoButtons />
        </div>
      </DialogTitle>
      <Divider id="divider-section" className={classes.dividerStyle} />
      <DialogContent>
        <ImagesRequestForm
          diagnosisList={diagnosisList}
          handleClose={handleClose}
          requestList={requestList}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImagesRequestDialog;
