import React from "react";
import ActivatePayPlanDialogPanel from "../../components/domains/plan/ActivatePayPlanDialogPanel";
import { useProfessionalSubscriptionQuery } from "../../modules/subscriptions/query";

interface Props {
  planCode: string;
  handleShow: () => void;
}

export default function ActivatePayPlanDialogPanelContainer({
  planCode,
  handleShow,
}: Props) {
  const { loading, data } = useProfessionalSubscriptionQuery({
    showError: true,
    code: planCode,
  });
  return (
    <ActivatePayPlanDialogPanel
      loading={loading}
      plan={data}
      handleShow={handleShow}
    />
  );
}
