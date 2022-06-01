import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";

const useStyles = makeStyles(() =>
  createStyles({
    actionContainer: {
      display: "flex",
    },
  }),
);

interface Props {
  onPrintPdf: (requestCode?: string) => void;
  handleCellAction: (requestCode?: string) => void;
  onTimeBackAction?: () => void;
  onSendEmail: (requestCode?: string) => void;
  handleClose: () => void;
  procedureId?: string;
  loadingSendEmail?: boolean;
  loadingPrintPdf?: boolean;
  loadingCellAction?: boolean;
}

const ActionProcedureResume = ({
  handleCellAction,
  onSendEmail,
  onPrintPdf,
  onTimeBackAction = () => {},
  handleClose,
  procedureId,
  loadingSendEmail,
  loadingPrintPdf,
  loadingCellAction,
}: Props) => {
  const classes = useStyles();

  const handleSendEmail = useCallback(() => {
    onSendEmail(procedureId);
  }, [onSendEmail, procedureId]);

  const handleSendByCell = useCallback(() => {
    handleCellAction(procedureId);
  }, [handleCellAction, procedureId]);

  const handlePrint = useCallback(() => {
    onPrintPdf(procedureId);
  }, [onPrintPdf, procedureId]);

  const handleShowHistory = useCallback(() => {
    onTimeBackAction();
  }, [onTimeBackAction]);

  return (
    <div className={classes.actionContainer}>
      <BadgedButton
        onClick={handleSendEmail}
        iconName="mail"
        loading={loadingSendEmail}
        toolTip={STRINGS.generals.SENT_BY_MAIL}
        iconWidth={15}
        iconHeight={15}
      />
      <BadgedButton
        onClick={handleSendByCell}
        iconName="cell"
        fill="#5edae6" // todo add the color to theme palette
        loading={loadingCellAction}
        toolTip={STRINGS.generals.SEND_BY_CUSTOMER_CELL}
        iconWidth={15}
        iconHeight={15}
      />
      <BadgedButton
        onClick={handlePrint}
        iconName="print"
        loading={loadingPrintPdf}
        toolTip={STRINGS.generals.PRINT}
        iconWidth={15}
        iconHeight={15}
      />
      <BadgedButton
        onClick={handleShowHistory}
        iconName="timeBack"
        toolTip={STRINGS.generals.HISTORICAL}
        iconWidth={15}
        iconHeight={15}
      />
      <BadgedButton
        iconName="closeIcon"
        onClick={handleClose}
        iconWidth={15}
        iconHeight={15}
      />
    </div>
  );
};

export default ActionProcedureResume;
