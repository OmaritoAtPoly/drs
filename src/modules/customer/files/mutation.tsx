/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const sendFilesPDF = (body: Schemas.ResultFileRequest & { code: string }) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/files` as any,
    body,
    method: "POST",
  });

export const useImportFilesMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalFileResponse[],
  TreatedError,
  Schemas.FileRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendFilesPDF,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

export default useImportFilesMutation;

const deleteProfessionalFiles = (body: { code: string; requestCode: string }) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/files/${body.requestCode}` as any,
    body,
    method: "DELETE",
  });

export const useDeleteFilesMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalFileResponse,
  TreatedError,
  Schemas.ProfessionalFileResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteProfessionalFiles,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const downLoadProfessionalFile = ({
  code,
}: Paths.AddConsent.PathParameters & { fileName: string }) =>
  fetchCreator({
    endpoint: `/professional/file/${code}` as any,
    body: {},
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
    method: "GET",
  });

export const useDownLoadProfessionalFileMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Blob,
  TreatedError,
  Paths.AddConsent.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    downLoadProfessionalFile,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};
