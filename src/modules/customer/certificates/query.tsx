/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryCache, QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchPatientCertificates = (
  _key: QueryKey,
  {
    code,
    page = 0,
    pageSize = 50,
  }: Paths.GetCertificates.PathParameters & Paths.LabResults.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/certificates?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

export const usePatientCertificatesQuery = ({
  page,
  pageSize,
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.CertificateResponse, TreatedError> &
  Paths.LabResults.QueryParameters &
  Paths.GetCertificates.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.CertificateResponse[],
    TreatedError
  >(
    [ReactQueryKeys["patient-certificates-list"], { code, page, pageSize }],
    fetchPatientCertificates as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export const useCurrentCertificateToEditQuery = () => {
  const { data, isLoading: loading } = useQuery<
    Schemas.CertificateResponse,
    TreatedError
  >(
    [ReactQueryKeys["current-certificate-to-edit"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-certificate-to-edit"],
      ]) as unknown) as Promise<Schemas.CertificateResponse>,
  );
  return { data, loading };
};
