import React from "react";
import CustomerOrderActionPanel from "./CustomerOrderActionPanel";
import OrderList from "./orderList/OrderList";

interface Props {
  disabledAction: boolean;
  loadingOrders: boolean;
  orders: Schemas.AppointmentOrderData[];
  hasNextPage: boolean;
  state: string;
  from: string;
  to: string;
  paymentMethod: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setOrderState: (state: string) => void;
  setPaymentMethod: (state: string) => void;
  handleOnCustomerSelected: (customer: Schemas.CustomerData) => void;
  handleCreateOrder: () => void;
  handleEditOrder: (
    order: Schemas.AppointmentOrderData,
    customerCode: string,
  ) => void;
  handleDeleteOrder: (code: string, customerId: string) => void;
  deleteOrder: boolean;
  handleSavePaymentOrder: (
    order: Schemas.AppointmentOrderData,
    customerId: string,
  ) => void;
  handleInvoiceOrder: (code: string) => void;
  fetchMore: () => void;
}

export default function CustomerOrder({
  disabledAction,
  loadingOrders,
  orders,
  hasNextPage,
  state,
  from,
  to,
  paymentMethod,
  setFrom,
  setTo,
  setOrderState,
  setPaymentMethod,
  handleOnCustomerSelected,
  handleCreateOrder,
  handleEditOrder,
  handleDeleteOrder,
  deleteOrder,
  handleSavePaymentOrder,
  handleInvoiceOrder,
  fetchMore,
}: Props) {
  return (
    <>
      <CustomerOrderActionPanel
        disabledAction={disabledAction}
        state={state}
        from={from}
        to={to}
        paymentMethod={paymentMethod}
        setFrom={setFrom}
        setTo={setTo}
        setOrderState={setOrderState}
        handleOnNewOrder={handleCreateOrder}
        handleOnCustomerSelected={handleOnCustomerSelected}
        setPaymentMethod={setPaymentMethod}
      />
      <OrderList
        loading={loadingOrders}
        orders={orders}
        hasNextPage={hasNextPage}
        handleEditOrder={handleEditOrder}
        handleDeleteOrder={handleDeleteOrder}
        deleteOrder={deleteOrder}
        handleSavePaymentOrder={handleSavePaymentOrder}
        handleInvoiceOrder={handleInvoiceOrder}
        fetchMore={fetchMore}
      />
    </>
  );
}
