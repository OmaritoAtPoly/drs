/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys } from "../apiTypes";
import { useCustomerOrdersQuery } from "./query";

export default function useCustomerOrderCacheSelector() {
  const [customerId, setCustomerId] = useState<string>();
  const [orderState, setOrderState] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<string>();

  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [customerName, setCustomerName] = useState<string>("");
  const {
    items,
    fetchMore,
    isFetchingMore,
    loading,
    refetch,
    canFetchMore,
  } = useCustomerOrdersQuery({
    showError: true,
    customerCode: customerId,
    state: orderState,
    paymentMethod,
    from,
    to,
  });

  return {
    loading,
    isFetchingMore,
    canFetchMore,
    items,
    customerId,
    customerName,
    orderState,
    from,
    to,
    paymentMethod,
    setPaymentMethod,
    setFrom,
    setTo,
    setOrderState,
    setCustomerId,
    setCustomerName,
    fetchMore,
    refetch,
  };
}
