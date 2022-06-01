import React, { useCallback } from "react";
import Faqs from "../../components/domains/faqs/Faqs";
import { useFaqsCacheSelector } from "../../modules/customer/faqs/cacheSelector";

export default function FaqsContainer() {
  const {
    loading,
    isFetchingMore,
    canFetchMore,
    items,
    fetchMore,
    setFilter,
  } = useFaqsCacheSelector({ alwaysEnabled: true });
  const onDebounceFaqs = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  const onChange = useCallback(
    (value: Schemas.FaqData) => {
      setFilter(value && value.question ? value.question : "");
    },
    [setFilter],
  );

  return (
    <Faqs
      faqs={items}
      fetchMore={fetchMore}
      onChange={onChange}
      onDebounceFaqs={onDebounceFaqs}
      loadingFaqs={loading || !!isFetchingMore}
      hasNextPage={canFetchMore}
    />
  );
}
