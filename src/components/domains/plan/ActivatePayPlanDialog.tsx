import React, { useCallback } from "react";
import ActivatePayPlanDialogPanelContainer from "../../../containers/plan/ActivatePayPlanDialogPanelContainer";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import BadgedButton from "../../buttons/BadgedButton";
import LabeledDialog from "../../dialogs/LabeledDialog";

interface Props {
  open: boolean;
  handleShow: () => void;
  planCode: string;
}

export default function ActivatePayPlanDialog({
  open,
  handleShow,
  planCode,
}: Props) {
  const renderActionPanel = useCallback(
    () => (
      <BadgedButton
        onClick={handleShow}
        fill={theme.palette.error.dark}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
      />
    ),
    [handleShow],
  );

  return (
    <LabeledDialog
      id="pay-plan"
      handleShow={handleShow}
      label={STRINGS.payPlan.PAY_PLAN_TITLE}
      open={open}
      actionPanel={renderActionPanel()}>
      <ActivatePayPlanDialogPanelContainer
        planCode={planCode}
        handleShow={handleShow}
      />
    </LabeledDialog>
  );
}
