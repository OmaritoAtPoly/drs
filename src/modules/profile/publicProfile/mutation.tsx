import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const updateProfessionalAvatar = (body: { base64: string; name: string }) =>
  fetchCreator({
    endpoint: "/professional/avatar",
    body,
    method: "POST",
  });

export const useUpdateProfessionalAvatarMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalData,
  TreatedError,
  { base64: string; name: string },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateProfessionalAvatar,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

export default useUpdateProfessionalAvatarMutation;
