import React from "react";
import NewEditServiceDialog from "./NewEditServiceDialog";
import ServiceActionPanel from "./ServiceActionPanel";
import ServiceList from "./serviceList/ServiceList";

interface Props {
  open: boolean;
  creatingOrEditingService: boolean;
  initialValues: Schemas.ProfessionalProductRequest;
  loadingServices: boolean;
  hasNextPage: boolean;
  services: Schemas.ProfessionalProductData[];
  active: boolean;
  taxPercent: string;
  fetchMore: () => void;
  handleOnOpenServiceDialog: () => void;
  handleOnAddService: (request: Schemas.ProfessionalProductRequest) => void;
  handleOnActiveStatusChange: (value: boolean) => void;
  handleOnTaxChange: (value: string) => void;
  handleOnEdit: (
    service: Schemas.ProfessionalProductData,
    active?: boolean,
  ) => void;
  handleOnDelete: (service: Schemas.ProfessionalProductData) => void;
  handleOnFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Service({
  open,
  creatingOrEditingService,
  initialValues,
  services,
  loadingServices,
  hasNextPage,
  active,
  taxPercent,
  fetchMore,
  handleOnOpenServiceDialog,
  handleOnAddService,
  handleOnActiveStatusChange,
  handleOnTaxChange,
  handleOnEdit,
  handleOnDelete,
  handleOnFilterChange,
}: Props) {
  return (
    <>
      <ServiceActionPanel
        active={active}
        taxPercent={taxPercent}
        handleOnCreateNewService={handleOnOpenServiceDialog}
        handleOnActiveStatusChange={handleOnActiveStatusChange}
        handleOnTaxChange={handleOnTaxChange}
        handleOnFilterChange={handleOnFilterChange}
      />
      <ServiceList
        loading={loadingServices}
        services={services}
        hasNextPage={hasNextPage}
        fetchMore={fetchMore}
        handleOnEdit={handleOnEdit}
        handleOnDelete={handleOnDelete}
      />
      <NewEditServiceDialog
        open={open}
        creatingService={creatingOrEditingService}
        initialValues={initialValues}
        handleOnAddService={handleOnAddService}
        handleShow={handleOnOpenServiceDialog}
      />
    </>
  );
}
