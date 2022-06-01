import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { defaultPlan } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";
import CardSkeleton from "../../skeletons/CardSkeleton";
import ExpireInfoPanel from "./ExpireInfoPanel";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PayPlanItem from "./PayPlanItem";
import RegisteredPayWayPanel from "./RegisteredPayWayPanel";

const styles = makeStyles((theme) =>
  createStyles({
    container: {},
    row: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(1),
    },
    itemContainer: {
      margin: theme.spacing(1),
    },
    currentPlanContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    title: {
      margin: theme.spacing(1),
    },
    expireInfo: {
      marginLeft: theme.spacing(4),
      marginTop: theme.spacing(-1),
    },
    currentPlan: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      width: "100%",
    },
  }),
);

interface Props {
  loading: boolean;
  basicPlan: Schemas.SubscriptionData[];
  premiumPlan: Schemas.SubscriptionData[];
  currentPlan?: Schemas.SubscriptionData;
  onActive: (plan: Schemas.SubscriptionData) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PayPlanPanel({
  loading,
  basicPlan,
  premiumPlan,
  currentPlan,
  onActive,
}: Props) {
  const classes = styles();

  const handleOnActivePlan = useCallback(
    (plan: Schemas.SubscriptionData) => {
      onActive(plan);
    },
    [onActive],
  );

  const renderCurrentPlan = useCallback(() => {
    if (!currentPlan) {
      return (
        <PayPlanItem
          plan={defaultPlan}
          current
          onActive={() => handleOnActivePlan(defaultPlan)}
        />
      );
    }
    if (currentPlan && currentPlan.code?.includes("premium")) {
      return (
        <div className={classes.currentPlan}>
          <PayPlanItem
            plan={currentPlan}
            premium
            current
            onActive={() => handleOnActivePlan(currentPlan)}
          />
          <ExpireInfoPanel currentPlan={currentPlan} />
        </div>
      );
    }
    if (
      (currentPlan && currentPlan.code?.includes("basic")) ||
      currentPlan.code === "free"
    ) {
      return (
        <div className={classes.currentPlan}>
          <PayPlanItem
            plan={currentPlan}
            current
            onActive={() => {
              handleOnActivePlan(currentPlan);
            }}
          />
          <ExpireInfoPanel currentPlan={currentPlan} />
        </div>
      );
    }
    return (
      <PayPlanItem
        plan={defaultPlan}
        current
        onActive={() => handleOnActivePlan(defaultPlan)}
      />
    );
  }, [classes.currentPlan, currentPlan, handleOnActivePlan]);

  return (
    <div className={classes.container}>
      <Typography className={classes.title} color="primary" variant="h5">
        {STRINGS.payPlan.CURRENT_PLAN}
      </Typography>
      <div className={classes.currentPlanContainer}>
        {loading ? <CardSkeleton /> : renderCurrentPlan()}
      </div>
      <Typography className={classes.title} color="primary" variant="h5">
        {STRINGS.payPlan.AVAILABLE_PLAN}
      </Typography>
      <div className={classes.row}>
        {premiumPlan.map((plan) => (
          <div key={plan.code} className={classes.itemContainer}>
            <PayPlanItem
              plan={plan}
              premium
              onActive={() => handleOnActivePlan(plan)}
            />
          </div>
        ))}
      </div>
      <div className={classes.row}>
        {basicPlan.map((plan) => (
          <div key={plan.code} className={classes.itemContainer}>
            <PayPlanItem
              plan={plan}
              onActive={() => handleOnActivePlan(plan)}
            />
          </div>
        ))}
      </div>
      <RegisteredPayWayPanel />
    </div>
  );
}
