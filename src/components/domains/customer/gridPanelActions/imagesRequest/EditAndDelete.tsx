import React from "react";
import theme from "../../../../../styles/theme";
import BadgedButton from "../../../../buttons/BadgedButton";

interface Props {
  onDelete: () => void;
}

const EditAndDelete = ({ onDelete }: Props) =>

  <div>
    <BadgedButton onClick={() => { }} fill={theme.palette.primary.main} iconName="opinion" iconWidth={15} iconHeight={15} />
    <BadgedButton onClick={() => onDelete()} fill={theme.palette.error.dark} iconName="trash" iconWidth={15} iconHeight={15} />
  </div>;

export default EditAndDelete;
