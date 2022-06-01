/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryCache, QueryKey, useQuery } from "react-query";
import {
  ReactQueryKeys,
  ReactQueryStaleTime,
  UseQueryArgs,
} from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";

const fetchImageRequests = (
  _key: QueryKey,
  {
    page,
    pageSize,
    code,
    appointment,
  }: Paths.GetCustomerImages.PathParameters &
    Paths.GetImages.QueryParameters & { appointment?: string },
) =>
  fetchCreator({
    endpoint: `/professional/${appointment ? "appointment" : "customers"}/${
      appointment || code
    }/images?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const useImageRequestQuery = ({
  showError,
  page,
  pageSize,
  code,
  appointment,
  ...argsQuery
}: UseQueryArgs<Schemas.ImageRequestResponse[], TreatedError> &
  Paths.GetCustomerImages.PathParameters &
  Paths.GetImages.QueryParameters & { appointment?: string }) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ImageRequestResponse[],
    TreatedError
  >(
    [
      ReactQueryKeys["customer-image-request-key"],
      { code, page, pageSize, appointment },
    ],
    fetchImageRequests,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCustomerLastImageRequestQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.ImageRequestResponse, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ImageRequestResponse,
    TreatedError
  >(
    [ReactQueryKeys["customer-last-image-request-key"]],
    () =>
      queryCache.getQueryData<any>([
        ReactQueryKeys["customer-last-image-request-key"],
      ]),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchLabRequests = (
  _key: QueryKey,
  {
    page,
    pageSize,
    code,
    appointment,
  }: Paths.GetCustomerLabs.PathParameters &
    Paths.GetCustomerLabs.QueryParameters & { appointment?: string },
) =>
  fetchCreator({
    endpoint: `/professional/${appointment ? "appointment" : "customers"}/${
      appointment || code
    }/laboratories?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useLaboratoryRequestQuery = ({
  showError,
  page,
  pageSize,
  appointment,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.LaboratoryRequestResponse[], TreatedError> &
  Paths.GetCustomerLabs.PathParameters &
  Paths.GetCustomerLabs.QueryParameters & { appointment?: string }) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.LaboratoryRequestResponse[],
    TreatedError
  >(
    [
      ReactQueryKeys["customer-lab-request-key"],
      { code, page, pageSize, appointment },
    ],
    fetchLabRequests,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCustomerLastLaboratoriesRequestQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.LaboratoryRequestResponse, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.LaboratoryRequestResponse,
    TreatedError
  >([ReactQueryKeys["customer-last-lab-request-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchPrescriptions = (
  _key: QueryKey,
  {
    code,
    page,
    pageSize,
    appointment,
  }: Paths.GetCustomerPrescriptions.PathParameters &
    Paths.GetCustomerPrescriptions.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/${appointment ? "appointment" : "customers"}/${
      appointment || code
    }/prescriptions/?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const usePrescriptionsQuery = ({
  appointment,
  code,
  page,
  pageSize,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.PrescriptionResponse[], TreatedError> &
  Paths.GetPrescriptions.PathParameters &
  Paths.GetCustomerPrescriptions.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.PrescriptionResponse[],
    TreatedError
  >(
    [
      ReactQueryKeys["customer-prescriptions-key"],
      { code, page, pageSize, appointment },
    ],
    fetchPrescriptions,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCustomerCurrentPrescriptionQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.PrescriptionResponse, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.PrescriptionResponse,
    TreatedError
  >([ReactQueryKeys["customer-current-prescription-key"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useDefaultHistoryOrderQuery = () => {
  const { data, isLoading: loading } = useQuery<
    { value: string },
    TreatedError
  >(
    [ReactQueryKeys["default-history-order"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["default-history-order"],
      ]) as unknown) as Promise<{ value: string }>,
    {
      staleTime: ReactQueryStaleTime.NEVER,
    },
  );
  return { data, loading };
};
