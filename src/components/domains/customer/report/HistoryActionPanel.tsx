import React from "react";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  handleNewReport: () => void;
  onClose: () => void;
}
const HistoryActionPanel = ({ handleNewReport, onClose }: Props) => (
  <span>
    <BadgedButton
      iconName="add"
      onClick={handleNewReport}
      iconWidth={15}
      iconHeight={15}
    />
    <BadgedButton
      iconName="closeIcon"
      onClick={onClose}
      iconWidth={15}
      iconHeight={15}
    />
  </span>
);

export default HistoryActionPanel;
