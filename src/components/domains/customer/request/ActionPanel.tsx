import React from "react";
import theme from "../../../../styles/theme";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  onDelete: () => void;
  handleOnText: () => void;
  withComment?:boolean;
}

const ActionPanel = ({ onDelete, handleOnText, withComment = true }: Props) => (
  <div>
    {withComment &&
    <BadgedButton
      onClick={handleOnText}
      fill={theme.palette.primary.main}
      iconName="opinion"
      iconWidth={15}
      iconHeight={15}
    />}
    <BadgedButton
      onClick={onDelete}
      fill={theme.palette.error.dark}
      iconName="trash"
      iconWidth={15}
      iconHeight={15}
    />
  </div>
);

export default ActionPanel;
