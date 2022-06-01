import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import PayPlanPanel from "../../components/domains/plan/PayPlanPanel";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import { useProfessionalSubscriptionsCacheSelector } from "../../modules/subscriptions/subscriptionCacheSelector";

export default function PayPlanPanelContainer() {
  const {
    loading,
    basicPlan,
    premiumPlan,
  } = useProfessionalSubscriptionsCacheSelector();
  const { currentProfessional, loadingUserMe } = useProfileCacheSelector();
  const { push } = useHistory();

  const handleOnActivePlan = useCallback(
    (plan: Schemas.SubscriptionData) => {
      push(`/pay/plan/${plan.code}`);
    },
    [push],
  );

  return (
    <PayPlanPanel
      loading={loading || loadingUserMe}
      basicPlan={basicPlan}
      premiumPlan={premiumPlan}
      currentPlan={currentProfessional?.subscription}
      onActive={handleOnActivePlan}
    />
  );
}
