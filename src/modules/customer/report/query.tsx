/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryCache, QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchPatientReports = (
  _key: QueryKey,
  {
    code,
    page = 0,
    pageSize = 50,
  }: Paths.GetProfessionalReports.PathParameters &
    Paths.GetProfessionalReports.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/reports?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const usePatientReportQuery = ({
  page,
  pageSize,
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.ReportResponse, TreatedError> &
  Paths.GetProfessionalReports.PathParameters &
  Paths.GetProfessionalReports.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ReportResponse[],
    TreatedError
  >(
    [ReactQueryKeys["patient-reports-list"], { code, page, pageSize }],
    fetchPatientReports as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCurrentReportToEditQuery = () => {
  const { data, isLoading: loading } = useQuery<
    Schemas.ReportResponse,
    TreatedError
  >(
    [ReactQueryKeys["current-report-to-edit"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-report-to-edit"],
      ]) as unknown) as Promise<Schemas.ReportResponse>,
  );
  return { data, loading };
};
