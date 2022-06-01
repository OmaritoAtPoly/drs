/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryKey, useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchProfessionalFiles = (
  _key: QueryKey,
  {
    page,
    pageSize,
    code,
  }: Paths.GetFile.PathParameters & Paths.GetFile.QueryParameters,
) =>
  fetchCreator({
    endpoint: `/professional/customers/${code}/files?page=${page}&pageSize=${pageSize}` as any,
    body: {},
    method: "GET",
  });

const useProfessionalFilesQuery = ({
  showError,
  page,
  pageSize,
  code,
  ...argsQuery
}: UseQueryArgs<Schemas.ProfessionalFileResponse[], TreatedError> &
  Paths.GetFile.PathParameters &
  Paths.GetFile.QueryParameters) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.ProfessionalFileResponse[],
    TreatedError
  >(
    [ReactQueryKeys["professional-files-list"], { page, pageSize, code }],
    fetchProfessionalFiles as any,
    argsQuery,
  );
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};

export default useProfessionalFilesQuery;
