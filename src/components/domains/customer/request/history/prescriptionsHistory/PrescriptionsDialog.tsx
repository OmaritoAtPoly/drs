/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";
import LabeledDialog from "../../../../../dialogs/LabeledDialog";
import RequestHistoryActionPanel from "../RequestHistoryActionPanel";
import PrescriptionsContainer from "./PrescriptionsContainer";

interface Props {
  handleShow: () => void;
  open: boolean;
  onAddClicked: () => void;
}

export default function PrescriptionsDialog({
  handleShow,
  open,
  onAddClicked,
}: Props) {
  const onCloseClicked = useCallback(() => {
    handleShow();
  }, [handleShow]);

  return (
    <LabeledDialog
      label="Historial de Recetas"
      open={open}
      actionPanel={
        <RequestHistoryActionPanel
          onAddClicked={onAddClicked}
          onCloseClicked={onCloseClicked}
        />
      }
      handleShow={handleShow}>
      <PrescriptionsContainer handleShow={handleShow} />
    </LabeledDialog>
  );
}
