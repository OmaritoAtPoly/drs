/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { ReactQueryKeys, UseQueryArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const fetchSpecificSpecialties = ({
  profession,
}: Paths.FindSpecialties.QueryParameters) =>
  fetchCreator({
    endpoint: `/user/specialties?profession=${profession}` as any,
    body: {},
    method: "GET",
    headers: {},
  });

  const useSpecificSpecialtyDataQuery = ({
    showError,
    profession,
    ...argsQuery
  }: UseQueryArgs<Schemas.SpecialtyResponse[], TreatedError> &
    Paths.FindSpecialties.QueryParameters) => {
    const { data, error, isLoading: loading, refetch } = useQuery<
      Schemas.SpecialtyResponse[],
      TreatedError
    >(
      [ReactQueryKeys["editable-specific-specialty"], { profession }],
      () => fetchSpecificSpecialties({ profession }) as any,
      {
        ...argsQuery,
        retry: false,
      },
    );
    useShowError({ showError, error: error as TreatedError | undefined });
    return { loading, data, error, refetch };
  };

  export default useSpecificSpecialtyDataQuery;
