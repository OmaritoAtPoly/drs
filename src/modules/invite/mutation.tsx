import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const inviteProfessionals = (body: Schemas.EmailsNameRequest) =>
  fetchCreator({
    endpoint: "/professional/invite-professionals",
    body,
    method: "POST",
  });

const useInviteProfessionalsMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.EmailsNameRequest,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    inviteProfessionals,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

export default useInviteProfessionalsMutation;
