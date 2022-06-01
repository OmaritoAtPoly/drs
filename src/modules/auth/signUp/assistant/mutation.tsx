/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";

const ActivateAssistant = (body: Schemas.AssistantRequest) =>
  fetchCreator({
    endpoint: "/user/enable-assistant",
    body,
    method: "POST",
  });

export const useActivateAssistantMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.AssistantRequest,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    ActivateAssistant,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const inviteAssistant = (body: Schemas.EmailNameRequest) =>
  fetchCreator({
    endpoint: "/professional/invite-assistant",
    body,
    method: "POST",
  });

export const useInviteAssistantMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.EmailNameRequest,
  TreatedError,
  unknown,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    inviteAssistant,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteProfessionalAssistant = (
  body: Paths.DeleteAssistant.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/assistants/${body.code}` as any,
    body,
    method: "DELETE",
  });

export const useDeleteProfessionalAssistantMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CertificateResponse,
  TreatedError,
  Schemas.CertificateResponse,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteProfessionalAssistant,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};
