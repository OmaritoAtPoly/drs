import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../apiTypes";
import TreatedError from "../utils/error/TreatedError";
import { useShowError } from "../utils/error/useShowError";
import fetchCreator from "../utils/fetch.ts/fetchCreator";

const appData = () =>
  fetchCreator({
    endpoint: "/user/app-data",
    body: {},
    method: "GET",
    headers: {},
  });

// eslint-disable-next-line import/prefer-default-export
export const useAppDataQuery = ({
  showError,
  ...argsQuery
}: UseQueryArgs<Schemas.AppData, TreatedError>) => {
  const { data, error, isLoading: loading, refetch } = useQuery<
    Schemas.AppData,
    TreatedError
  >([ReactQueryKeys["app-data-key"]], appData, argsQuery);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { loading, data, error, refetch };
};
