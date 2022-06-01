import { useMemo } from "react";
import { useProfessionalSubscriptionsQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useProfessionalSubscriptionsCacheSelector = () => {
  const { data, loading } = useProfessionalSubscriptionsQuery({
    showError: true,
  });

  const premiumPlan = useMemo<Schemas.SubscriptionData[]>(
    () =>
      (!loading &&
        data &&
        data.filter((item) => item.code?.includes("premium"))) ||
      [],
    [data, loading],
  );

  const basicPlan = useMemo<Schemas.SubscriptionData[]>(
    () =>
      (!loading &&
        data &&
        data.filter((item) => item.code?.includes("basic"))) ||
      [],
    [data, loading],
  );

  return { loading, premiumPlan, basicPlan };
};
