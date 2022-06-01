/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { UseMutationArgs } from "../../../apiTypes";
import TreatedError from "../../../utils/error/TreatedError";
import { useShowError } from "../../../utils/error/useShowError";
import fetchCreator from "../../../utils/fetch.ts/fetchCreator";

const sendInterConsultByMail = (
    body: Paths.SendCustomerInterConsultation.PathParameters & Schemas.CustomerAvailabilityRequest,
  ) =>
    fetchCreator({
      endpoint: `/professional/customers/${body.code}/inter-consultations/${body.requestCode}/report/send` as any,
      body,
      method: "POST",
    });

   const useSendInterConsultReportMutation = ({
    showError,
    ...argMutation
  }: UseMutationArgs<
    Schemas.InterConsultationResp,
    TreatedError,
    Schemas.InterConsultationResp,
    unknown
  >) => {
    const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
      sendInterConsultByMail,
      argMutation,
    );
    useShowError({ showError, error: error as never, action: reset });
    return { mutate, loading, data, error, reset };
  };

  export default useSendInterConsultReportMutation;
