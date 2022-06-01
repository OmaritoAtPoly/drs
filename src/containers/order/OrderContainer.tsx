import React, { useCallback, useState } from "react";
import CustomerOrder from "../../components/domains/order/customer/CustomerOrder";
import NewEditCustomerOrderDialog from "../../components/domains/order/customer/NewEditCustomerOrder";
import NewEditServiceDialog from "../../components/domains/services/NewEditServiceDialog";
import useCustomerOrderCacheSelector from "../../modules/order/customerOrderCacheSelector";
import {
  useAddProductToCustomerOrderMutation,
  useCreateCustomerOrderMutation,
  useDeleteOrderMutation,
  useDeleteProductFromCustomerOrderMutation,
  useEditCustomerOrderMutation,
  useInvoiceOrderMutation,
} from "../../modules/order/mutation";
import { useCreateServiceMutation } from "../../modules/service/mutation";
import { useServiceCacheSelector } from "../../modules/service/serviceCacheSelector";
import {
  defaultOrderData,
  defaultServiceRequest,
} from "../../utils/defaultData";
import { fullName } from "../../utils/user";
import SaveOrderPaymentContainer from "./customer/SaveOrderPaymentContainer";

export default function OrderContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState<boolean>(false);

  const [openServiceDialog, setOpenServiceDialog] = useState<boolean>(false);
  const [order, setOrder] = useState<Schemas.AppointmentOrderData>();
  const {
    customerId,
    items: orders,
    loading: loadingOrders,
    canFetchMore,
    orderState: state,
    from,
    to,
    paymentMethod,
    setFrom,
    setTo,
    setCustomerId,
    setCustomerName,
    setOrderState,
    setPaymentMethod,
    refetch,
    fetchMore,
  } = useCustomerOrderCacheSelector();

  const {
    loading: loadingServices,
    items: services,
    invalidateQuery,
    handleOnFilterChange,
  } = useServiceCacheSelector();

  const onSuccessDeleteOrder = useCallback(() => {
    refetch();
  }, [refetch]);

  const {
    mutate: deleteOrderMutate,
    loading: deleteOrder,
  } = useDeleteOrderMutation({
    showError: true,
    onSuccess: onSuccessDeleteOrder,
  });

  const handleShowDialogShow = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleOnCreateOrderSuccess = useCallback(
    (data: Schemas.AppointmentOrderData) => {
      setOrder(data);
      handleShowDialogShow();
    },
    [handleShowDialogShow],
  );

  const onModifyOrderSuccess = useCallback(
    (data: Schemas.AppointmentOrderData) => {
      setOrder(data);
      refetch();
    },
    [refetch],
  );

  const {
    loading: creatingOrder,
    mutate: createCustomerOrderMutate,
  } = useCreateCustomerOrderMutation({
    showError: true,
    onSuccess: handleOnCreateOrderSuccess,
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading: addingProduct,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: addProductMutate,
  } = useAddProductToCustomerOrderMutation({
    showError: true,
    onSuccess: onModifyOrderSuccess,
  });

  const {
    loading: deletingProduct,
    mutate: deleteProductMutate,
  } = useDeleteProductFromCustomerOrderMutation({
    showError: true,
    onSuccess: onModifyOrderSuccess,
  });

  const {
    loading: editingOrder,
    mutate: editOrderMutate,
  } = useEditCustomerOrderMutation({
    showError: true,
    onSuccess: onModifyOrderSuccess,
  });

  const {
    mutate: invoiceOrderMutate,
    loading: invoicingOrder,
  } = useInvoiceOrderMutation({
    showError: true,
    onSuccess: onModifyOrderSuccess,
  });

  const handleCreateCustomerOrder = useCallback(() => {
    customerId &&
      createCustomerOrderMutate({
        code: customerId,
      });
  }, [createCustomerOrderMutate, customerId]);

  const handleOnCustomerSelected = useCallback(
    (customer: Schemas.CustomerData) => {
      if (customer && customer.legalID) {
        setCustomerId(customer.legalID);
        setCustomerName(fullName(customer));
      } else {
        setCustomerId(undefined);
      }
    },
    [setCustomerId, setCustomerName],
  );

  const handleAddProductToAnOrder = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (value: Schemas.ProfessionalProductData) => {
      customerId &&
        order &&
        addProductMutate({
          customerCode: customerId || "",
          orderCode: order?.code || "",
          basePrice: value.basePrice,
          code: value.code,
          description: value.description,
          enabled: value.enabled,
          name: value.name,
          productType: value.productType,
          taxPercent: value.taxPercent,
        });
    },
    [addProductMutate, customerId, order],
  );

  const handleOnDeleteProduct = useCallback(
    (service: Schemas.ProfessionalProductData) => {
      customerId &&
        order &&
        deleteProductMutate({
          customerCode: customerId || "",
          orderCode: order.code || "",
          code: service.code || "",
        });
    },
    [customerId, deleteProductMutate, order],
  );

  const handleOnEditOrder = useCallback(
    (request: Schemas.AppointmentOrderRequest) => {
      customerId &&
        order &&
        editOrderMutate({
          code: customerId,
          orderCode: order.code || "",
          discount: request.discount,
        });
    },
    [customerId, editOrderMutate, order],
  );

  const handleOnOpenServiceDialog = useCallback(() => {
    setOpenServiceDialog(!openServiceDialog);
  }, [openServiceDialog]);

  const onAddServiceSuccess = useCallback(() => {
    invalidateQuery();
    setOpenServiceDialog(false);
  }, [invalidateQuery]);

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

  const handleEditOrder = useCallback(
    (orderData: Schemas.AppointmentOrderData, customerCode: string) => {
      setOrder(orderData);
      setCustomerId(customerCode);
      handleShowDialogShow();
    },
    [handleShowDialogShow, setCustomerId],
  );

  const handleDeleteOrder = useCallback(
    (orderCode: string, customerCode: string) => {
      deleteOrderMutate({
        code: customerCode,
        orderCode,
      });
    },
    [deleteOrderMutate],
  );
  const handleOnOpenPaymentDialog = useCallback(() => {
    setOpenPaymentDialog(!openPaymentDialog);
  }, [openPaymentDialog]);

  const handleOnSavePaymentDialog = useCallback(
    (orderData: Schemas.AppointmentOrderData, customerCode: string) => {
      setOrder(orderData);
      setCustomerId(customerCode);
      handleOnOpenPaymentDialog();
    },
    [handleOnOpenPaymentDialog, setCustomerId],
  );

  const handleInvoiceOrder = useCallback(
    (orderCode: string) => {
      invoiceOrderMutate({
        orderCode,
      });
    },
    [invoiceOrderMutate],
  );

  return (
    <>
      <CustomerOrder
        loadingOrders={loadingOrders}
        orders={orders}
        disabledAction={creatingOrder || !customerId}
        hasNextPage={!!canFetchMore}
        state={state || ""}
        from={from || ""}
        to={to || ""}
        paymentMethod={paymentMethod || ""}
        setPaymentMethod={setPaymentMethod}
        setFrom={setFrom}
        setTo={setTo}
        setOrderState={setOrderState}
        handleOnCustomerSelected={handleOnCustomerSelected}
        handleCreateOrder={handleCreateCustomerOrder}
        handleEditOrder={handleEditOrder}
        handleDeleteOrder={handleDeleteOrder}
        deleteOrder={deleteOrder}
        handleSavePaymentOrder={handleOnSavePaymentDialog}
        handleInvoiceOrder={handleInvoiceOrder}
        fetchMore={fetchMore}
      />
      <NewEditCustomerOrderDialog
        open={open}
        addingProduct={addingProduct}
        loadingServices={loadingServices || deletingProduct || invoicingOrder}
        editingOrder={editingOrder}
        order={order || defaultOrderData}
        products={services}
        onDebounceSearch={handleOnFilterChange}
        handleShow={handleShowDialogShow}
        handleAddProductToOrder={handleAddProductToAnOrder}
        handleCreateNewService={handleOnOpenServiceDialog}
        handleDeleteService={handleOnDeleteProduct}
        handleEditOrder={handleOnEditOrder}
      />
      <NewEditServiceDialog
        open={openServiceDialog}
        creatingService={creatingService}
        initialValues={defaultServiceRequest}
        handleOnAddService={handleOnAddService}
        handleShow={handleOnOpenServiceDialog}
      />
      <SaveOrderPaymentContainer
        open={openPaymentDialog}
        handleShow={handleOnOpenPaymentDialog}
        order={order}
        refetch={refetch}
        customerId={customerId || ""}
      />
    </>
  );
}
