/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";
import { useGetCacheOrStorageTokenQuery } from "../../query";

const fetchProfessionalAssistant = (
  _key: QueryKey,
  { page = 0, pageSize = 50 }: Paths.GetAssistants.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/assistants?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

const useProfessionalAssistantQuery = ({
  page,
  pageSize,
  showError,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.AssistantResponse, TreatedError> &
  Paths.GetAssistants.QueryParameters &
  Paths.GetProfessional1.PathParameters) => {
  const { data: token, loading: loadingToken } = useGetCacheOrStorageTokenQuery(
    {},
  );
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AssistantResponse[],
    TreatedError
  >(
    [ReactQueryKeys["professional-assistants-list"], { code, page, pageSize }],
    fetchProfessionalAssistant as any,
    { ...argsQuery, enabled: !!token },
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading: loading || loadingToken, data, error, refetch };
};

type AssistantProfessionalCache = {
  assistantId: string;
};

export const useEditableAssistantQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<AssistantProfessionalCache, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    AssistantProfessionalCache,
    TreatedError
  >([ReactQueryKeys["editable-assistants-id"]], argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export default useProfessionalAssistantQuery;

const fetchProfessionalAssistantToActivate = (
  _key: QueryKey,
  { code }: Paths.GetProfessional1.PathParameters,
) =>
  fetchCreator({
    endpoint: `/user/assistant-request/${code}` as any,
    body: {},
    method: "GET",
  });

export const useProfessionalAssistantToActivateQuery = ({
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AssistantRequest, TreatedError> &
  Paths.GetProfessional1.PathParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.AssistantRequest,
    TreatedError
  >(
    [ReactQueryKeys["editable-assistants-info"], { code }],
    fetchProfessionalAssistantToActivate as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};

const fetchSelectedProfessionalAssistant = (
  _key: QueryKey,
  { code }: Paths.GetAssistant.PathParameters,
) =>
  fetchCreator({
    endpoint: `/professional/assistants/${code}` as any,
    body: {},
    method: "GET",
  });

export const useSelectedProfessionalAssistantQuery = ({
  code,
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AssistantResponse, TreatedError> &
  Paths.GetAssistant.PathParameters) => {
  const { data, error, isLoading: loading } = useQuery<
    Schemas.AssistantResponse,
    TreatedError
  >(
    [ReactQueryKeys["editable-assistants-info"], { code }],
    fetchSelectedProfessionalAssistant as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error };
};
