import React, { useCallback, useMemo } from "react";
import Attachment from "../../../components/domains/customer/interconsult/Attachment";
import { useInterConsultReportDownloadAttachmentMutation } from "../../../modules/customer/interconsult/mutation";
import { showFile } from "../../../utils/document";

interface Props {
  attachment: string;
  code?: string;
  requestCode?: string;
  removable?: boolean;
  downloadable?: boolean;
}

export default function IterConsultReportAttachmentItemContainer({
  attachment,
  code = "",
  requestCode = "",
  removable = false,
  downloadable = false,
}: Props) {
  const attachmentName = useMemo(() => {
    const file = attachment.split(".");
    return file[0];
  }, [attachment]);

  const onSuccess = useCallback(
    (file: Blob) => {
      showFile(file, attachmentName, file.type);
    },
    [attachmentName],
  );

  const {
    loading: downloading,
    mutate,
  } = useInterConsultReportDownloadAttachmentMutation({
    showError: true,
    onSuccess,
  });

  const handleDownloadAttachment = useCallback(() => {
    mutate({ code, requestCode, name: attachment });
  }, [attachment, code, mutate, requestCode]);

  return (
    <Attachment
      attachment={attachment || ""}
      downloading={downloading}
      downloadAttachmentItem={handleDownloadAttachment}
      removable={removable}
      downloadable={downloadable}
    />
  );
}
