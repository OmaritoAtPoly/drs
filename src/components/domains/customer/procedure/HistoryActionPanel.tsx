import React, { useCallback } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";

interface Props {
  handleNewProcedure: (value: string) => void;
  onClose: () => void;
}
const ProcedureActionPanel = ({ handleNewProcedure, onClose }: Props) => {
  const handleNewProcedureFunc = useCallback(() => {
    handleNewProcedure(STRINGS.procedure.NEW_PROCEDURE);
  }, [handleNewProcedure]);

  return (
    <span>
      <BadgedButton
        iconName="add"
        onClick={handleNewProcedureFunc}
        iconWidth={theme.spacing(2)}
        iconHeight={theme.spacing(2)}
    />
      <BadgedButton
        iconName="closeIcon"
        onClick={onClose}
        iconWidth={theme.spacing(2)}
        iconHeight={theme.spacing(2)}
    />
    </span>);
};

export default ProcedureActionPanel;
