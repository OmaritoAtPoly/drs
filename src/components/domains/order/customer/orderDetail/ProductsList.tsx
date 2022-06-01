import React, { useMemo } from "react";
import OrderDetailHeader from "./OrderDetailHeader";
import OrderRow from "./ProductRow";

interface Props {
  orders: Schemas.AppointmentOrderData;
}

export default function ProductsList({ orders }: Props) {
  const orderProducts = useMemo(() => {
    let products: Schemas.AppointmentOrderProductData[] = [];
    orders.products?.map((a) => {
      products = [...products, a];
      return products;
    });
    return products || [];
  }, [orders.products]);

  return (
    <>
      <OrderDetailHeader />
      {orderProducts.map((order) => (
        <OrderRow order={order} key={order.code} />
      ))}
    </>
  );
}
