/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const createCustomer = (body: Paths.CreateCustomer.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/customers",
    body: { ...body, forCustomer: true } as any,
    method: "POST",
  });

export const useCreateUserMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  keyof Pick<Paths.CreateCustomer.Responses.$201, "data">,
  TreatedError,
  Paths.CreateCustomer.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createCustomer,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const editCustomer = (
  body:
    | (Paths.UpdateCustomer.RequestBody & { oldLegalID?: string })
    | (Paths.UpdateCustomer.RequestBody & { oldLegalID?: string }),
) =>
  fetchCreator({
    endpoint: `/professional/customers/${
      body.oldLegalID || body.legalID
    }` as any,
    body: { ...body, forCustomer: true } as any,
    method: "PUT",
    headers: {},
  });

export const useEditCustomerMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Schemas.CustomerData,
  TreatedError,
  Schemas.CustomerData & { oldLegalID?: string },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editCustomer,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const editHealthCustomer = (
  body: Schemas.CustomerHealthRequest & { legalID: string },
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.legalID}/health` as any,
    body,
    method: "POST",
    headers: {},
  });

export const useEditHealthCustomerMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<Schemas.CustomerData, TreatedError, void, unknown>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editHealthCustomer,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const downLoadExcelTemplate = ({
  index,
}: Paths.CustomersTemplate.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers-template/${index}` as any,
    body: {},
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
    method: "GET",
  });

export const useDownLoadExcelTemplateMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Blob,
  TreatedError,
  Paths.CustomersTemplate.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    downLoadExcelTemplate,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const importCustomer = (body: Paths.ImportCustomers.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/customers/import",
    body,
    method: "POST",
  });

export const useImportCustomerMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Schemas.ImportResult[],
  TreatedError,
  Paths.ImportCustomers.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    importCustomer,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const updateCustomerAvatar = (
  body: Paths.SetAvatar.PathParameters & Paths.SetAvatar.RequestBody,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${body.code}/avatar` as any,
    body,
    method: "POST",
  });

export const useUpdateCustomerAvatarMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalCustomerData,
  TreatedError,
  Paths.SetAvatar.PathParameters & Paths.SetAvatar.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCustomerAvatar,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteCustomer = ({ code }: Paths.DeleteCustomer.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}` as any,
    body: {},
    method: "DELETE",
  });

export const useDeleteCustomerMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  keyof Pick<Paths.DeleteCustomer.Responses.$200, "data">,
  TreatedError,
  Paths.DeleteCustomer.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteCustomer,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};
