import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const createNewRecipe = (
  body: Paths.AddCustomerPrescription.RequestBody &
    Paths.AddCustomerPrescription.PathParameters &
    Paths.AddCustomerPrescription.QueryParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/prescriptions?appointment=${body.appointment}` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useNewRecipeMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PrescriptionResponse,
  TreatedError,
  Paths.AddCustomerPrescription.RequestBody &
    Paths.AddCustomerPrescription.PathParameters &
    Paths.AddCustomerPrescription.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createNewRecipe,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deletePrescriptionsHistory = ({
  code,
  requestCode,
}: Paths.DeleteCustomerPrescription.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/prescriptions/${requestCode}` as any,
    body: {},
    method: "DELETE",
    headers: {},
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeletePrescriptionsHistoryMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PrescriptionResponse,
  TreatedError,
  Paths.DeleteCustomerPrescription.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deletePrescriptionsHistory,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data };
};

const editCustomerPrescription = (
  body: Paths.EditCustomerPrescription.RequestBody &
    Paths.EditCustomerPrescription.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/prescriptions/${body.requestCode}` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditCustomerPrescriptionMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PrescriptionResponse,
  TreatedError,
  Paths.EditCustomerPrescription.RequestBody &
    Paths.EditCustomerPrescription.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editCustomerPrescription,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
