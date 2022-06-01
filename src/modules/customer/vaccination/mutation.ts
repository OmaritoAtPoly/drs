/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";
import TreatedError from "../../utils/error/TreatedError";
import { UseMutationArgs } from "../../apiTypes";
import { useShowError } from "../../utils/error/useShowError";

const updatePatientVaccination = ({
  body,
  code,
}: {
  body: any;
  code: string;
}) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/vaccination` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateCustomerVaccinationMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  any,
  TreatedError,
  {
    body: any;
    code: string;
  },
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updatePatientVaccination,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });

  return { mutate, loading, data, error, reset };
};
