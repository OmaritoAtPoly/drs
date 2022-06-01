import React from "react";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  onPrintClicked?: () => void;
  onAddClicked?: () => void;
}

const ActionPanel = ({
  onPrintClicked = () => {},
  onAddClicked = () => {},
}: Props) => (
  <div>
    <BadgedButton
      onClick={onPrintClicked}
      iconName="print"
      iconWidth={15}
      iconHeight={15}
    />
    <BadgedButton
      onClick={onAddClicked}
      iconName="add"
      iconWidth={15}
      iconHeight={15}
    />
  </div>
);

export default ActionPanel;
