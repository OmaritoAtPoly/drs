/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";

const useStyles = makeStyles(() =>
  createStyles({
    container: { display: "flex" },
    shortColumn: {
      width: "80px",
      padding: 2,
    },
    largeColumn: {
      minWidth: "200px",
      padding: 2,
    },
    item: { fontWeight: "bold", textAlign: "center" },
  }),
);

const OrderHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.shortColumn}>
        <Typography className={classes.item}>
          {STRINGS.order.NUMBER_ORDER}
        </Typography>
      </div>
      <div className={classes.shortColumn}>
        <Typography className={classes.item}>
          {STRINGS.order.DATE_ORDER}
        </Typography>
      </div>
      <div className={classes.largeColumn}>
        <Typography className={classes.item}>
          {STRINGS.order.ORDER_PATIENT}
        </Typography>
      </div>
      <div className={`${classes.largeColumn}`}>
        <Typography className={classes.item}>
          {STRINGS.order.ORDER_STATE}
        </Typography>
      </div>
      <div className={`${classes.largeColumn}`}>
        <Typography className={classes.item}>
          {STRINGS.order.INVOICE}
        </Typography>
      </div>
      <div className={`${classes.largeColumn}`}>
        <Typography className={classes.item}>
          {STRINGS.order.PAY_WAY}
        </Typography>
      </div>
    </div>
  );
};

export default OrderHeader;
