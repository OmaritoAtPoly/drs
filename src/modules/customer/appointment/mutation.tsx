/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchNewAppointment = (body: Schemas.AppointmentProfessionalRequest) =>
  fetchCreator({
    endpoint: "/professional/appointment/create",
    body,
    method: "POST",
  });

export const useNewAppointmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentData,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    fetchNewAppointment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchAppointmentUpdateRecord = (
  body: Schemas.AppointmentRecordRequest & { code?: string },
) =>
  fetchCreator({
    endpoint: `/professional/appointment/${body.code}/record` as any,
    body,
    method: "POST",
  });

export const useAppointmentUpdateRecordMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentRecordRequest,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    fetchAppointmentUpdateRecord,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchAppointmentComplete = ({
  code,
}: Paths.AcceptAppointment.PathParameters) =>
  fetchCreator({
    endpoint: `/professional/appointment/${code}/complete` as any,
    body: {},
    method: "POST",
  });

export const useAppointmentCompleteMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AppointmentData,
  TreatedError,
  Paths.AcceptAppointment.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    fetchAppointmentComplete,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteAppointment = ({ code }: { code: string }) =>
  fetchCreator({
    endpoint: `/professional/appointment/${code}` as any,
    body: {},
    method: "DELETE",
  });

export const useDeleteAppointmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<void, TreatedError, { code: string }, unknown>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteAppointment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
