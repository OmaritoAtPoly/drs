/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const createNewProcedure = (
  body: Paths.AddCustomerProcedure.RequestBody &
    Paths.AddCustomerProcedure.PathParameters &
    Paths.AddCustomerProcedure.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/procedures?appointment=${body.appointment}` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useCreateProcedureMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProcedureResponse,
  TreatedError,
  Paths.AddCustomerProcedure.RequestBody &
    Paths.AddCustomerProcedure.PathParameters &
    Paths.AddCustomerProcedure.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createNewProcedure,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editProcedure = (
  body: Schemas.ProcedureRequest & Paths.EditCustomerProcedure.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/procedures/${body.requestCode}` as any,
    body,
    method: "POST",
  });

export const useEditProcedureMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProcedureResponse,
  TreatedError,
  Schemas.ProcedureResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editProcedure,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchProcedurePdf = ({
  code,
  requestCode,
}: Paths.ProcedurePdf.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/procedures/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useCustomerProcedurePdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.ProcedurePdf.PathParameters
  >(fetchProcedurePdf, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const sendProcedureByEmail = (
  body: Paths.ProcedurePdf.PathParameters & Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/procedures/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendProcedureByEmailMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProcedureResponse,
  TreatedError,
  Schemas.ProcedureResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendProcedureByEmail,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteProcedure = ({
  code,
  requestCode,
}: {
  code: string;
  requestCode: string;
}) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/procedures/${requestCode}` as any,
    body: {},
    method: "DELETE",
  });

export const useDeleteProcedureMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProcedureResponse,
  TreatedError,
  Schemas.ProcedureResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteProcedure,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
