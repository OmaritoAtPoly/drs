import { makeStyles } from "@material-ui/core";
import React from "react";
import BadgedButton from "../../../../buttons/BadgedButton";

const useStyles = makeStyles({
  actionContainer: {
    display: "flex",
    marginLeft: 10,
    alignItems: "center",
  },
});
interface Props {
  handleHistoryPrescriptions: () => void;
  handleClose: () => void;
  historyToolTipLabel: string;
}

const ActionPanelRecipe = ({
  handleHistoryPrescriptions,
  handleClose,
  historyToolTipLabel,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.actionContainer}>
      <BadgedButton
        onClick={handleHistoryPrescriptions}
        iconName="timeBack"
        iconWidth={15}
        iconHeight={15}
        toolTip={historyToolTipLabel}
      />
      {/* TODO:// This is temporaly deseable */}
      <BadgedButton
        onClick={handleClose}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
      />
    </div>
  );
};
export default ActionPanelRecipe;
