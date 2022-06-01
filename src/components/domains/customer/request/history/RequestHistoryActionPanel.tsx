import React from "react";
import BadgedButton from "../../../../buttons/BadgedButton";

interface Props {
  onAddClicked: () => void;
  onCloseClicked: () => void;
  showAddAction?: boolean;
}

const RequestHistoryActionPanel = ({
  showAddAction = true,
  onAddClicked,
  onCloseClicked,
}: Props) => (
  <div>
    {showAddAction && (
      <BadgedButton
        onClick={onAddClicked}
        iconName="add"
        iconWidth={15}
        iconHeight={15}
      />
    )}
    <BadgedButton
      onClick={onCloseClicked}
      iconName="closeIcon"
      iconWidth={15}
      iconHeight={15}
    />
  </div>
);

export default RequestHistoryActionPanel;
