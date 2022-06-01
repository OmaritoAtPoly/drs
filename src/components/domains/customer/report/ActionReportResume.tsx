import { makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../styles/theme";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  handlePrintPdf?: (requestCode?: string) => void;
  handleCellAction?: (requestCode?: string) => void;
  handleHistoryClicked?: () => void;
  handleSendEmail?: (requestCode?: string) => void;
  handleClose?: () => void;
  reportId?: string;
  loadingSendEmail?: boolean;
  loadingPrintPdf?: boolean;
  loadingCellAction?: boolean;
}

const useStyles = makeStyles({
  popperStyle: {
    // todo Add these color to pallette
    color: "#828282",
    backgroundColor: "#d6e3f3",
    width: theme.spacing(8),
    textAlign: "center",
  },
  actionContainer: {
    display: "flex",
    marginLeft: 25,
    alignItems: "center",
  },
  button: {
    margin: 4,
  },
  classNameWrapper: {
    margin: 0,
  },
});

const ActionReportResume = ({
  handleCellAction,
  handleSendEmail,
  handlePrintPdf,
  handleHistoryClicked,
  reportId,
  loadingSendEmail,
  loadingPrintPdf,
  loadingCellAction,
  handleClose,
}: Props) => {
  const classes = useStyles();
  const handlePatientCellClicked = useCallback(() => {
    handleCellAction && handleCellAction(reportId);
  }, [handleCellAction, reportId]);
  const handlePatientEmailClicked = useCallback(() => {
    handleSendEmail && handleSendEmail(reportId);
  }, [handleSendEmail, reportId]);
  const handlePatientPrintClicked = useCallback(() => {
    handlePrintPdf && handlePrintPdf(reportId);
  }, [handlePrintPdf, reportId]);

  return (
    <div className={classes.actionContainer}>
      {handleCellAction && (
        <BadgedButton
          iconName="cellLogo"
          onClick={handlePatientCellClicked}
          iconWidth={15}
          iconHeight={15}
          loading={loadingCellAction}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {handleSendEmail && (
        <BadgedButton
          iconName="mail"
          onClick={handlePatientEmailClicked}
          iconWidth={15}
          iconHeight={15}
          loading={loadingSendEmail}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {handlePrintPdf && (
        <BadgedButton
          iconName="print"
          onClick={handlePatientPrintClicked}
          iconWidth={15}
          iconHeight={15}
          loading={loadingPrintPdf}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {handleHistoryClicked && (
        <BadgedButton
          onClick={handleHistoryClicked}
          iconName="timeBack"
          iconWidth={15}
          iconHeight={15}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {handleClose && (
        <BadgedButton
          onClick={handleClose}
          iconName="closeIcon"
          iconWidth={15}
          iconHeight={15}
        />
      )}
    </div>
  );
};

export default ActionReportResume;
