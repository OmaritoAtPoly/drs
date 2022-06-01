import { createStyles, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useMemo } from "react";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { formatDate, getDateTimeObjectMoment } from "../../../utils/date";
import STRINGS from "../../../utils/strings";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "min-content",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
    },
    alertExpireInfo: {
      color: theme.palette.error.dark,
    },
    cardTitle: {
      fontWeight: "bold",
      fontSize: 18,
      color: theme.palette.primary.main,
    },
    header: {
      display: "flex",
    },
    boldLabel: {
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props {
  currentPlan: Schemas.SubscriptionData;
}

export default function ExpireInfoPanel({ currentPlan }: Props) {
  const classes = styles();
  const { currentProfessional } = useProfileCacheSelector();

  const subscriptionStartDate = useMemo(
    () => getDateTimeObjectMoment(currentProfessional?.subscriptionStarted),
    [currentProfessional?.subscriptionStarted],
  );

  const subscriptionExpirationDate = useMemo(
    () => getDateTimeObjectMoment(currentProfessional?.subscriptionExpires),
    [currentProfessional?.subscriptionExpires],
  );

  const elapsedTime = subscriptionExpirationDate?.diff(
    moment(new Date()),
    "day",
  );

  return (
    <div className={classes.container}>
      <span className={classes.header}>
        <Typography className={classes.boldLabel}>
          {`${STRINGS.payPlan.CURRENT_PLAN}:`}
        </Typography>
        <Typography className={classes.cardTitle}>
          {`${currentPlan.name}`}
        </Typography>
      </span>
      <span className={classes.header}>
        <Typography className={classes.boldLabel}>
          {STRINGS.payPlan.STARTED_PLAN_DATE}
        </Typography>
        <Typography>
          {subscriptionStartDate &&
            subscriptionStartDate.format(
              formatDate["dddd, D [de] MMMM [de] YYYY, h:mm a"],
            )}
        </Typography>
      </span>
      <span className={classes.header}>
        <Typography className={classes.boldLabel}>
          {STRINGS.payPlan.EXPIRE_PLAN_DATE}
        </Typography>
        <Typography>
          {subscriptionExpirationDate &&
            subscriptionExpirationDate.format(
              formatDate["dddd, D [de] MMMM [de] YYYY, h:mm a"],
            )}
        </Typography>
      </span>

      <span className={classes.header}>
        <Typography
          className={`${
            currentPlan.days && currentPlan.days < 5
              ? classes.alertExpireInfo
              : classes.boldLabel
          }`}>
          {currentPlan.days && currentPlan.days < 0
            ? `${STRINGS.payPlan.EXPIRED_PLAN}`
            : `${STRINGS.payPlan.EXPIRE_DATE_DAYS}`}
        </Typography>
        <Typography>
          {currentPlan.days && currentPlan.days < 0
            ? ""
            : `${elapsedTime} ${STRINGS.payPlan.DAYS}`}
        </Typography>
      </span>
    </div>
  );
}
