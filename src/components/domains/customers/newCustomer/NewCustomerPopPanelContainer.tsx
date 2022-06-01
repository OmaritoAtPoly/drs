import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { useResetCurrentPatient } from "../../../../modules/customer/profile/cacheSelector";
import {
  useDownLoadExcelTemplateMutation,
  useImportCustomerMutation,
} from "../../../../modules/customer/signUp/mutation";
import { useAddLastAlerts } from "../../../../modules/utils/error/handleError";
import { showFile } from "../../../../utils/document";
import { convertFileToBase64 } from "../../../../utils/file";
import STRINGS from "../../../../utils/strings";
import NewCustomerPopPanel from "./NewCustomerPopPanel";

export default function NewCustomerPopPanelContainer() {
  const { resetCurrentPatient } = useResetCurrentPatient();
  const { push } = useHistory();
  const { addLastAlerts } = useAddLastAlerts();

  const [templateIndex, setTemplateIndex] = useState<number>(0);

  const onNewPatient = useCallback(() => {
    resetCurrentPatient();
    push("/new-patient");
  }, [push, resetCurrentPatient]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDownLoadSuccess = useCallback((file: Blob) => {
    showFile(
      file,
      "template.xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
  }, []);
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: downLoadFileMutate,
    loading: downloading,
  } = useDownLoadExcelTemplateMutation({
    showError: true,
    onSuccess: onDownLoadSuccess,
  });

  const handleOnDownloadTemplate = useCallback(
    (index: number) => {
      setTemplateIndex(index);
      downLoadFileMutate({ index: `${index}` });
    },
    [downLoadFileMutate],
  );

  const onImportCustomerSuccess = useCallback((data: [{
    error: "",
    line: number,
    success: boolean,
  }]) => {
    queryCache.invalidateQueries([ReactQueryKeys.patients], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    // eslint-disable-next-line array-callback-return
    data.map((a) => {
      (!a.success) ? addLastAlerts({
        message: `${a.error} ${STRINGS.error.ERROR_AT_LINE} : ${a.line}`,
        severity: "error",
        name: "",
      }) : addLastAlerts({
        message: STRINGS.generals.IMPORTED_PATIENTS,
        severity: "success",
        name: "",
      });
    },
    );
  }, [addLastAlerts]);

  const {
    mutate: importCustomerMutate,
    loading: importingCustomer,
  } = useImportCustomerMutation({
    onSuccess: onImportCustomerSuccess,
  });

  const handleOnImportCustomer = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      importCustomerMutate({ base64: base64 || "", name: file?.name });
    },
    [importCustomerMutate],
  );

  return (
    <NewCustomerPopPanel
      downLoading={downloading}
      importing={importingCustomer}
      templateIndex={templateIndex}
      onCreateNewPatient={onNewPatient}
      onDownloadTemplate={handleOnDownloadTemplate}
      onImportPatient={handleOnImportCustomer}
    />
  );
}
