import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

type AppointmentId = {
  appointmentId: string;
};

type CustomerProductParameter = {
  customerCode: string;
  orderCode: string;
};

const addProductToAppointmentOrder = (
  body: Paths.AddProduct.RequestBody & AppointmentId,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${body.appointmentId}/order/products` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAddProductToAppointmentOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.AddProduct.RequestBody & AppointmentId,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addProductToAppointmentOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteProductFromAppointmentOrder = ({
  code,
  appointmentId,
}: Paths.DeleteProduct.PathParameters & AppointmentId) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${appointmentId}/order/products/${code}` as any,
    body: {},
    method: "DELETE",
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteProductFromAppointmentOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.DeleteProduct.PathParameters & AppointmentId,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteProductFromAppointmentOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editProductFromAppointmentOrder = (
  body: Paths.EditOrder2.PathParameters & Paths.EditOrder2.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/appointment/${body.code}/order` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditAppointmentOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.EditOrder2.PathParameters & Paths.EditOrder2.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editProductFromAppointmentOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const createCustomerOrder = ({ code }: Paths.CreateOrder.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/orders` as any,
    body: {},
    method: "POST",
  });

export const useCreateCustomerOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  Paths.CreateOrder.PathParameters,
  TreatedError,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createCustomerOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const addProductToCustomerOrder = (
  body: Paths.AddProduct.RequestBody & CustomerProductParameter,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.customerCode}/orders/${body.orderCode}/products` as any,
    body,
    method: "POST",
  });

export const useAddProductToCustomerOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.AddProduct.RequestBody & CustomerProductParameter,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addProductToCustomerOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteProductFromCustomerOrder = ({
  code,
  customerCode,
  orderCode,
}: Paths.DeleteProduct.PathParameters & CustomerProductParameter) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${customerCode}/orders/${orderCode}/products/${code}` as any,
    body: {},
    method: "DELETE",
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteProductFromCustomerOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.DeleteProduct.PathParameters & AppointmentId,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteProductFromCustomerOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editProductFromCustomerOrder = (
  body: Paths.EditOrder1.PathParameters & Paths.EditOrder1.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/orders/${body.orderCode}` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditCustomerOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.EditOrder1.PathParameters & Paths.EditOrder1.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editProductFromCustomerOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const registerOrderPayment = (
  body: Paths.PayOrder1.PathParameters & Paths.PayOrder1.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/orders/${body.orderCode}/pay` as any,
    body,
    method: "POST",
  });

export const useRegisterOrderPaymentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.PayOrder1.PathParameters & Paths.PayOrder1.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    registerOrderPayment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteOrder = ({ code, orderCode }: Paths.CancelOrder1.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/orders/${orderCode}` as any,
    body: {},
    method: "DELETE",
  });

export const useDeleteOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.CancelOrder1.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const invoiceOrder = ({ orderCode }: Paths.InvoiceOrder.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/orders/${orderCode}/invoice` as any,
    body: {},
    method: "POST",
  });

export const useInvoiceOrderMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentOrderData,
  TreatedError,
  Paths.InvoiceOrder.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    invoiceOrder,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
