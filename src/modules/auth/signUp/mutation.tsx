import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const createProfessional = (body: Schemas.ProfessionalRequest) =>
    fetchCreator({
        endpoint: "/professional/create",
        body,
        method: "POST",
    });

// eslint-disable-next-line import/prefer-default-export
export const useCreateProfessionalMutation = ({
    showError,
    ...argMutation
}: UseMutationArgs<
    Schemas.ProfessionalRequest,
    TreatedError,
    unknown,
    unknown
>) => {
    const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
        createProfessional,
        argMutation,
    );
    useShowError({ showError, error: error as never, action: reset });
    return { mutate, loading, data, error, reset };
};
