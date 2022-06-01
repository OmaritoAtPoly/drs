/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchCustomersConsents = (
  _key: QueryKey,
  {
    page,
    pageSize,
    code,
  }: Paths.GetConsents.PathParameters & Paths.GetConsents.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/informed-consents?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

const useConsentsQuery = ({
  showError,
  page,
  pageSize,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.InformedConsentResponse[], TreatedError> &
  Paths.GetConsents.PathParameters &
  Paths.GetConsents.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.InformedConsentResponse[],
    TreatedError
  >(
    [ReactQueryKeys["customer-consent-list"], { page, pageSize, code }],
    fetchCustomersConsents as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export default useConsentsQuery;
