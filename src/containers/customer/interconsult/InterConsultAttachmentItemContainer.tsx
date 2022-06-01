import React, { useCallback, useMemo } from "react";
import Attachment from "../../../components/domains/customer/interconsult/Attachment";
import { useCurrentInterconsultationToEditCacheSelector } from "../../../modules/customer/interconsult/madeInterConsultationCacheSelector";
import {
  useInterConsultDeleteAttachmentMutation,
  useInterConsultDownloadAttachmentMutation,
} from "../../../modules/customer/interconsult/mutation";
import { useCurrentInterconsultationToEditQuery } from "../../../modules/customer/interconsult/query";
import { showFile } from "../../../utils/document";

interface Props {
  attachment: string;
  code?: string;
  requestCode?: string;
  removable?: boolean;
  downloadable?: boolean;
  deleteAttachmentItem?: (name: string) => void;
}

export default function InterConsultAttachmentItemContainer({
  attachment,
  code = "",
  requestCode = "",
  removable = false,
  downloadable = false,
  deleteAttachmentItem,
}: Props) {
  const {
    data: currentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditQuery();
  const {
    saveCurrentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditCacheSelector();

  const theAttachmentName = useMemo(() => {
    const file = attachment.split(".");
    return file[0];
  }, [attachment]);

  const onSuccess = useCallback(
    (file: Blob) => {
      showFile(file, theAttachmentName, file.type);
    },
    [theAttachmentName],
  );

  const {
    mutate,
    loading: downloading,
  } = useInterConsultDownloadAttachmentMutation({
    showError: true,
    onSuccess,
  });

  const updateCurrentAttachments = useCallback(() => {
    const oldAttachments = currentInterconsultationToEdit?.attachments || [];
    const newAttachments = oldAttachments.filter((a) => a !== attachment);
    saveCurrentInterconsultationToEdit({
      ...currentInterconsultationToEdit,
      attachments: newAttachments,
    });
  }, [
    attachment,
    currentInterconsultationToEdit,
    saveCurrentInterconsultationToEdit,
  ]);

  const onDeleteSuccess = useCallback(() => {
    deleteAttachmentItem && deleteAttachmentItem(attachment);
    updateCurrentAttachments();
  }, [attachment, deleteAttachmentItem, updateCurrentAttachments]);

  const {
    mutate: deleteMutate,
    loading: deleting,
  } = useInterConsultDeleteAttachmentMutation({
    showError: true,
    onSuccess: onDeleteSuccess,
  });

  const handleDownloadAttachment = useCallback(() => {
    mutate({ code, requestCode, name: attachment });
  }, [attachment, code, mutate, requestCode]);

  const handleDeleteAttachment = useCallback(
    (attachmentName: string) => {
      if (requestCode !== "") {
        deleteMutate({
          code,
          requestCode,
          name: attachmentName,
        });
      } else {
        deleteAttachmentItem && deleteAttachmentItem(attachmentName);
      }
    },
    [code, deleteAttachmentItem, deleteMutate, requestCode],
  );

  return (
    <Attachment
      attachment={attachment || ""}
      downloading={downloading}
      deleting={deleting}
      deleteAttachmentItem={handleDeleteAttachment}
      downloadAttachmentItem={handleDownloadAttachment}
      removable={removable}
      downloadable={downloadable}
    />
  );
}
