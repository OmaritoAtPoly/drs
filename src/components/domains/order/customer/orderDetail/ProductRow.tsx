import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useCallback } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    shortColumn: {
      width: "10%",
      padding: 2,
    },
    largeColumn: {
      width: "20%",
      padding: 2,
    },
    flex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    item: {
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
    },
  }),
);

interface Props {
  order: Schemas.AppointmentOrderProductData;
}

export default function ProductRow({
  order,
}: Props) {
  const classes = useStyles();

  const handleUnitCost = useCallback((total, quantity) => {
    let value = 0;
    if (total && quantity) {
      (total < 0 || total === 0)
        ? (value = quantity / 1)
        : (value = quantity / total);
    }
    return value;
  }, []);

  return (
    <ListItem
      id="list-item-large-device-oder-details"
      onClick={() => { }}
      onMouseEnter={() => { }}
      onMouseLeave={() => { }}
      button
      alignItems="flex-start"
      className={classes.flex}>
      <div className={classes.shortColumn}>
        <ListItemText primary={order.code} className={classes.item} />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText primary={order.name} className={classes.item} />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText primary={order.quantity} className={classes.item} />
      </div>
      <div className={`${classes.shortColumn}`}>
        <ListItemText primary={`$ ${handleUnitCost(order.quantity, order.total).toPrecision(2)}`} className={classes.item} />
      </div>
      <div className={`${classes.largeColumn}`}>
        <ListItemText primary={order.discount} className={classes.item} />
      </div>
      <div className={`${classes.shortColumn}`}>
        <ListItemText primary={order.tax12} className={classes.item} />
      </div>
      <div className={`${classes.shortColumn}`}>
        <ListItemText primary={`$${order.subtotal}`} className={classes.item} />
      </div>
    </ListItem>
  );
}
