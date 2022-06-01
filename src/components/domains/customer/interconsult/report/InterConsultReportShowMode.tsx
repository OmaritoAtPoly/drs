import React from "react";
import STRINGS from "../../../../../utils/strings";
import LabeledDialog from "../../../../dialogs/LabeledDialog";
import InterConsultActionPanel from "../InterConsultActionPanel";
import InterConsultReportShowModePanel from "./InterConsultReportShowModePanel";

interface Props {
  open: boolean;
  interConsult: Schemas.InterConsultationResp;
  handleShow: () => void;
  handleCellClicked?: () => void;
  handleMailClicked?: () => void;
  handlePrintClicked?: () => void;
  loadingCellClicked?: boolean;
  loadingMailClicked?: boolean;
  loadingPrintClicked?: boolean;
  fromNotReceived?: boolean;
}

export default function InterConsultReportShowMode({
  open,
  interConsult,
  handleShow,
  handleCellClicked,
  handleMailClicked,
  handlePrintClicked,
  loadingCellClicked,
  loadingMailClicked,
  loadingPrintClicked,
  fromNotReceived,
}: Props) {
  return (
    <LabeledDialog
      label={STRINGS.interconsult.ABSTRACT}
      open={open}
      handleShow={handleShow}
      actionPanel={
        <InterConsultActionPanel
          handleHistoryClicked={handleShow}
          handleCellClicked={handleCellClicked}
          handleMailClicked={handleMailClicked}
          handlePrintClicked={handlePrintClicked}
          loadingCellClicked={loadingCellClicked}
          loadingMailClicked={loadingMailClicked}
          loadingPrintClicked={loadingPrintClicked}
          fromNotReceived={fromNotReceived}
          reportMode
          handleClose={handleShow}
        />
      }>
      <InterConsultReportShowModePanel
        currentInterConsult={interConsult}
        handleShow={handleShow}
      />
    </LabeledDialog>
  );
}
