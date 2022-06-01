/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useDownloadServiceExcelTemplateMutation,
  useImportServiceMutation,
} from "../../../modules/service/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import { convertFileToBase64 } from "../../../utils/file";
import STRINGS from "../../../utils/strings";
import ServicePopUpActions from "./ServicePopUpActions";

interface Props {
  handleOnCreateNewService: () => void;
}

export default function ServicePopUpActionsContainer({
  handleOnCreateNewService,
}: Props) {
  const { addLastAlerts } = useAddLastAlerts();

  const onDownLoadSuccess = useCallback((file: Blob) => {
    showFile(
      file,
      "template.xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
  }, []);

  const {
    loading: downloadingTemplate,
    mutate: downloadTemplateMutate,
  } = useDownloadServiceExcelTemplateMutation({
    showError: true,
    onSuccess: onDownLoadSuccess,
  });

  const onImportServicesSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      [ReactQueryKeys["professional-products-key"]],
      {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      },
    );
    addLastAlerts({
      message: STRINGS.service.SUCCESS_IMPORTED_SERVICES,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    loading: importingService,
    mutate: importServiceMutate,
  } = useImportServiceMutation({
    showError: true,
    onSuccess: onImportServicesSuccess,
  });

  const handleOnDownloadTemplate = useCallback(() => {
    downloadTemplateMutate();
  }, [downloadTemplateMutate]);

  const handleOnImportService = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      importServiceMutate({ base64: base64 || "", name: file?.name });
    },
    [importServiceMutate],
  );

  return (
    <ServicePopUpActions
      downloading={downloadingTemplate}
      importing={importingService}
      handleOnCreateNewService={handleOnCreateNewService}
      handleOnDownloadTemplate={handleOnDownloadTemplate}
      handleOnImportService={handleOnImportService}
    />
  );
}
