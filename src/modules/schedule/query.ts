/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const fetchAvailabilities = () =>
  fetchCreator({
    endpoint: "/professional/availabilities",
    body: {},
    method: "GET",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAvailabilitiesConfigurationQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AvailabilityData[], TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AvailabilityData[],
    TreatedError
  >(
    [ReactQueryKeys["availabilities-configuration-key"]],
    fetchAvailabilities,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

const fetchProfessionalScheduleAvailability = ({
  code,
  from,
  to,
}: Paths.ProfessionalAvailability.PathParameters &
  Paths.ProfessionalAvailability.QueryParameters) =>
  fetchCreator({
    endpoint: `/professional/professional-schedule?healthCenter=${code}&from=${from}&to=${to}` as any,
    body: {},
    method: "GET",
  });

export const useProfessionalScheduleAvailabilityQuery = ({
  showError,
  code,
  from,
  to,
  ...argsQuery
}: UseQueryArgs<Schemas.ProfessionalScheduleData[], TreatedError> &
  Paths.ProfessionalAvailability.PathParameters &
  Paths.ProfessionalAvailability.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ProfessionalScheduleData[],
    TreatedError
  >(
    [
      ReactQueryKeys["professional-schedule-availabilities-key"],
      { code, from, to },
    ],
    () => fetchProfessionalScheduleAvailability({ code, from, to }),
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
