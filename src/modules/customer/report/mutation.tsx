/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const createReport = (
  body: Schemas.ReportRequest & Paths.AddProfessionalReport.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/reports` as any,
    body,
    method: "PUT",
  });

export const useCreateReportMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ReportResponse,
  TreatedError,
  Schemas.ReportResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createReport,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editReport = (
  body: Schemas.ReportRequest & Paths.EditProfessionalReport.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/reports/${body.requestCode}` as any,
    body,
    method: "POST",
  });

export const useEditReportMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ReportResponse,
  TreatedError,
  Schemas.ReportResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editReport,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteReport = (body: Paths.DeleteProfessionalReport.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/reports/${body.requestCode}` as any,
    body,
    method: "DELETE",
  });

export const useDeleteReportMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ReportResponse,
  TreatedError,
  Schemas.ReportResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteReport,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchReportPdf = ({
  code,
  requestCode,
}: Paths.ReportPdf.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/reports/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useCustomerReportPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.ReportPdf.PathParameters
  >(fetchReportPdf, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const sendReportByEmail = (
  body: Paths.ReportPdf.PathParameters & Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/reports/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendReportByEmailMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ReportResponse,
  TreatedError,
  Schemas.ReportResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendReportByEmail,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
