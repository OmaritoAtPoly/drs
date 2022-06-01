/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import PaymentCardPanelContainer from "../../../containers/plan/PaymentCardPanelContainer";
import CardSkeleton from "../../skeletons/CardSkeleton";
import PayPlanItem from "./PayPlanItem";
import PlanInfo from "./PlanInfo";

const styles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    leftSideContainer: {
      width: "30%",
      minWidth: "350px",
      [theme.breakpoints.down("md")]: {
        width: "50%",
        alignItems: "center",
      },
    },
    rightSideContainer: {
      width: "70%",
      minWidth: "350px",
      [theme.breakpoints.down("md")]: {
        width: "50%",
      },
    },
    rightSideContent: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    col: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      maxWidth: "360px",
      marginBottom: "16px",
    },
    infoPanel: {
      padding: theme.spacing(1),
      border: `2px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
    },
  }),
);

interface Props {
  loading: boolean;
  plan?: Schemas.ProfessionalSubscriptionData;
  handleShow: () => void;
}

export default function ActivatePayPlanDialogPanel({
  loading,
  plan,
  handleShow,
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.leftSideContainer}>
        <div className={classes.col}>
          {loading ? (
            <CardSkeleton />
          ) : (
            <PayPlanItem
              premium={plan && plan.code?.includes("premium")}
              activateOption={false}
              onActive={() => {}}
              plan={plan || {}}
            />
          )}
        </div>
      </div>
      <div className={classes.rightSideContainer}>
        <div className={classes.rightSideContent}>
          <div className={`${classes.col} ${classes.infoPanel}`}>
            {loading ? <CardSkeleton /> : <PlanInfo plan={plan} />}
          </div>
          <div className={classes.col}>
            <PaymentCardPanelContainer
              plan={plan || {}}
              handleShow={handleShow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
