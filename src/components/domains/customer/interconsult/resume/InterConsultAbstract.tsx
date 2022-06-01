import React from "react";
import STRINGS from "../../../../../utils/strings";
import LabeledDialog from "../../../../dialogs/LabeledDialog";
import InterConsultActionPanel from "../InterConsultActionPanel";
import InterConsultPanelAbstract from "./InterConsultPanelAbstract";

interface Props {
  open: boolean;
  editAction: boolean;
  interConsult: Schemas.InterConsultationResp;
  handleShow: () => void;
  handleEdit: () => void;
  handleMailClicked?: () => void;
  handleCellClicked?: () => void;
  handlePrintClicked?: () => void;
  handleHistoryClicked: () => void;
  onCancel: () => void;
  handleCloseEditMode: () => void;
  loadingCellClicked?: boolean;
  loadingPrintClicked?: boolean;
  loadingMailClicked?: boolean;
  fromNotReceived?: boolean;
}

export default function InterConsultAbstract({
  open,
  editAction,
  interConsult,
  handleShow,
  handleMailClicked = undefined,
  handleCellClicked = undefined,
  handlePrintClicked = undefined,
  handleHistoryClicked,
  onCancel,
  loadingMailClicked,
  loadingCellClicked,
  loadingPrintClicked,
  fromNotReceived,
  handleEdit,
  handleCloseEditMode,
}: Props) {
  return (
    <LabeledDialog
      label={STRINGS.interconsult.ABSTRACT}
      open={open}
      handleShow={handleShow}
      actionPanel={
        <InterConsultActionPanel
          handleHistoryClicked={handleHistoryClicked}
          handleCellClicked={handleCellClicked}
          handleMailClicked={handleMailClicked}
          handlePrintClicked={handlePrintClicked}
          loadingCellClicked={loadingCellClicked}
          loadingMailClicked={loadingMailClicked}
          loadingPrintClicked={loadingPrintClicked}
          fromNotReceived={fromNotReceived}
          handleClose={handleCloseEditMode}
        />
      }>
      <InterConsultPanelAbstract
        editAction={editAction}
        interConsult={interConsult}
        handleEdit={handleEdit}
        onCancel={onCancel}
      />
    </LabeledDialog>
  );
}
