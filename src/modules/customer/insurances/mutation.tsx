/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const downloadInsuranceTemplate = ({
  code,
}: Paths.InsuranceTemplate.PathParameters & { name: string }) =>
  fetchCreator({
    endpoint: `/professional/insurance-template/${code}` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
  });

export const useDownLoadInsuranceMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Blob,
  TreatedError,
  Paths.InsuranceTemplate.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    downloadInsuranceTemplate,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};
