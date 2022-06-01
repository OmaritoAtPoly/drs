import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import SearchFilesTemplate from "../../../components/domains/customer/files/SearchFilesTemplate";
import { ReactQueryKeys } from "../../../modules/apiTypes";

import useProfessionalFilesCacheSelector from "../../../modules/customer/files/cacheSelector";
import useImportFilesMutation, {
  useDeleteFilesMutation,
  useDownLoadProfessionalFileMutation,
} from "../../../modules/customer/files/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import { convertFileToBase64 } from "../../../utils/file";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  handleShow: () => void;
}

export default function SearchFilesTemplateContainer({
  handleShow,
  open,
}: Props) {
  const { id: patientId } = useParams<{ id: string }>();
  const { files, filesLoading } = useProfessionalFilesCacheSelector();
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
    queryCache.invalidateQueries([ReactQueryKeys["professional-files-list"]]);
  }, []);

  const { mutate: deleteFile, loading: deleteLoading } = useDeleteFilesMutation(
    {
      showError: true,
      onSuccess,
    },
  );

  const handleDeleteFile = useCallback(
    (file: Schemas.ProfessionalFileResponse) => () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      patientId &&
        deleteFile({ code: patientId, requestCode: file.code || "" });
    },
    [deleteFile, patientId],
  );

  const onDownLoadSuccess = useCallback((blob: Blob, { fileName }) => {
    showFile(blob, fileName, blob.type);
  }, []);

  const {
    mutate: downLoadFileMutate,
    loading: downloading,
  } = useDownLoadProfessionalFileMutation({
    showError: true,
    onSuccess: onDownLoadSuccess,
  });

  const handleOnDownloadProfessionalFile = useCallback(
    (file: Schemas.ProfessionalFileResponse) => () => {
      downLoadFileMutate({
        code: file.code || "",
        fileName: file.fileName || "",
      });
    },
    [downLoadFileMutate],
  );

  const onSuccessImportFiles = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.SUCCESS_PROFESSIONAL_FILE,
      severity: "success",
      name: "",
    });
    queryCache.invalidateQueries([ReactQueryKeys["professional-files-list"]]);
    handleShowAddForm();
    setLocalBase64({ base64: "", name: "", requestName: "" });
  }, [addLastAlerts, handleShowAddForm]);

  const { mutate, loading: loadingUpload } = useImportFilesMutation({
    onSuccess: onSuccessImportFiles,
    showError: true,
  });

  const uploadProfessionalFile = useCallback(
    (value: string) =>
      mutate({
        base64: localBase64.base64,
        name: localBase64.name,
        code: patientId,
        title: value,
      }),
    [mutate, localBase64.base64, localBase64.name, patientId],
  );

  const uploadLocalProfessionalFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      base64 && setLocalBase64({ base64, name: file?.name });
    },
    [],
  );

  return (
    <SearchFilesTemplate
      open={open}
      handleShow={handleShow}
      files={files || []}
      loadingFiles={filesLoading}
      loadingDownload={downloading}
      onDownloadTemplate={handleOnDownloadProfessionalFile}
      loadingDelete={deleteLoading}
      onDeleteTemplate={handleDeleteFile}
      uploadProfessionalFile={uploadProfessionalFile}
      uploadLocalProfessionalFile={uploadLocalProfessionalFile}
      loadingUpload={loadingUpload}
      openAddForm={openAddForm}
      handleShowAddForm={handleShowAddForm}
      localBase64={localBase64}
    />
  );
}
