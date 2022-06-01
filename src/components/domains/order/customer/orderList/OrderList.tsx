import React, { useCallback, useState } from "react";
import InfiniteScrollList from "../../../../lists/InfiniteScrollList";
import OrderHeader from "./OrderHeader";
import OrderRow from "./OrderRow";

interface Props {
  loading: boolean;
  orders: Schemas.AppointmentOrderData[];
  hasNextPage: boolean;
  handleEditOrder: (
    order: Schemas.AppointmentOrderData,
    customerCode: string,
  ) => void;
  handleDeleteOrder: (code: string, customerId: string) => void;
  deleteOrder?: boolean;
  handleSavePaymentOrder: (
    order: Schemas.AppointmentOrderData,
    customerId: string,
  ) => void;
  handleInvoiceOrder: (code: string) => void;

  fetchMore: () => void;
}

export default function OrderList({
  loading,
  orders,
  hasNextPage,
  handleEditOrder,
  handleDeleteOrder,
  deleteOrder,
  handleSavePaymentOrder,
  handleInvoiceOrder,
  fetchMore,
}: Props) {
  const [currentToDelete, setCurrentToDelete] = useState<string | undefined>();

  const handleDeleteCallBack = useCallback(
    (order: Schemas.AppointmentOrderData, customerId: string) => {
      setCurrentToDelete(order.code || "");
      handleDeleteOrder(order.code || "", customerId);
    },
    [handleDeleteOrder],
  );

  return (
    <InfiniteScrollList
      data={orders}
      loading={loading}
      fetchMore={fetchMore}
      hasNextPage={hasNextPage}
      renderRow={(order: Schemas.AppointmentOrderData, index) => (
        <OrderRow
          order={order}
          orderNumber={index + 1}
          customer={order.customer}
          handleEditOrder={handleEditOrder}
          handleDeleteOrder={handleDeleteCallBack}
          deleteOrder={currentToDelete === order.code && deleteOrder}
          handleSavePaymentOrder={handleSavePaymentOrder}
          handleInvoiceOrder={handleInvoiceOrder}
        />
      )}
      renderHeader={() => <OrderHeader />}
    />
  );
}
