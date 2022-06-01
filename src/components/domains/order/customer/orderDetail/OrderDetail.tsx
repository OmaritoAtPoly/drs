import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { defaultOrderDetail } from "../../../../../utils/defaultData";
import PaymentsList from "./payment/PaymentsList";
import ProductsList from "./ProductsList";
import SubTotals from "./SubTotals";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
    },
  }),
);

interface Props {
  order: Schemas.AppointmentOrderData;
}

export default function OrderDetail({ order }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ProductsList orders={order || defaultOrderDetail} />
      <SubTotals orders={order || defaultOrderDetail} />
      <PaymentsList orders={order || defaultOrderDetail} />
    </div>
  );
}
