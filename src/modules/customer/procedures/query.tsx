/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryCache, QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const useCurrentProcedureToEditQuery = () => {
  const { data, isLoading: loading } = useQuery<
    Schemas.ProcedureResponse,
    TreatedError
  >(
    [ReactQueryKeys["current-procedure-to-edit"]],
    () =>
      (queryCache.getQueryData([
        ReactQueryKeys["current-procedure-to-edit"],
      ]) as unknown) as Promise<Schemas.ProcedureResponse>,
  );
  return { data, loading };
};
export default useCurrentProcedureToEditQuery;

// Divider //
const fetchProcedures = (
  _key: QueryKey,
  {
    code,
    page,
    pageSize,
    appointment,
  }: Paths.Requests.PathParameters &
    Paths.GetCustomerProcedures.QueryParameters &
    Paths.AddCustomerProcedure.QueryParameters,
) => fetchCreator({
  endpoint: `/professional/customers/${code}/procedures?appointment=${appointment}&page=${page}&pageSize=${pageSize}` as any,
  body: {},
  method: "GET",
});

export const useProceduresQuery = ({
  showError,
  code,
  page,
  pageSize,
  appointment,
  ...argsQuery
}: UseQueryArgs<Schemas.ProcedureResponse, TreatedError> &
  Paths.Requests.PathParameters &
  Paths.AddCustomerProcedure.QueryParameters &
  Paths.GetCustomerProcedures.QueryParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.ProcedureResponse[],
    TreatedError
  >(
    [
      ReactQueryKeys["patient-procedure-list"],
      { code, page, pageSize, appointment },
    ],
    fetchProcedures,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};
