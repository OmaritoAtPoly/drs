import React from "react";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  onClose: () => void;
}
const ActionPanelInsurance = ({ onClose }: Props) => (
  <span>
    <BadgedButton
      iconName="closeIcon"
      onClick={onClose}
      iconWidth={15}
      iconHeight={15}
    />
  </span>
);

export default ActionPanelInsurance;
