import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const updateCustomerNotes = (
  body: Paths.UpdateCustomerNotes.RequestBody &
    Paths.UpdateCustomerNotes.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/notes` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerNotesMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerData,
  TreatedError,
  Paths.UpdateCustomerNotes.RequestBody &
    Paths.UpdateCustomerNotes.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerNotes,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
