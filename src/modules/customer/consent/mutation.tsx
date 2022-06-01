/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const sendConsentPDF = (body: Schemas.ResultFileRequest & { code: string }) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/informed-consents` as any,
    body,
    method: "POST",
  });

export const useImportConsentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InformedConsentResponse[],
  TreatedError,
  Schemas.FileRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendConsentPDF,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

export default useImportConsentMutation;

const deleteConsent = (body: { code: string; requestCode: string }) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/informed-consents/${body.requestCode}` as any,
    body,
    method: "DELETE",
  });

export const useDeleteConsentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InformedConsentResponse,
  TreatedError,
  Schemas.InformedConsentResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteConsent,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const downLoadConsentFile = ({ code }: { fileName: string; code: string }) =>
  fetchCreator({
    endpoint: `/professional/informed-consent/${code}` as any,
    body: {},
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
    method: "GET",
  });

export const useDownLoadConsentFileMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Blob,
  TreatedError,
  Paths.AddConsent.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    downLoadConsentFile,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};
