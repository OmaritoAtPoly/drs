import { QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";

const fetchCustomerVaccination = (
  _key: QueryKey,
  { code }: Paths.GetCustomerVaccination.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/vaccination` as any,
    body: {},
    method: "GET",
  });

const useCustomerVaccinationQuery = ({
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.CustomerVaccinationData, TreatedError> &
  Paths.GetCustomerVaccination.PathParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.CustomerVaccinationData,
    TreatedError
  >(
    [ReactQueryKeys["customer-vaccination-key"], { code }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchCustomerVaccination as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export default useCustomerVaccinationQuery;
