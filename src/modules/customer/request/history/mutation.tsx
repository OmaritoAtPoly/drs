/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";

const deleteRequestHistoryImage = ({
  code,
  requestCode,
}: Paths.DeleteCustomerImageRequest.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/images/${requestCode}` as any,
    body: {},
    method: "DELETE",
    headers: {},
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteRequestHistoryImageMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ImageRequestResponse,
  TreatedError,
  Paths.DeleteCustomerImageRequest.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteRequestHistoryImage,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data };
};

const fetchImagePdf = ({ code, requestCode }: Paths.ImagePdf.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/images/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useCustomerImagePdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.ImagePdf.PathParameters
  >(fetchImagePdf, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const deleteRequestHistoryLaboratory = ({
  code,
  requestCode,
}: Paths.DeleteCustomerLabRequest.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/laboratories/${requestCode}` as any,
    body: {},
    method: "DELETE",
    headers: {},
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteRequestHistoryLaboratoryMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.LaboratoryRequestResponse,
  TreatedError,
  Paths.DeleteCustomerLabRequest.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteRequestHistoryLaboratory,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data };
};

const fetchLaboratoriesPdf = ({
  code,
  requestCode,
}: Paths.LaboratoriesPdf.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/laboratories/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useCustomerLaboratoriesPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.LaboratoriesPdf.PathParameters
  >(fetchLaboratoriesPdf, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const sendImagesRequest = (
  body: Paths.ImagePdf.PathParameters & Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/images/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendImagesRequestMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ImageRequestResponse,
  TreatedError,
  Schemas.ImageRequestResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendImagesRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const sendLabsRequestPDF = (
  body: Paths.LaboratoriesPdf.PathParameters &
    Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/laboratories/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendLabsRequestPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ImageRequestResponse,
  TreatedError,
  Schemas.ImageRequestResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendLabsRequestPDF,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchPrescriptionsPdf = ({
  code,
  requestCode,
}: Paths.PrescriptionPdf.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/prescriptions/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const usePrescriptionsPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.PrescriptionPdf.PathParameters
  >(fetchPrescriptionsPdf, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const sendPrescriptionsRequest = (
  body: Paths.PrescriptionPdf.PathParameters &
    Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/prescriptions/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendPrescriptionsMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PrescriptionResponse,
  TreatedError,
  Schemas.PrescriptionResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendPrescriptionsRequest,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
