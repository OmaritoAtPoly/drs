import { useMutation } from "react-query";
import { UseMutationArgs } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";
import { useShowError } from "../../utils/error/useShowError";
import fetchCreator from "../../utils/fetch.ts/fetchCreator";

const addInterConsult = (
  body: Paths.AddCustomerInterConsultation.RequestBody &
    Paths.AddCustomerInterConsultation.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/inter-consultations` as any,
    body,
    method: "PUT",
  });

// eslint-disable-next-line import/prefer-default-export
export const useAddNewInterConsultationMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.AddCustomerInterConsultation.RequestBody &
    Paths.AddCustomerInterConsultation.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addInterConsult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const saveInterConsultReport = (
  body: Paths.SaveInterConsultationReport.RequestBody &
    Paths.SaveInterConsultationReport.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/received-inter-consultations/${body.requestCode}/report` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useSaveInterConsultReportMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.SaveInterConsultationReport.RequestBody &
    Paths.SaveInterConsultationReport.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    saveInterConsultReport,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const sendInterConsult = (
  body: Paths.SendCustomerInterConsultation.PathParameters &
    Paths.SendCustomerInterConsultation.RequestBody,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/inter-consultations/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useSendInterConsultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.SendCustomerInterConsultation.PathParameters &
    Paths.SendCustomerInterConsultation.RequestBody,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    sendInterConsult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const deleteInterConsult = (
  body: Paths.DelCustomerInterConsultation.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/inter-consultations/${body.requestCode}` as any,
    body,
    method: "DELETE",
  });

// eslint-disable-next-line import/prefer-default-export
export const useDeleteInterConsultMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.DelCustomerInterConsultation.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    deleteInterConsult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const addInterConsultAttachment = (
  body: Paths.AddReportAttachment.PathParameters & Schemas.FileRequest,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/inter-consultations/${body.requestCode}/attachments` as any,
    body,
    method: "POST",
  });

export const useAddAttachmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.AddReportAttachment.PathParameters & Schemas.FileRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addInterConsultAttachment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const addReceivedInterConsultReportAttachment = (
  body: Paths.AddReportAttachment.PathParameters & Schemas.FileRequest,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/received-inter-consultations/${body.requestCode}/report/attachments` as any,
    body,
    method: "POST",
  });

export const useAddReceiveAttachmentReportMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.AddReportAttachment.PathParameters & Schemas.FileRequest,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    addReceivedInterConsultReportAttachment,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchInterConsultPdf = ({
  code,
  requestCode,
}: {
  code: string;
  requestCode: string;
}) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/inter-consultations/${requestCode}/pdf` as any,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/pdf",
    },
  });

export const useInterConsultPdfMutation = ({
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

const shareInterConsultPatient = (
  body: Schemas.CustomerAvailabilityRequest &
    Paths.AddReportAttachment.PathParameters,
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.code}/inter-consultations/${body.requestCode}/send` as any,
    body,
    method: "POST",
  });

export const useShareNewInterConsultationPatientMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.CustomerAvailabilityRequest,
  TreatedError,
  Paths.AddReportAttachment.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    shareInterConsultPatient,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const updateInterConsult = (
  body: Paths.EditCustomerInterConsultation.RequestBody &
    Paths.EditCustomerInterConsultation.PathParameters & {
      patientCode: string;
    },
) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${body.patientCode}/inter-consultations/${body.code}` as any,
    body,
    method: "POST",
  });

// eslint-disable-next-line import/prefer-default-export
export const useUpdateInterConsultationMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<
  Schemas.InterConsultationResp,
  TreatedError,
  Paths.EditCustomerInterConsultation.RequestBody &
    Paths.EditCustomerInterConsultation.PathParameters,
  unknown
>) => {
  const [mutate, { isLoading: loading, data, error, reset }] = useMutation(
    updateInterConsult,
    argMutation,
  );
  useShowError({ showError, error: error as never, action: reset });
  return { mutate, loading, data, error, reset };
};

const fetchInterConsultDownloadAttachment = ({
  code,
  name,
  requestCode,
}: Paths.InterConsultationAttachment.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/inter-consultations/${requestCode}/attachments/${name}` as any,
    isBlob: true,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const useInterConsultDownloadAttachmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.InterConsultationAttachment.PathParameters
  >(fetchInterConsultDownloadAttachment, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const fetchInterConsultDeleteAttachment = ({
  code,
  name,
  requestCode,
}: Paths.DelAttachment.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/inter-consultations/${requestCode}/attachments/${name}` as any,
    isBlob: true,
    body: {},
    method: "DELETE",
  });

export const useInterConsultDeleteAttachmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Schemas.InterConsultationResp, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Schemas.InterConsultationResp,
    TreatedError,
    Paths.DelAttachment.PathParameters,
    unknown
  >(fetchInterConsultDeleteAttachment, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};

const fetchInterConsultReportDownloadAttachment = ({
  code,
  name,
  requestCode,
}: Paths.InterConsultationReportAttachment.PathParameters) =>
  fetchCreator({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: `/professional/customers/${code}/inter-consultations/${requestCode}/report/attachments/${name}` as any,
    isBlob: true,
    body: {},
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const useInterConsultReportDownloadAttachmentMutation = ({
  showError,
  ...argMutation
}: UseMutationArgs<Blob, TreatedError>) => {
  const [mutate, { isLoading: loading, data, error }] = useMutation<
    Blob,
    TreatedError,
    Paths.InterConsultationReportAttachment.PathParameters
  >(fetchInterConsultReportDownloadAttachment, argMutation);
  useShowError({ showError, error: error as TreatedError | undefined });
  return { mutate, loading, data };
};
