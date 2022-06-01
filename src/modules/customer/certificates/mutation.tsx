/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const createCertificate = (
  body: Schemas.CertificateRequest &
    Paths.AddCertificate.PathParameters & { appointmentId: string },
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/certificates${
      body.appointmentId ? `?appointment=${body.appointmentId}` : ""
    }` as any,
    body,
    method: "PUT",
  });

export const useCreateCertificateMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CertificateResponse,
  TreatedError,
  Schemas.CertificateResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createCertificate,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editCertificate = (
  body: Schemas.CertificateRequest &
    Paths.EditCustomerCertificate.PathParameters &
    Paths.EditCustomerCertificate.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/certificates/${
      body.requestCode
    }${body.appointment ? `?appointment=${body.appointment}` : ""}` as any,
    body,
    method: "POST",
  });

export const useEditCertificateMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CertificateResponse,
  TreatedError,
  Schemas.CertificateResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editCertificate,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteCertificate = (
  body: Paths.DeleteCustomerCertificate.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/certificates/${body.requestCode}` as any,
    body,
    method: "DELETE",
  });

export const useDeleteCertificateMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CertificateResponse,
  TreatedError,
  Schemas.CertificateResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteCertificate,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchCertificatesPdf = ({
  code,
  requestCode,
}: Paths.CertificatePdf.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/certificates/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useCustomerCertificatesPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.CertificatePdf.PathParameters
  >(fetchCertificatesPdf, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const sendCertificateByEmail = (
  body: Paths.CertificatePdf.PathParameters &
    Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/certificates/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendCertificateByEmailMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CertificateResponse,
  TreatedError,
  Schemas.CertificateResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendCertificateByEmail,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
