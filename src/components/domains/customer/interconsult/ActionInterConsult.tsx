import React from "react";
import { makeStyles } from "@material-ui/core";
import BadgedButton from "../../../buttons/BadgedButton";

const useStyles = makeStyles({
  actionContainer: {
    display: "flex",
    marginLeft: 10,
    alignItems: "center",
  },
});
interface Props {
  handleHistoricalActionClicked: () => void;
  handleClose: () => void;
  historyToolTipLabel?: string;
  closeToolTipLabel?: string;
}

const ActionInterConsult = ({
  handleHistoricalActionClicked,
  handleClose,
  historyToolTipLabel = "",
  closeToolTipLabel = "",
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.actionContainer}>
      <BadgedButton
        onClick={handleHistoricalActionClicked}
        iconName="timeBack"
        iconWidth={15}
        iconHeight={15}
        toolTip={historyToolTipLabel}
      />
      <BadgedButton
        onClick={handleClose}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
        toolTip={closeToolTipLabel}
      />
    </div>
  );
};
export default ActionInterConsult;
