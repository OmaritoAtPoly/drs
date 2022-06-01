import React from "react";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  handleNewCertificate: () => void;
  onClose: () => void;
}
const HistoryActionPanel = ({ handleNewCertificate, onClose }: Props) => (
  <span>
    <BadgedButton
      iconName="add"
      onClick={handleNewCertificate}
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
