import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import OrderPayment from "../../../components/domains/customer/newConsult/OrderPayment";
import NewEditServiceDialog from "../../../components/domains/services/NewEditServiceDialog";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useAppointmentOrderCacheSelector } from "../../../modules/order/appointmentOrderCacheSelector";
import {
  useAddProductToAppointmentOrderMutation,
  useDeleteProductFromAppointmentOrderMutation,
  useEditAppointmentOrderMutation,
} from "../../../modules/order/mutation";
import { useCreateServiceMutation } from "../../../modules/service/mutation";
import { useServiceCacheSelector } from "../../../modules/service/serviceCacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import {
  defaultOrderData,
  defaultServiceRequest,
} from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

export default function OrderPaymentContainer() {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const {
    loading: loadingProducts,
    data: order,
  } = useAppointmentOrderCacheSelector();

  const {
    loading,
    items: services,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    invalidateQuery,
    handleOnFilterChange,
  } = useServiceCacheSelector();

  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["appointment-order-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.appointment.SAVED_BILLS,
    });
  }, [addLastAlerts]);

  const { mutate: addMutate } = useAddProductToAppointmentOrderMutation({
    showError: true,
    onSuccess,
  });

  const { mutate: deleteMutate } = useDeleteProductFromAppointmentOrderMutation(
    {
      showError: true,
      onSuccess,
    },
  );

  const {
    loading: editingOrder,
    mutate: editOrderMutate,
  } = useEditAppointmentOrderMutation({
    showError: true,
    onSuccess,
  });

  const handleAddService = useCallback(
    (product: Schemas.ProfessionalProductData) => {
      addMutate({
        code: product.code || "",
        basePrice: product.basePrice,
        description: product.description,
        enabled: product.enabled,
        name: product.name,
        productType: product.productType,
        taxPercent: product.taxPercent,
        appointmentId,
      });
    },
    [addMutate, appointmentId],
  );

  const handleDeleteService = useCallback(
    (product: Schemas.ProfessionalProductData) => {
      deleteMutate({ appointmentId, code: product.code || "" });
    },
    [appointmentId, deleteMutate],
  );

  const handleEditOrder = useCallback(
    (request: Schemas.AppointmentOrderRequest) => {
      editOrderMutate({ code: appointmentId, ...request });
    },
    [appointmentId, editOrderMutate],
  );

  const onAddServiceSuccess = useCallback(
    (data: Schemas.ProfessionalProductData) => {
      handleAddService(data);
      invalidateQuery();
      setOpen(false);
    },
    [handleAddService, invalidateQuery],
  );

  const {
    loading: creatingService,
    mutate: createNewServiceMutation,
  } = useCreateServiceMutation({
    showError: true,
    onSuccess: onAddServiceSuccess,
  });

  const handleOnAddService = useCallback(
    (request: Schemas.ProfessionalProductRequest) => {
      createNewServiceMutation({
        ...request,
        basePrice: parseFloat(`${request.basePrice}` || "0"),
      });
    },
    [createNewServiceMutation],
  );

  const handleOnOpenServiceDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <OrderPayment
        loadingServices={loading}
        loadingProducts={loadingProducts}
        editingOrder={editingOrder}
        services={services}
        order={order || defaultOrderData}
        onDebounceSearch={handleOnFilterChange}
        handleAddService={handleAddService}
        handleDeleteService={handleDeleteService}
        handleEditOrder={handleEditOrder}
        handleCreateNewService={handleOnOpenServiceDialog}
      />
      <NewEditServiceDialog
        open={open}
        creatingService={creatingService}
        initialValues={defaultServiceRequest}
        handleOnAddService={handleOnAddService}
        handleShow={handleOnOpenServiceDialog}
      />
    </>
  );
}
