import React, { useCallback } from "react";
import BadgedButton from "../../../components/buttons/BadgedButton";
import LabeledDialog from "../../../components/dialogs/LabeledDialog";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import ResultFileContainer from "./ResultFileContainer";

interface Props {
  open?: boolean;
  handleShowResultFileDialog: () => void;
}

export default function ResultFileDialog({
  open = false,
  handleShowResultFileDialog,
}: Props) {
  const renderActionPanel = useCallback(
    () => (
      <div>
        <BadgedButton
          onClick={handleShowResultFileDialog}
          iconName="timeBack"
          fill={theme.palette.primary.main}
          iconWidth={15}
          iconHeight={15}
        />
        <BadgedButton
          onClick={handleShowResultFileDialog}
          iconName="closeIcon"
          iconWidth={15}
          iconHeight={15}
        />
      </div>
    ),
    [handleShowResultFileDialog],
  );

  return (
    <LabeledDialog
      label={STRINGS.result.ADD_RESULT}
      open={open}
      handleShow={handleShowResultFileDialog}
      actionPanel={renderActionPanel()}>
      <ResultFileContainer
        handleShowResultFileDialog={handleShowResultFileDialog}
      />
    </LabeledDialog>
  );
}
