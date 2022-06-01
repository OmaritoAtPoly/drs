/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import { useGetCacheOrStorageTokenQuery } from "../auth/query";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const operationData = () =>
  fetchCreator({
    endpoint: "/user/operation-data",
    body: {},
    method: "GET",
    headers: {},
  });

export const useOperationData = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.OperationData, TreatedError>) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.OperationData,
    TreatedError
  >([ReactQueryKeys["operation-data-key"]], operationData as any, {
    ...argsQuery,
    retry: false,
    enabled: !!token,
  });
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};

const appointmentOperationData = () =>
  fetchCreator({
    endpoint: "/user/appointment-operation-data",
    body: {},
    method: "GET",
    headers: {},
  });

export const useAppointmentOperationData = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AppointmentOperationData, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AppointmentOperationData,
    TreatedError
  >(
    [ReactQueryKeys["appointment-operation-data-key"]],
    appointmentOperationData as any,
    {
      ...argsQuery,
      retry: false,
    },
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchSpecialties = ({
  filter,
  page,
  pageSize,
  profession,
}: Paths.FindSpecialties.QueryParameters) =>
  fetchCreator({
    endpoint: `/user/specialties?page=${page}&pageSize=${pageSize}${
      filter ? `&filter=${filter}` : ""
    }${profession ? `&profession=${profession}` : ""}` as any,
    body: {},
    method: "GET",
    headers: {},
  });

export const useSpecialtiesDataQuery = ({
  showError,
  filter,
  page,
  pageSize,
  profession,
  ...argsQuery
}: UseQueryArgs<Schemas.SpecialtyResponse[], TreatedError> &
  Paths.FindSpecialties.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.SpecialtyResponse[],
    TreatedError
  >(
    [
      ReactQueryKeys["specialty-data-key"],
      { filter, page, pageSize, profession },
    ],
    () => fetchSpecialties({ filter, page, pageSize, profession }) as any,
    {
      ...argsQuery,
      retry: false,
    },
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
