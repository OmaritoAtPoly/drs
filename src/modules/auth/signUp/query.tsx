import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";

type ProfessionCache = {
    profession: string;
  };

// eslint-disable-next-line import/prefer-default-export
export const useDefaultProfessionQuery = ({
    showError,
    ...argsQuery
  }: UseQueryArgs<ProfessionCache, TreatedError>) => {
    const { data, error, isLoading: loading, refetch } = useQuery<
      ProfessionCache,
      TreatedError
    >([ReactQueryKeys["default-dr-profession"]], argsQuery);
    useShowError({ showError, error: error as TreatedError | undefined });
    return { loading, data, error, refetch };
  };
