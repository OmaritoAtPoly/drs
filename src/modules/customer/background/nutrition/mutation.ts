import { useMutation } from "react-query";
import { UseMutationArgs } from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";

const updateCustomerNutrition = (
  body: Paths.SaveNutrition.RequestBody & Paths.SaveNutrition.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/nutrition` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerNutrition = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerNutritionData,
  TreatedError,
  Paths.SaveNutrition.RequestBody & Paths.SaveNutrition.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerNutrition,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
