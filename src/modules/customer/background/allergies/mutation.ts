import { useMutation } from "react-query";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";
import TreatedError from "../../../utils/error/TreatedError";
import { UseMutationArgs } from "../../../apiTypes";
import { useShowError } from "../../../utils/error/useShowError";

const updatePatientAllergies = (
  body: Paths.UpdateAllergies.RequestBody & Paths.GetCustomerBackground.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-allergies` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerAllergiesMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerAllergies[],
  TreatedError,
  Paths.UpdateAllergies.RequestBody &
  Paths.GetCustomerBackground.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updatePatientAllergies,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};
