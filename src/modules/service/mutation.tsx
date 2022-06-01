import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const createService = (body: Paths.CreateProduct.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/products",
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useCreateServiceMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalProductData,
  TreatedError,
  Paths.CreateProduct.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createService,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const editService = (
  body: Paths.EditProduct.RequestBody & Paths.EditProduct.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/products/${body.code}` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useEditServiceMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalProductData,
  TreatedError,
  Paths.EditProduct.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    editService,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteService = ({ code }: Paths.DeleteProduct.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/products/${code}` as any,
    body: {},
    method: "DELETE",
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteServiceMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalProductData,
  TreatedError,
  Paths.DeleteProduct.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteService,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const downloadServiceExcelTemplate = () =>
  fetchCreator({
    endpoint: "/professional/products-template",
    body: {},
    headers: {
      Accept: "application/**",
      "Content-Type": "application/**",
    },
    method: "GET",
  });

export const useDownloadServiceExcelTemplateMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<Blob, TreatedError, unknown>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    downloadServiceExcelTemplate,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};

const importService = (body: Paths.ImportProducts.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/products/import",
    body,
    method: "POST",
  });

export const useImportServiceMutation = ({
  showError,
  ...argsMutation
}: UseMutationArgs<
  Schemas.ImportResult[],
  TreatedError,
  Paths.ImportProducts.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    importService,
    argsMutation,
  );
  useShowError({ showError, error, action: reset });
  return { mutate, loading, data, error, reset };
};
