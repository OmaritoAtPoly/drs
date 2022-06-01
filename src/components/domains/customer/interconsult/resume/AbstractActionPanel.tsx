import { makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../../../../styles/theme";
import BadgedButton from "../../../../buttons/BadgedButton";

// eslint-disable-next-line @typescript-eslint/no-shadow
const styles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
}));

interface Props {
  handleMailClicked?: () => void;
  handleCellClicked?: () => void;
  handlePrintClicked?: () => void;
  handleHistoryClicked?: () => void;
  handleClose?: () => void;
  loadingPrintClicked?: boolean;
  loadingMailClicked?: boolean;
  loadingCellClicked?: boolean;
  fromNotReceived?: boolean;
  reportMode?: boolean;
}

const AbstractActionPanel = ({
  handleMailClicked = undefined,
  handleCellClicked = undefined,
  handlePrintClicked = undefined,
  handleHistoryClicked = undefined,
  handleClose = undefined,
  loadingPrintClicked,
  loadingMailClicked,
  loadingCellClicked,
  fromNotReceived = true,
  reportMode = false,
}: Props) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      {fromNotReceived && (
        <div>
          <BadgedButton
            onClick={handleMailClicked}
            iconName="letter"
            fill={theme.palette.primary.main}
            iconWidth={15}
            iconHeight={15}
            loading={loadingMailClicked}
          />
          <BadgedButton
            onClick={handleCellClicked}
            iconName="doubleCell"
            iconWidth={15}
            iconHeight={15}
            loading={loadingCellClicked}
          />
        </div>
      )}
      {reportMode && (
        <BadgedButton
          onClick={handleMailClicked}
          iconName="letter"
          fill={theme.palette.primary.main}
          iconWidth={15}
          iconHeight={15}
          loading={loadingMailClicked}
        />
      )}
      <BadgedButton
        onClick={handlePrintClicked}
        iconName="print"
        iconWidth={15}
        iconHeight={15}
        loading={loadingPrintClicked}
      />

      <BadgedButton
        onClick={handleHistoryClicked}
        iconName="timeBack"
        iconWidth={15}
        iconHeight={15}
      />
      <BadgedButton
        onClick={handleClose}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
      />
    </div>
  );
};

export default AbstractActionPanel;
