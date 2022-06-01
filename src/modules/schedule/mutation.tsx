import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const configAvailability = (body: Schemas.ProfessionalAvailabilitiesRequest) =>
  fetchCreator({
    endpoint: "/professional/availabilities",
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useConfigAvailabilityMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AvailabilityData[],
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    configAvailability,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const changeDuration = (body: Schemas.ProfessionalAppointmentRequest) =>
  fetchCreator({
    endpoint: "/professional/appointment-duration",
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useChangeDurationMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ProfessionalData,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    changeDuration,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const enableSchedule = ({
  from,
  to,
  healthCenterCode,
  serviceCode,
}: Paths.EnableSchedule.QueryParameters) =>
  fetchCreator({
    endpoint: `/professional/schedule?from=${from}&to=${to}${
      healthCenterCode ? `&healthCenterCode=${healthCenterCode}` : ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }${serviceCode ? `&serviceCode=${serviceCode}` : ""}` as any,
    body: {},
    method: "POST",
  });

export const useEnableScheduleMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ApiResponseVoid,
  TreatedError,
  Paths.EnableSchedule.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    enableSchedule,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
