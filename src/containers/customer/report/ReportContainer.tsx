import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import Reports from "../../../components/domains/customer/report/Reports";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useCurrentReportToEditCacheSelector } from "../../../modules/customer/report/cacheSelector";
import {
  useCreateReportMutation,
  useEditReportMutation,
  useCustomerReportPdfMutation,
  useSendReportByEmailMutation,
} from "../../../modules/customer/report/mutation";
import { useCurrentReportToEditQuery } from "../../../modules/customer/report/query";

import useHandlerError, {
  useAddLastAlerts,
} from "../../../modules/utils/error/handleError";
import { defaultCertificate } from "../../../utils/defaultData";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleDialogName: (labelName: string) => void;
}

export default function ReportContainer({
  handleShow,
  open,
  handleDialogName,
}: Props) {
  const { id: patientId } = useParams<{ id: string }>();
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const { addLastAlerts } = useAddLastAlerts();
  const { data: initialData } = useCurrentReportToEditQuery();
  const { saveCurrentReportToEdit } = useCurrentReportToEditCacheSelector();

  const { handlerError } = useHandlerError();
  const handleResumeShow = useCallback(() => setResumeOpen(!resumeOpen), [
    resumeOpen,
  ]);

  const onSuccess = useCallback(
    (data: Schemas.ReportResponse) => {
      saveCurrentReportToEdit(data);
      queryCache.invalidateQueries([ReactQueryKeys["patient-reports-list"]], {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      });
      handleResumeShow();
    },
    [handleResumeShow, saveCurrentReportToEdit],
  );

  const { mutate, loading: loadingCreate } = useCreateReportMutation({
    onSuccess,
    showError: true,
  });

  const { mutate: mutateEdit, loading: loadingEdit } = useEditReportMutation({
    onSuccess,
    showError: true,
  });
  const handleOnSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const handleAddOrEditReport = useCallback(
    (value: Schemas.ReportResponse) => {
      if (!value.details || !value.details.length) {
        handlerError(STRINGS.error.SHOULD_ADD_DETAILS);
        return;
      }
      if (initialData) {
        mutateEdit({
          details: value.details,
          code: patientId,
          requestCode: value.code || "",
        });
      } else {
        mutate({
          code: patientId,
          details: value.details,
        });
      }
    },
    [handlerError, initialData, mutate, mutateEdit, patientId],
  );

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    mutate: mutatePrintPdf,
    loading: loadingPrintPdf,
  } = useCustomerReportPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handlePrintPdf = useCallback(
    (requestCode?: string) => {
      if (requestCode && patientId) {
        mutatePrintPdf({
          code: patientId,
          requestCode,
        });
      }
    },
    [mutatePrintPdf, patientId],
  );

  const {
    mutate: mutateSendEmail,
    loading: loadingSendEmail,
  } = useSendReportByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByEmailSuccess,
  });

  const handleSendEmail = useCallback(
    (requestCode?: string) => {
      if (patientId && requestCode) {
        mutateSendEmail({
          code: patientId,
          requestCode,
          sendByEmail: true,
          sendToCustomer: false,
          sendToProfessional: false,
        });
      }
    },
    [mutateSendEmail, patientId],
  );
  const {
    mutate: mutateCellAction,
    loading: loadingCellAction,
  } = useSendReportByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });
  const handleCellAction = useCallback(
    (requestCode?: string) => {
      if (patientId && requestCode) {
        mutateCellAction({
          code: patientId,
          requestCode,
          sendByEmail: false,
          sendToCustomer: true,
          sendToProfessional: false,
        });
      }
    },
    [mutateCellAction, patientId],
  );

  return (
    <Reports
      initialData={initialData || defaultCertificate}
      open={open}
      handleShow={handleShow}
      resumeOpen={resumeOpen}
      handleResumeShow={handleResumeShow}
      handleDialogName={handleDialogName}
      handleSendEmail={handleSendEmail}
      loadingSendEmail={loadingSendEmail}
      handlePrintPdf={handlePrintPdf}
      loadingPrintPdf={loadingPrintPdf}
      handleAddOrEditReport={handleAddOrEditReport}
      loadingReport={loadingCreate || loadingEdit}
      handleCellAction={handleCellAction}
      loadingCellAction={loadingCellAction}
      handleClose={handleShow}
    />
  );
}
