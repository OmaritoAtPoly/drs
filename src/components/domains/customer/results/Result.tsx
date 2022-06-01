import React from "react";
import HistoryResultContainer from "../../../../containers/customer/results/HistoryResultContainer";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import ResultActionPanel from "./ResultActionPanel";

interface Props {
  open?: boolean;
  handleShow: () => void;
  handleShowAddResultForm: () => void;
  handleShowAddFromFileResultForm: () => void;
  handleEdit: () => void;
}

export default function Result({
  open,
  handleShow,
  handleShowAddResultForm,
  handleShowAddFromFileResultForm,
  handleEdit,
}: Props) {
  return (
    <LabeledDialog
      label={STRINGS.buttonGrid.RESULTS}
      open={open || false}
      handleShow={handleShow}
      actionPanel={
        <ResultActionPanel
          handleAdd={handleShowAddResultForm}
          handleAddFromFile={handleShowAddFromFileResultForm}
          handleClose={handleShow}
        />
      }>
      <HistoryResultContainer handleEdit={handleEdit} />
    </LabeledDialog>
  );
}
