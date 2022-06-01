/* eslint-disable react/no-unused-prop-types */
import moment from "moment";
import React, { useCallback } from "react";
import CustomerOrderFilters from "../../../components/domains/order/customer/CustomerOrderFilters";
import { useCustomersCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useOperationDataCacheSelector } from "../../../modules/operationData/cacheSelector";
import { formatDate } from "../../../utils/date";

interface Props {
  state: string;
  from: string;
  to: string;
  paymentMethod: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  handleOnCustomerSelected: (customer: Schemas.CustomerData) => void;
  setOrderState: (state: string) => void;
  setPaymentMethod: (state: string) => void;
}

export default function OrderFilterContainer({
  state,
  paymentMethod,
  setPaymentMethod,
  handleOnCustomerSelected,
  setOrderState,
  setFrom,
  setTo,
}: Props) {
  const {
    items,
    loading,
    setSearch,
    isFetchingMore,
  } = useCustomersCacheSelector({});

  const { paymentMethods } = useOperationDataCacheSelector();

  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());

  const handleFromDateChange = (date?: Date) => {
    if (date) {
      setFrom(moment(date).format(formatDate.DD_MM_YYYY));
      setSelectedFromDate(date);
    }
  };

  const handleToDateChange = (date?: Date) => {
    if (date) {
      setTo(moment(date).format(formatDate.DD_MM_YYYY));
      setSelectedToDate(date);
    }
  };

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [setSearch],
  );

  return (
    <CustomerOrderFilters
      selectedFromDate={selectedFromDate}
      selectedToDate={selectedToDate}
      loadingSearch={loading || !!isFetchingMore}
      customersOptions={items}
      state={state}
      paymentMethods={paymentMethods}
      paymentMethod={paymentMethod}
      setPaymentMethod={setPaymentMethod}
      setOrderState={setOrderState}
      handleFromDateChange={handleFromDateChange}
      handleToDateChange={handleToDateChange}
      onDebounceSearch={onDebounceSearch}
      handleOnCustomerSelected={handleOnCustomerSelected}
    />
  );
}
