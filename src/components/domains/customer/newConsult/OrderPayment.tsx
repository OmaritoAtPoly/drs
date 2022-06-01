import React from "react";
import STRINGS from "../../../../utils/strings";
import TitleCard from "../../../cards/TitleCard";
import OrderPanel from "../../order/OrderPanel";

interface Props {
  loadingServices: boolean;
  loadingProducts: boolean;
  editingOrder: boolean;
  services: Schemas.ProfessionalProductData[];
  order: Schemas.AppointmentOrderData;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleAddService: (value: Schemas.ProfessionalProductData) => void;
  handleDeleteService: (service: Schemas.ProfessionalProductData) => void;
  handleEditOrder: (request: Schemas.AppointmentOrderRequest) => void;
  handleCreateNewService: () => void;
}

export default function OrderPayment({
  loadingServices,
  loadingProducts,
  editingOrder,
  services,
  order,
  onDebounceSearch,
  handleAddService,
  handleDeleteService,
  handleEditOrder,
  handleCreateNewService,
}: Props) {
  return (
    <TitleCard title={STRINGS.newConsult.PAYMENTS} onClick={() => {}}>
      <OrderPanel
        loadingServices={loadingServices}
        loadingProducts={loadingProducts}
        editingOrder={editingOrder}
        searchResult={services}
        order={order}
        handleAddItem={handleAddService}
        onDebounceSearch={onDebounceSearch}
        handleDeleteService={handleDeleteService}
        handleEditOrder={handleEditOrder}
        handleCreateNewService={handleCreateNewService}
      />
    </TitleCard>
  );
}
