import React from "react";
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import STRINGS from "../../../utils/strings";

const styles = makeStyles((theme) =>
  createStyles({
    item: { marginBottom: theme.spacing(1) },
    itemRow: {
      display: "flex",
      marginBottom: theme.spacing(1),
      alignItems: "center",
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props {
  plan?: Schemas.ProfessionalSubscriptionData;
}

export default function PlanInfo({ plan }: Props) {
  const classes = styles();
  return (
    <div>
      <div className={classes.item}>
        <Typography className={classes.title}>
          {STRINGS.payPlan.EXPIRE_PLAN_DATE1}
        </Typography>
        <Typography>{`${plan?.changeExpires?.dateDay}/${plan?.changeExpires?.dateMonth}/${plan?.changeExpires?.dateYear}`}</Typography>
      </div>
      <div className={classes.item}>
        <Typography className={classes.title}>
          {STRINGS.payPlan.START_PLAN}
        </Typography>
        <Typography>{`${plan?.changeStart?.dateDay}/${plan?.changeStart?.dateMonth}/${plan?.changeStart?.dateYear}`}</Typography>
      </div>
      <div className={classes.itemRow}>
        <Typography className={classes.title}>
          {STRINGS.payPlan.PLAN_CREDIT}
        </Typography>
        <Typography>{`$${plan?.changeCredit}`}</Typography>
      </div>
      <div className={classes.itemRow}>
        <Typography className={classes.title}>
          {STRINGS.payPlan.TOTAL_PAY}
        </Typography>
        <Typography>{`$${plan?.changeTotal}`}</Typography>
      </div>
    </div>
  );
}
