/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { RequestType } from "../../../utils/enums";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

type DeleteResult = {
  code: string;
  resultCode: string;
};

const createResult = (
  body: Paths.AddResult.PathParameters & Paths.AddResult.RequestBody,
) => {
  let lastPart = "";
  switch (body.requestType) {
    case "image":
      lastPart = "images/add-result";
      break;
    case "laboratory":
      lastPart = "laboratories/add-result";
      break;
    case "other":
      lastPart = "other-requests/add-result";
      break;

    default:
      lastPart = "add-result";
      break;
  }
  return fetchCreator({
    endpoint: `/professional/customers/${body.code}/${lastPart}` as any,
    body,
    method: "POST",
  });
};

export const useCreateResultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  | Schemas.ImageResultItem
  | Schemas.LaboratoryResultItem
  | Schemas.OtherResultItem,
  TreatedError,
  Paths.AddResult.PathParameters & Paths.AddResult.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createResult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
const exportResultPdf = ({
  code,
  resultCode,
}: Paths.ResultPdf.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/results/${resultCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
    isBlob: true,
  });

export const useExportResultPdfMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Blob,
  TreatedError,
  Paths.ResultPdf.PathParameters & Paths.ResultPdf.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    exportResultPdf,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const sendResultByEmail = (
  body: Paths.ResultPdf.PathParameters & Schemas.CustomerAvailabilityRequest,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/results/${body.resultCode}/send` as any,
    body,
    method: "POST",
  });

export const useSendResultByEmailMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ResultItem,
  TreatedError,
  Paths.ResultPdf.PathParameters & Schemas.CustomerAvailabilityRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendResultByEmail,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchInformResult = ({ endpoint }: { endpoint: string }) =>
  fetchCreator({
    endpoint: endpoint as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
    isBlob: true,
  });

export const useFetchInformResultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    { endpoint: string }
  >(fetchInformResult, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const deleteResult = ({ code, resultCode }: DeleteResult) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/results/${resultCode}` as any,
    body: {},
    method: "DELETE",
  });

export const useDeleteResultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ResultItem,
  TreatedError,
  DeleteResult,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteResult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editResult = (
  body: {
    code: string;
    requestType?: RequestType;
    requestCode: string;
    itemCode: string;
  } & Omit<Schemas.ResultFileRequest, "requestType">,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/results/${body.itemCode}` as any,
    body,
    method: "POST",
  });

export const useEditResultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  | Schemas.ImageResultItem
  | Schemas.LaboratoryResultItem
  | Schemas.OtherResultItem,
  TreatedError,
  {
    code: string;
    requestType?: RequestType;
    requestCode: string;
    itemCode: string;
  } & Schemas.ResultFileRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editResult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchResultFile = ({ code }: Paths.GetFile.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/result/${code}` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
    isBlob: true,
  });

export const useFetchResultFileMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.GetFile.PathParameters
  >(fetchResultFile, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const createFileResult = (
  body: Paths.AddResult.PathParameters &
    Paths.AddResult.RequestBody & { itemCode?: string; requestCode?: string },
) => {
  let lastPart = "";
  switch (body.requestType) {
    case "image":
      lastPart = `images/${body.requestCode}/results/${body.itemCode}`;
      break;
    case "laboratory":
      lastPart = `laboratories/${body.requestCode}/results/${body.itemCode}`;
      break;
    case "other":
      lastPart = `other-requests/${body.requestCode}/results/${body.itemCode}`;
      break;
    default:
      lastPart = "add-result";
      break;
  }
  return fetchCreator({
    endpoint: `/professional/customers/${body.code}/${lastPart}` as any,
    body,
    method: "POST",
  });
};

export const useCreateFileResultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  | Schemas.ImageResultItem
  | Schemas.LaboratoryResultItem
  | Schemas.OtherResultItem,
  TreatedError,
  Paths.AddResult.PathParameters &
    Paths.AddResult.RequestBody & { itemCode: string; requestCode: string },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createFileResult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
