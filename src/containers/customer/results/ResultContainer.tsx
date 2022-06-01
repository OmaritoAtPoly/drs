/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import Result from "../../../components/domains/customer/results/Result";
import ResultForm from "../../../components/domains/customer/results/ResultForm";
import ResultShowEditMode from "../../../components/domains/customer/results/ResultShowEditMode";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useSaveCurrentResultSelectorCacheSelector } from "../../../modules/customer/result/cacheSelector";
import {
  useCreateResultMutation,
  useEditResultMutation,
  useExportResultPdfMutation,
  useSendResultByEmailMutation,
} from "../../../modules/customer/result/mutation";
import { useCurrentResultToEditQuery } from "../../../modules/customer/result/query";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { defaultResult } from "../../../utils/defaultData";
import { showFile } from "../../../utils/document";
import { RequestType } from "../../../utils/enums";
import STRINGS from "../../../utils/strings";
import ResultFileDialog from "./ResultFileDialog";

interface Props {
  open: boolean;
  handleShow: () => void;
}

export default function ResultContainer({ open, handleShow }: Props) {
  const [openAddResultForm, setOpenAddResultForm] = useState<boolean>(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const { data: currentResult } = useCurrentResultToEditQuery();
  const { saveCurrentResult } = useSaveCurrentResultSelectorCacheSelector();
  const { currentPatient } = usePatientCacheSelector({});
  const { addLastAlerts } = useAddLastAlerts();
  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);
  const [resultFromFile, setResultFromFile] = useState<boolean>(false);

  const {
    loading: loadingResultPdf,
    mutate: mutateResultPdf,
  } = useExportResultPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: mutateSendEmail,
    loading: loadingSendEmail,
  } = useSendResultByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByEmailSuccess,
  });

  const handleOnPrintClicked = useCallback(() => {
    mutateResultPdf({
      code: currentPatient?.legalID || "",
      resultCode:
        (currentResult && currentResult.items && currentResult.items[0].code) ||
        "",
    });
  }, [currentPatient?.legalID, currentResult, mutateResultPdf]);

  const handleSendEmail = useCallback(() => {
    mutateSendEmail({
      code: currentPatient?.legalID || "",
      resultCode:
        (currentResult && currentResult.items && currentResult.items[0].code) ||
        "",
      sendByEmail: true,
      sendToCustomer: false,
      sendToProfessional: false,
    });
  }, [currentPatient?.legalID, currentResult, mutateSendEmail]);

  const [
    openAddFromFileResultForm,
    setOpenAddFromFileResultForm,
  ] = useState<boolean>(false);
  const handleShowAddFromFileResultForm = useCallback(() => {
    saveCurrentResult(undefined);
    setOpenAddFromFileResultForm(!openAddFromFileResultForm);
  }, [openAddFromFileResultForm, saveCurrentResult]);

  const handleRefreshDataAfterSuccess = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["customer-results-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    resultFromFile
      ? setOpenAddFromFileResultForm(!openAddFromFileResultForm)
      : setShowEditMode(!showEditMode);
  }, [
    showEditMode,
    resultFromFile,
    setOpenAddFromFileResultForm,
    openAddFromFileResultForm,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSuccessNewResult = useCallback(
    (data: Schemas.ResultResponse) => {
      setOpenAddResultForm(false);
      saveCurrentResult(data);
      handleRefreshDataAfterSuccess();
    },
    [handleRefreshDataAfterSuccess, saveCurrentResult],
  );

  const onSuccessEditResult = useCallback(
    (data: Schemas.ResultItem) => {
      saveCurrentResult({
        code: data.requestCode || "",
        createdAt: data.requestCreatedAt,
        diagnoses: data.diagnoses,
        items: [{ ...data }],
        requestType: data.requestType,
      });
      handleRefreshDataAfterSuccess();
    },
    [handleRefreshDataAfterSuccess, saveCurrentResult],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, loading: loadingNewResult } = useCreateResultMutation({
    showError: true,
    onSuccess: onSuccessNewResult,
  });
  const {
    mutate: mutateEditResult,
    loading: loadingEdit,
  } = useEditResultMutation({
    showError: true,
    onSuccess: onSuccessEditResult,
  });

  const handleShowAddResultForm = useCallback(() => {
    saveCurrentResult(undefined);
    queryCache.invalidateQueries([ReactQueryKeys["current-customer-result"]], {
      exact: true,
    });
    setOpenAddResultForm(!openAddResultForm);
  }, [openAddResultForm, saveCurrentResult]);

  const handleAddResult = useCallback(
    (
      value: {
        requestType?: RequestType;
      } & Omit<Schemas.ResultFileRequest, "requestType">,
    ) => {
      value.base64 && setResultFromFile(true);
      if (currentResult) {
        mutateEditResult({
          ...value,
          code: currentPatient?.legalID || "",
          requestCode: currentResult.code || "",
          requestType:
            currentResult && (currentResult.requestType as RequestType),
          itemCode: (currentResult.items && currentResult.items[0].code) || "",
        });
      } else {
        mutate({
          ...value,
          code: currentPatient?.legalID || "",
        });
      }
    },
    [currentPatient?.legalID, currentResult, mutate, mutateEditResult],
  );
  const handleEdit = useCallback(() => {
    setShowEditMode(false);
    setOpenAddResultForm(true);
  }, []);

  const historyResult = useCallback(() => {
    setOpenAddResultForm(false);
  }, []);
  const handleCloseForm = useCallback(() => {
    setOpenAddResultForm(!openAddResultForm);
  }, [openAddResultForm]);

  const handleHistoryClicked = useCallback(() => {
    saveCurrentResult(undefined);
    setShowEditMode(false);
    setOpenAddResultForm(false);
  }, [saveCurrentResult]);
  return (
    <>
      {openAddResultForm && (
        <ResultForm
          openAddResult={openAddResultForm}
          handleAddResult={handleAddResult}
          loadingNewResult={loadingNewResult || loadingEdit}
          historyResult={historyResult}
          initialData={currentResult || defaultResult}
          handleOpenAddResult={handleShowAddResultForm}
          handleCloseForm={handleCloseForm}
        />
      )}
      {showEditMode && (
        <ResultShowEditMode
          showEditMode={showEditMode}
          initialData={currentResult || defaultResult}
          handleShow={handleShow}
          onHistoryClicked={handleHistoryClicked}
          withDefinitiveDiagnosis
          handleEdit={handleEdit}
          handleClose={handleShow}
          handleMailClicked={handleSendEmail}
          handlePrint={handleOnPrintClicked}
          loadingPrint={loadingResultPdf}
          loadingSendingByEmail={loadingSendEmail}
        />
      )}
      {openAddFromFileResultForm && (
        <ResultFileDialog
          open={openAddFromFileResultForm}
          handleShowResultFileDialog={handleShowAddFromFileResultForm}
        />
      )}
      <Result
        open={open}
        handleShow={handleShow}
        handleShowAddResultForm={handleShowAddResultForm}
        handleShowAddFromFileResultForm={handleShowAddFromFileResultForm}
        handleEdit={handleEdit}
      />
    </>
  );
}
