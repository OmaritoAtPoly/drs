import React from "react";
import InfiniteScrollList from "../../../lists/InfiniteScrollList";
import ServiceRow from "./ServiceRow";
import ServiceSimpleHeader from "./ServiceSimpleHeader";

interface Props {
  loading: boolean;
  hasNextPage: boolean;
  services: Schemas.ProfessionalProductData[];
  fetchMore: () => void;
  handleOnEdit: (
    service: Schemas.ProfessionalProductData,
    active?: boolean,
  ) => void;
  handleOnDelete: (service: Schemas.ProfessionalProductData) => void;
}

export default function ServiceList({
  services,
  loading,
  hasNextPage,
  fetchMore,
  handleOnEdit,
  handleOnDelete,
}: Props) {
  return (
    <InfiniteScrollList
      data={services}
      loading={loading}
      fetchMore={fetchMore}
      hasNextPage={hasNextPage}
      renderRow={(service: Schemas.ProfessionalProductData) => (
        <ServiceRow
          id={service.code}
          service={service}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />
      )}
      renderHeader={() => <ServiceSimpleHeader />}
    />
  );
}
