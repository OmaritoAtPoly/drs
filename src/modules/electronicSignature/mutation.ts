import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const uploadElectronicSignature = (body: Schemas.FilePasswordRequest) =>
  fetchCreator({
    endpoint: "/professional/electronic-sign",
    body,
    method: "POST",
  });

const useUploadElectronicSignatureMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalData,
  TreatedError,
  Schemas.ProfessionalData,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    uploadElectronicSignature,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

export default useUploadElectronicSignatureMutation;
