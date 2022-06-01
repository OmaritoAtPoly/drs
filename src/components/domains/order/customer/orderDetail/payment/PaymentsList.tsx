import React, { useMemo } from "react";
import shortid from "shortid";
import PaymentOrderHeader from "./PaymentOrderHeader";
import PaymentRow from "./PaymentRow";

interface Props {
  orders: Schemas.AppointmentOrderData;
}

export default function PaymentsList({ orders }: Props) {
  const orderProducts = useMemo(() => {
    let payment: Schemas.PaymentData[] = [];
    orders.payments?.map((a) => {
      payment = [...payment, a];
      return payment;
    });
    return payment || [];
  }, [orders.payments]);

  return (
    <>
      <PaymentOrderHeader />
      {orderProducts.map((payment) => (
        <PaymentRow key={shortid()} payment={payment} orders={orders} />
      ))}
    </>
  );
}
