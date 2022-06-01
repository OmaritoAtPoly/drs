import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import InterConsultReport from "../../../components/domains/customer/interconsult/report/InterConsultReport";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useAddReceiveAttachmentReportMutation,
  useSaveInterConsultReportMutation,
} from "../../../modules/customer/interconsult/mutation";
import useAddAttachment from "./InterConsultUtils";

interface Props {
  clinicalProfile: string;
  open: boolean;
  currentInterConsult: Schemas.InterConsultationResp;
  handleShow: () => void;
}

export default function InterConsultInformContainer(props: Props) {
  const { id: code } = useParams<{ id: string }>();
  const {
    localBase64,
    uploadLocalProfessionalFile,
    handleResetUpload,
    deleteAttachmentItem,
  } = useAddAttachment();
  const { handleShow } = props;

  const onSuccessAttachment = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["my-received-inter-consultation"],
    ]);
    handleShow();
  }, [handleShow]);

  const {
    mutate: attachmentMutation,
    loading: attachingFiles,
  } = useAddReceiveAttachmentReportMutation({
    onSuccess: onSuccessAttachment,
    showError: true,
  });

  const handleUpFiles = useCallback(
    (data: Schemas.InterConsultationResp) => {
      localBase64 && localBase64.length > 0
        ? Promise.all(
            localBase64.map((files) =>
              attachmentMutation({
                code,
                requestCode: data.code || "",
                base64: files.base64,
                name: files.name,
              }),
            ),
          )
        : handleShow();
    },
    [attachmentMutation, code, handleShow, localBase64],
  );

  const onSuccess = useCallback(
    async (data: Schemas.InterConsultationResp) => {
      queryCache.invalidateQueries([
        ReactQueryKeys["my-received-inter-consultation"],
      ]);
      handleUpFiles(data);
    },
    [handleUpFiles],
  );

  const { mutate, loading } = useSaveInterConsultReportMutation({
    showError: true,
    onSuccess,
  });

  const handleOnMakeReport = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (requestBody: Schemas.InterConsultationReport) => {
      mutate({
        ...requestBody,
        code,
        requestCode: props.currentInterConsult.code || "",
        seenByReference: true,
        attachments: [],
      });
    },
    // eslint-disable-next-line react/destructuring-assignment
    [code, mutate, props.currentInterConsult.code],
  );

  return (
    <InterConsultReport
      loading={loading}
      handleOnMakeReport={handleOnMakeReport}
      attachingFiles={attachingFiles}
      uploadLocalProfessionalFile={uploadLocalProfessionalFile}
      handleResetUpload={handleResetUpload}
      localBase64={localBase64}
      deleteAttachmentItem={deleteAttachmentItem}
      {...props}
    />
  );
}
