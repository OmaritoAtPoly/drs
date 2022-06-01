/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";

const fetchInterConsultPdf = ({
    code,
    requestCode,
  }: Paths.PrescriptionPdf.PathParameters) =>
    fetchCreator({
      endpoint: `/professional/customers/${code}/inter-consultations/${requestCode}/report/pdf` as any,
      body: {},
      method: "GET",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/pdf",
      },
    });

  const useInterConsultReportPdfMutation = ({
    showError,
    ...argMutation
  }: UseMutationArgs<Blob, TreatedError>) => {
    const [mutate, { isLoading: loading, data, error }] = useMutation<
      Blob,
      TreatedError,
      Paths.PrescriptionPdf.PathParameters
    >(fetchInterConsultPdf, argMutation);
    useShowError({ showError, error: error as TreatedError | undefined });
    return { mutate, loading, data };
  };

  export default useInterConsultReportPdfMutation;
