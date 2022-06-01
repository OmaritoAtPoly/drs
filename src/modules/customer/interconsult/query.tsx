import { queryCache, QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchInterConsultation = (
  key: QueryKey,
  {
    code,
    page,
    pageSize,
  }: Paths.GetMyInterConsultations.PathParameters &
    Paths.GetMyInterConsultations.QueryParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/inter-consultations?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const useFetchMyInterConsultationQuery = ({
  showError,
  code,
  page,
  pageSize,
  ...argsQuery
}: UseQueryArgs<Schemas.PageResponseInterConsultationResp, TreatedError> &
  Paths.GetMyInterConsultations.PathParameters &
  Paths.GetMyInterConsultations.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.PageResponseInterConsultationResp,
    TreatedError
  >(
    [ReactQueryKeys["my-inter-consultation"], { code }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => fetchInterConsultation("", { code, page, pageSize }),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchReceivedInterConsultation = (
  key: QueryKey,
  {
    code,
    page,
    pageSize,
  }: Paths.GetMyInterConsultations.PathParameters &
    Paths.GetMyInterConsultations.QueryParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/received-inter-consultations?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const useFetchReceivedInterConsultationQuery = ({
  showError,
  code,
  page,
  pageSize,
  ...argsQuery
}: UseQueryArgs<Schemas.PageResponseInterConsultationResp, TreatedError> &
  Paths.GetMyInterConsultations.PathParameters &
  Paths.GetMyInterConsultations.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.PageResponseInterConsultationResp,
    TreatedError
  >(
    [ReactQueryKeys["my-received-inter-consultation"], { code }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => fetchReceivedInterConsultation("", { code, page, pageSize }),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCurrentInterconsultationToEditQuery = () => {
  const { data, isLoading: loading } = useQuery<
    Schemas.InterConsultationResp,
    TreatedError
  >(
    [ReactQueryKeys["current-interconsultation-to-edit"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-interconsultation-to-edit"],
      ]) as unknown) as Promise<Schemas.InterConsultationResp>,
  );
  return { data, loading };
};

export const useReceivedInterConsultQuery = () => {
  const { data } = useQuery<{ receivedFrom: boolean }, TreatedError>(
    [ReactQueryKeys["received-interConsult-key"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["received-interConsult-key"],
      ]) as unknown) as Promise<{ receivedFrom: boolean }>,
  );
  return { data };
};
const fetchInterConsultationBackground = (
  key: QueryKey,
  { code }: { code: string },
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/inter-consultations/background` as any,
    body: {},
    method: "GET",
  });

export const useFetchInterConsultationBackgroundQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.InterConsultationReq, TreatedError> & {
  code: string;
}) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.InterConsultationReq,
    TreatedError
  >(
    [ReactQueryKeys["inter-consultation-background"], { code }],
    fetchInterConsultationBackground,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
