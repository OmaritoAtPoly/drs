import { useMutation } from "react-query";
import { UseMutationArgs } from "../../../apiTypes";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";

const updateCustomerMedications = (
  body: Paths.UpdateCustomerMedications.RequestBody &
    Paths.UpdateCustomerMedications.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/medications` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerMedicationsMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerMedicationData[],
  TreatedError,
  Paths.UpdateCustomerMedications.RequestBody &
    Paths.UpdateCustomerMedications.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerMedications,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const updateFamilyPathologies = (
  body: Paths.UpdateFamilyPathologies.RequestBody &
    Paths.UpdateFamilyPathologies.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-family-pathologies` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateFamilyPathologiesMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerFamilyPathologiesData,
  TreatedError,
  Paths.UpdateFamilyPathologies.RequestBody &
    Paths.UpdateFamilyPathologies.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateFamilyPathologies,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const updateCustomerPathologies = (
  body: Paths.UpdateCustomerPathologies.RequestBody &
    Paths.UpdateCustomerPathologies.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-pathologies` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerPathologiesMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerPathologyData,
  TreatedError,
  Paths.UpdateCustomerPathologies.RequestBody &
    Paths.UpdateCustomerPathologies.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerPathologies,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const updateCustomerSurgical = (
  body: Paths.UpdateCustomerSurgical.RequestBody &
    Paths.UpdateCustomerSurgical.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-surgical` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerSurgicalMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerSurgicalData,
  TreatedError,
  Paths.UpdateCustomerSurgical.RequestBody &
    Paths.UpdateCustomerSurgical.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerSurgical,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const updateCustomerHabits = (
  body: Paths.UpdateCustomerHabits.RequestBody &
    Paths.UpdateCustomerHabits.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-habits` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerHabitsMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerHabitData,
  TreatedError,
  Paths.UpdateCustomerHabits.RequestBody &
    Paths.UpdateCustomerHabits.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerHabits,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const updateCustomerBackgroundPsychiatric = (
  body: Paths.UpdatePsychiatric.RequestBody &
    Paths.UpdatePsychiatric.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-psychiatric` as any,
    body,
    method: "PUT",
  });

export const useUpdateCustomerBackgroundPsychiatricMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerPsychiatricData,
  TreatedError,
  Paths.UpdatePsychiatric.RequestBody & Paths.UpdatePsychiatric.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerBackgroundPsychiatric,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};

const updateCustomerBackgroundGynecology = (
  body: Paths.UpdateGynecology.RequestBody &
    Paths.UpdateGynecology.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/background-gynecology` as any,
    body,
    method: "PUT",
  });

export const useUpdateCustomerBackgroundGynecologyMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerGynecologyData,
  TreatedError,
  Paths.UpdateGynecology.RequestBody & Paths.UpdateGynecology.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerBackgroundGynecology,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};
