import { QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../../apiTypes";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";

const fetchPatientAllergies = (
  key: QueryKey,
  { code }: Paths.GetCustomerBackground.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/background` as any,
    body: {},
    method: "GET",
  });

const useFetchCurrentUserAllergiesQuery = ({
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.CustomerBackground, TreatedError> &
  Paths.GetCustomerBackground.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.CustomerBackground,
    TreatedError
  >(
    [ReactQueryKeys["current-patient-allergies-key"], { code }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchPatientAllergies as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export default useFetchCurrentUserAllergiesQuery;
