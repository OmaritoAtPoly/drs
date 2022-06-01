import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

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
      justifyContent: "space-around",
      alignItems: "center",
      width: "90%",
    },
    item: {
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  }),
);

interface Props {
  payment: Schemas.PaymentData;
  orders: Schemas.AppointmentOrderData;
}

export default function PaymentRow({
  payment,
  orders,
}: Props) {
  const classes = useStyles();

  return (
    <ListItem
      id="list-item-large-device-payment-details"
      onClick={() => { }}
      onMouseEnter={() => { }}
      onMouseLeave={() => { }}
      button
      alignItems="flex-start"
      className={classes.flex}>
      <div className={classes.shortColumn}>
        <ListItemText primary={payment.paymentMethod} className={classes.item} />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText primary={payment.amount} className={classes.item} />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText
          primary={
            <Typography>
              {`${orders.createdAt?.dateDay}/${orders.createdAt?.dateMonth}/${orders.createdAt?.dateYear} `}
            </Typography>
          }
          className={classes.item} />
      </div>
    </ListItem>
  );
}
