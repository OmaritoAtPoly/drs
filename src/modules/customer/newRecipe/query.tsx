import { QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";

const fetchGetRecipe = (
  _key: QueryKey,
  {
    code,
    page,
    pageSize,
  }: Paths.GetCustomerPrescriptions.PathParameters &
    Paths.GetCustomerPrescriptions.QueryParameters,
) =>
  //   Paths.Appointment1.PathParameters & Paths.Appointments1.QueryParameters,
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/prescriptions/?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

const useGetRecipeQuery = ({
  page,
  pageSize,
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.PrescriptionResponse[], TreatedError> &
  Paths.GetCustomerPrescriptions.PathParameters &
  Paths.GetCustomerPrescriptions.QueryParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.PrescriptionResponse[],
    TreatedError
  >(
    [ReactQueryKeys["get-recipe-key"], { code, page, pageSize }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchGetRecipe as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};

export default useGetRecipeQuery;
