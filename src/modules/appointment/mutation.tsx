/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const createAppointment = (body: Paths.CreateAppointment.RequestBody) =>
  fetchCreator({
    endpoint: "/professional/appointment/create",
    body,
    method: "POST",
  });

export const useCreateAppointmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentData,
  TreatedError,
  Paths.CreateAppointment.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    createAppointment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const rescheduleAppointment = (
  body: Paths.RescheduleAppointment.RequestBody &
    Paths.RescheduleAppointment.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/appointment/${body.code}/reschedule` as any,
    body,
    method: "POST",
  });

export const useRescheduleAppointmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentData,
  TreatedError,
  Paths.RescheduleAppointment.RequestBody &
    Paths.RescheduleAppointment.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    rescheduleAppointment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const cancelAppointmentSchedule = ({
  code,
}: Paths.CancelAppointment.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/appointment/${code}` as any,
    body: {},
    method: "DELETE",
  });

export const useCancelAppointmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ApiResponseVoid,
  TreatedError,
  Paths.BlockSchedule.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    cancelAppointmentSchedule,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const lockSchedule = ({
  from,
  to,
  healthCenterCode,
  serviceCode,
}: Paths.BlockSchedule.QueryParameters) =>
  fetchCreator({
    endpoint: `/professional/schedule?from=${from}&to=${to}${
      healthCenterCode ? `&healthCenterCode=${healthCenterCode}` : ""
    }${serviceCode ? `&serviceCode=${serviceCode}` : ""}` as any,
    body: {},
    method: "DELETE",
  });
export const useLockScheduleMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.ApiResponseVoid,
  TreatedError,
  Paths.BlockSchedule.QueryParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    lockSchedule,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteRecentAppointment = ({
  code,
}: Paths.CancelAppointment.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/appointment/${code}` as any,
    body: {},
    method: "DELETE",
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteRecentAppointmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentData,
  TreatedError,
  Paths.CancelAppointment.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteRecentAppointment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
