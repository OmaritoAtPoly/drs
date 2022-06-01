import React from "react";
import BadgedButton from "../buttons/BadgedButton";

interface Props {
  onHistoryClicked?: () => void;
  historyToolTipLabel: string;
}

const ActionPanel = ({ onHistoryClicked = () => {}, historyToolTipLabel }: Props) => (
  <div>
    <BadgedButton
      onClick={onHistoryClicked}
      iconName="timeBack"
      iconWidth={15}
      iconHeight={15}
      toolTip={historyToolTipLabel}
    />
    {/* TODO:// This is temporally disable  */}
    {/* <BadgedButton
      onClick={onTemplateClicked}
      iconName="itemList"
      iconWidth={15}
      iconHeight={15}
    /> */}
  </div>
);

export default ActionPanel;
