import React from "react";
import BadgedButton from "../../../components/buttons/BadgedButton";

interface Props {
  onAdd: () => void;
  onClose: () => void;
}

const HistoricalInterConsultActionPanel = ({ onAdd, onClose }: Props) => (
  <div>
    <BadgedButton
      onClick={onAdd}
      iconName="add"
      iconWidth={15}
      iconHeight={15}
    />
    <BadgedButton
      onClick={onClose}
      iconName="closeIcon"
      iconWidth={15}
      iconHeight={15}
    />
  </div>
);

export default HistoricalInterConsultActionPanel;
