import React from "react";
import { usePlanExpiredQuery } from "../../../modules/payment/query";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useTabIndexQuery } from "./query";
import SideBar from "./SideBar";

export default function SideBarContainer() {
  const { data } = useTabIndexQuery({ showError: true });
  const { isBasicSubscriptionPlan } = useProfileCacheSelector();
  const { data: planExpiredData } = usePlanExpiredQuery();
  return (
    <SideBar
      tabIndex={data?.tabIndex || 0}
      isBasicPlan={isBasicSubscriptionPlan || false}
      planExpired={planExpiredData?.planExpired}
    />
  );
}
