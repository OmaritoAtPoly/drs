import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      marginBlock: "5%",
      alignItems: "flex-end",
      paddingRight: "30px",
      flexDirection: "column",
    },
    item: {
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
    },
    centerItems: { alignItems: "center" },
    taxDividerStyle: {
      display: "flex",
      flexDirection: "column",
      marginBlock: theme.spacing(2),
    },
  }),
);

interface Props {
  orders: Schemas.AppointmentOrderData;
}

export default function SubTotals({
  orders,
}: Props) {
  const classes = useStyles();

  return (
    <div id="list-item-subtotals" className={`${classes.container} `}>
      <div className={classes.taxDividerStyle}>
        <Typography className={classes.item}>{`${STRINGS.order.SUBTOTAL_TAX_12} ${orders.subtotal}`}</Typography>
        <Typography className={classes.item}>{`${STRINGS.order.SUBTOTAL_NO_TAX} ${orders.subtotalNoTax}`}</Typography>
      </div>
      <div className={classes.taxDividerStyle}>
        <Typography className={classes.item}>{`${STRINGS.order.SUBTOTAL_FOR_TAXES} ${orders.subtotal}`}</Typography>
        <Typography className={classes.item}>{`${STRINGS.order.DISCOUNT_FOR_TAXES} ${orders.discount}`}</Typography>
      </div>
      <div className={classes.taxDividerStyle}>
        <Typography className={classes.item}>{`${STRINGS.order.IVA} ${orders.tax12}`}</Typography>
        <Typography className={classes.item}>{`${STRINGS.order.TOTAL_FOR_TAXES} ${orders.total}`}</Typography>
      </div>
    </div>
  );
}
