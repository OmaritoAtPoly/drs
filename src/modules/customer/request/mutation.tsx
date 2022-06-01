import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const addCustomerImageRequest = (
  body: Paths.AddCustomerImageRequest.RequestBody &
    Paths.AddCustomerImageRequest.QueryParameters &
    Paths.AddCustomerImageRequest.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/images?appointment=${body.appointment}` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAddCustomerImageRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ImageRequestResponse,
  TreatedError,
  Paths.AddCustomerImageRequest.RequestBody &
    Paths.AddCustomerImageRequest.QueryParameters &
    Paths.AddCustomerImageRequest.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addCustomerImageRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const addCustomerLabRequest = (
  body: Paths.AddCustomerLabRequest.RequestBody &
    Paths.AddCustomerLabRequest.QueryParameters &
    Paths.AddCustomerLabRequest.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/laboratories?appointment=${body.appointment}` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAddCustomerLabRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.LaboratoryRequestResponse,
  TreatedError,
  Paths.AddCustomerLabRequest.RequestBody &
    Paths.AddCustomerLabRequest.QueryParameters &
    Paths.AddCustomerLabRequest.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addCustomerLabRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editCustomerLabRequest = (
  body: Paths.EditCustomerLabRequest.PathParameters &
    Paths.EditCustomerLabRequest.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/laboratories/${body.requestCode}` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditCustomerLabRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.LaboratoryRequestResponse,
  TreatedError,
  Paths.EditCustomerLabRequest.PathParameters &
    Paths.EditCustomerLabRequest.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editCustomerLabRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editCustomerImageRequest = (
  body: Paths.EditCustomerImageRequest.PathParameters &
    Paths.EditCustomerImageRequest.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/images/${body.requestCode}` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditCustomerImageRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ImageRequestResponse,
  TreatedError,
  Paths.EditCustomerImageRequest.PathParameters &
    Paths.EditCustomerImageRequest.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editCustomerImageRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const addCustomerOtherRequest = (
  body: Paths.AddCustomerOtherRequest.RequestBody &
    Paths.AddCustomerOtherRequest.QueryParameters &
    Paths.AddCustomerOtherRequest.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/other-requests?appointment=${body.appointment}` as any,
    body,
    method: "PUT",
  });

export const useAddCustomerOtherRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.OtherRequestResponse,
  TreatedError,
  Paths.AddCustomerOtherRequest.RequestBody &
    Paths.AddCustomerOtherRequest.QueryParameters &
    Paths.AddCustomerOtherRequest.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addCustomerOtherRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editCustomerOtherRequest = (
  body: Paths.EditCustomerOtherRequest.PathParameters &
    Paths.EditCustomerOtherRequest.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/other-requests/${body.requestCode}` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditCustomerOtherRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.OtherRequestResponse,
  TreatedError,
  Paths.EditCustomerOtherRequest.PathParameters &
    Paths.EditCustomerOtherRequest.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editCustomerOtherRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const sendRequestMessage = (
  body: Paths.SendCustomerOther.PathParameters &
    Paths.SendCustomerOther.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/other-requests/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.OtherRequestResponse,
  TreatedError,
  Paths.SendCustomerOther.PathParameters & Paths.SendCustomerOther.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendRequestMessage,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const exportPdf = ({
  code,
  requestCode,
  healthCenterCode,
}: Paths.OtherPdf.PathParameters & Paths.OtherPdf.QueryParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/other-requests/${requestCode}/pdf?healthCenterCode=${healthCenterCode}` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useExportOtherRequestPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Blob,
  TreatedError,
  Paths.OtherPdf.PathParameters & Paths.OtherPdf.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    exportPdf,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteOtherRequestItem = ({
  code,
  requestCode,
}: Paths.DeleteCustomerOtherRequest.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/other-requests/${requestCode}` as any,
    body: {},
    method: "DELETE",
    headers: {},
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteOtherRequestItemMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.OtherRequestResponse,
  TreatedError,
  Paths.DeleteCustomerOtherRequest.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteOtherRequestItem,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data };
};
