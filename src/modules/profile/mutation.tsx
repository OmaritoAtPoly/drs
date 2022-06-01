/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const searchProfessional = (body: Paths.SearchProfessionals.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/search-professionals",
    body,
    method: "POST",
  });

export const useSearchProfessionalMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PageResponseProfessionalData,
  TreatedError,
  Paths.SearchProfessionals.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    searchProfessional,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const digitalSignProfessional = (body: { base64: string; name: string }) =>
  fetchCreator({
    endpoint: "/professional/digital-sign",
    body,
    method: "POST",
  });

export const useDigitalProfessionalSignMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalData,
  TreatedError,
  { base64: string; name: string },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    digitalSignProfessional,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const updateProfessional = (body: Schemas.ProfessionalRequest) =>
  fetchCreator({
    endpoint: "/professional/me",
    body,
    method: "PUT",
  });

export const useUpdateProfessionalMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionResponse,
  TreatedError,
  Schemas.ProfessionResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateProfessional,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const professionalLogoFetch = (body: { base64: string; name: string }) =>
  fetchCreator({
    endpoint: "/professional/logo",
    body,
    method: "POST",
  });

export const useUpdateProfessionalLogoMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalData,
  TreatedError,
  { base64: string; name: string },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    professionalLogoFetch,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const updateCurrentHealthCenter = (body: { code: string }) =>
  fetchCreator({
    endpoint: "/professional/current-health-center",
    body,
    method: "POST",
  });

export const useUpdateCurrentHealthCenterMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.PageResponseProfessionalData,
  TreatedError,
  { code: string },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateCurrentHealthCenter,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
