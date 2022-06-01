import React from "react";
import Customers from "../../components/domains/customers/Customers";
import { useCustomersCacheSelector } from "../../modules/customer/profile/cacheSelector";

export default function CustomersContainer() {
  const {
    items,
    loading,
    fetchMore,
    canFetchMore,
    isFetchingMore,
  } = useCustomersCacheSelector({ alwaysEnabled: true });

  return (
    <Customers
      customers={items || []}
      loading={loading || !!isFetchingMore}
      fetchMore={fetchMore}
      hasNextPage={canFetchMore}
    />
  );
}
