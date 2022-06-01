import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import SearchConsentTemplate from "../../../components/domains/customer/consent/SearchConsentTemplate";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useConsentCacheSelector from "../../../modules/customer/consent/cacheSelector";
import useImportConsentMutation, {
  useDeleteConsentMutation,
  useDownLoadConsentFileMutation,
} from "../../../modules/customer/consent/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import { convertFileToBase64 } from "../../../utils/file";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  handleShow: () => void;
}

export default function SearchConsentTemplateContainer({
  handleShow,
  open,
}: Props) {
  const { id: patientId } = useParams<{ id: string }>();
  const { consents, consentsLoading } = useConsentCacheSelector();
  const { addLastAlerts } = useAddLastAlerts();
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleShowAddForm = useCallback(() => {
    setOpenAddForm(!openAddForm);
  }, [openAddForm]);

  const [localBase64, setLocalBase64] = useState<Schemas.ResultFileRequest>({
    base64: "",
    name: "",
    requestName: "",
  });

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["customer-consent-list"]]);
  }, []);

  const {
    mutate: deleteConsent,
    loading: deleteLoading,
  } = useDeleteConsentMutation({
    showError: true,
    onSuccess,
  });

  const handleDeleteConsent = useCallback(
    (consent: Schemas.InformedConsentResponse) => () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      patientId &&
        deleteConsent({ code: patientId, requestCode: consent.code || "" });
    },
    [deleteConsent, patientId],
  );

  const onDownLoadSuccess = useCallback(
    (blob: Blob, { fileName }: { fileName: string }) => {
      showFile(blob, fileName, blob.type);
    },
    [],
  );

  const {
    mutate: downLoadFileMutate,
    loading: downloading,
  } = useDownLoadConsentFileMutation({
    showError: true,
    onSuccess: onDownLoadSuccess,
  });

  const handleOnDownloadConsentFile = useCallback(
    (consent: Schemas.InformedConsentResponse) => () => {
      downLoadFileMutate({
        code: consent.code || "",
        fileName: consent.fileName || "",
      });
    },
    [downLoadFileMutate],
  );

  const success = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.SUCCESS_CONSENT_FILE,
      severity: "success",
      name: "",
    });
    queryCache.invalidateQueries([ReactQueryKeys["customer-consent-list"]]);
    handleShowAddForm();
  }, [addLastAlerts, handleShowAddForm]);

  const { mutate, loading: loadingUpload } = useImportConsentMutation({
    onSuccess: success,
    showError: true,
  });

  const uploadConsentFile = useCallback(
    (value: string) =>
      mutate({
        base64: localBase64.base64,
        name: localBase64.name,
        code: patientId,
        requestName: value,
      }),
    [mutate, patientId, localBase64.base64, localBase64.name],
  );

  const uploadLocalConsentFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      base64 && setLocalBase64({ base64, name: file?.name });
    },
    [],
  );

  return (
    <SearchConsentTemplate
      open={open}
      handleShow={handleShow}
      consents={consents || []}
      loadingConsents={consentsLoading}
      loadingDownload={downloading}
      onDownloadTemplate={handleOnDownloadConsentFile}
      loadingDelete={deleteLoading}
      onDeleteTemplate={handleDeleteConsent}
      uploadConsentFile={uploadConsentFile}
      uploadLocalConsentFile={uploadLocalConsentFile}
      loadingUpload={loadingUpload}
      openAddForm={openAddForm}
      handleShowAddForm={handleShowAddForm}
      localBase64={localBase64}
    />
  );
}
