import { makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../styles/theme";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  certificateId?: string;
  loadingSendingByEmail?: boolean;
  loadingSendByCell?: boolean;
  loadingPrint?: boolean;
  handlePatientCellClicked?: (certificateId: string) => void;
  handleMailClicked?: (certificateId: string) => void;
  handlePrint?: (code: string) => void;
  onHistoryClicked: () => void;
  handleClose?: () => void;
}

const useStyles = makeStyles({
  popperStyle: {
    // todo Add these color to pallette
    color: "#828282",
    backgroundColor: "#d6e3f3",
    width: theme.spacing(8),
    textAlign: "center",
  },
  button: {
    margin: 4,
  },
  classNameWrapper: {
    margin: 0,
  },
  actionContainer: {
    display: "flex",
    marginLeft: 25,
    alignItems: "center",
  },
});

const ActionCertificatesResume = ({
  handleClose,
  handlePrint,
  certificateId,
  loadingSendingByEmail = false,
  loadingPrint = false,
  loadingSendByCell = false,
  handlePatientCellClicked,
  handleMailClicked,
  onHistoryClicked,
}: Props) => {
  const classes = useStyles();

  const handlePatientOnCellClicked = useCallback(() => {
    handlePatientCellClicked && handlePatientCellClicked(certificateId || "");
  }, [certificateId, handlePatientCellClicked]);
  const handleOnMailClicked = useCallback(() => {
    handleMailClicked && handleMailClicked(certificateId || "");
  }, [certificateId, handleMailClicked]);
  const handlePrintCallBack = useCallback(() => {
    handlePrint && handlePrint(certificateId || "");
  }, [certificateId, handlePrint]);
  return (
    <div className={classes.actionContainer}>
      {handlePatientCellClicked && (
        <BadgedButton
          iconName="cellLogo"
          onClick={handlePatientOnCellClicked}
          iconWidth={15}
          iconHeight={15}
          loading={loadingSendByCell}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {handleMailClicked && (
        <BadgedButton
          iconName="mail"
          onClick={handleOnMailClicked}
          iconWidth={15}
          iconHeight={15}
          loading={loadingSendingByEmail}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {handlePrint && (
        <BadgedButton
          iconName="print"
          onClick={handlePrintCallBack}
          iconWidth={15}
          iconHeight={15}
          loading={loadingPrint}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      )}
      {onHistoryClicked && (
        <BadgedButton
          onClick={onHistoryClicked}
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

export default ActionCertificatesResume;
