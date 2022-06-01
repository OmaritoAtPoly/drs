import { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import useCurrentProcedureToEditCacheSelector from "../../../modules/customer/procedures/cacheSelector";
import {
  useCreateProcedureMutation,
  useCustomerProcedurePdfMutation,
  useDeleteProcedureMutation,
  useEditProcedureMutation,
  useSendProcedureByEmailMutation,
} from "../../../modules/customer/procedures/mutation";
import useCurrentProcedureToEditQuery from "../../../modules/customer/procedures/query";
import useHandlerError, {
  useAddLastAlerts,
} from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

const useProcedureDelete = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const onSuccessDelete = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["patient-procedure-list"]);
  }, []);

  const {
    mutate: deleteMutation,
    loading: deleteLoading,
  } = useDeleteProcedureMutation({
    showError: true,
    onSuccess: onSuccessDelete,
  });

  const handleDeleteProcedure = useCallback(
    (requestCode: string) => {
      deleteMutation({ code: patientId, requestCode });
    },
    [deleteMutation, patientId],
  );

  return { handleDeleteProcedure, deleteLoading };
};

export default useProcedureDelete;

export const useProcedurePrintDownload = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    mutate: mutatePrintPdf,
    loading: loadingPrintPdf,
  } = useCustomerProcedurePdfMutation({
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

  return { handlePrintPdf, loadingPrintPdf };
};

export const useSendMail = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const { addLastAlerts } = useAddLastAlerts();
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
  } = useSendProcedureByEmailMutation({
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

  return { handleSendEmail, loadingSendEmail };
};

export const useSendByCell = () => {
  const { id: patientId } = useParams<{ id: string }>();

  const { addLastAlerts } = useAddLastAlerts();

  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: mutateSendCell,
    loading: loadingSendCell,
  } = useSendProcedureByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });
  const handleCellAction = useCallback(
    (requestCode?: string) => {
      if (patientId && requestCode) {
        mutateSendCell({
          code: patientId,
          requestCode,
          sendByEmail: false,
          sendToCustomer: true,
          sendToProfessional: false,
        });
      }
    },
    [mutateSendCell, patientId],
  );

  return { handleCellAction, loadingSendCell };
};

export const useInsertOrEditProcedure = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const {
    data: initialDataAppointmentRecord,
  } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });
  const { data: initialData } = useCurrentProcedureToEditQuery();
  const {
    saveCurrentProcedureToEdit,
  } = useCurrentProcedureToEditCacheSelector();
  const { handlerError } = useHandlerError();

  const handleResumeShow = useCallback(() => setResumeOpen(!resumeOpen), [
    resumeOpen,
  ]);

  const onSuccess = useCallback(
    (data: Schemas.ProcedureResponse) => {
      saveCurrentProcedureToEdit(data);
      queryCache.invalidateQueries([ReactQueryKeys["patient-procedure-list"]], {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      });
      handleResumeShow();
    },
    [handleResumeShow, saveCurrentProcedureToEdit],
  );

  const { mutate, loading: insertingProcedure } = useCreateProcedureMutation({
    onSuccess,
    showError: true,
  });

  const { mutate: mutateEdit, loading: loadingEdit } = useEditProcedureMutation(
    {
      onSuccess,
      showError: true,
    },
  );

  const onAddOrEditProcedure = useCallback(
    (value: Schemas.ProcedureResponse) => {
      if (!value.name) {
        handlerError(STRINGS.error.ADD_PROCEDURE_NAME);
        return;
      }
      if (!value.details || !value.details.length) {
        handlerError(STRINGS.error.CHOOSE_ADD_DETAILS_DIAGNOSE);
        return;
      }

      if (initialData && initialData.code) {
        mutateEdit({
          ...value,
          details: value.details,
          code: patientId,
          requestCode: value.code || "",
        });
      } else {
        mutate({
          name: value.name,
          code: patientId,
          details: value.details,
          diagnoses: value.diagnoses,
          appointment: appointmentId && appointmentId,
        });
      }
    },
    [handlerError, initialData, mutateEdit, patientId, appointmentId, mutate],
  );

  return {
    initialDataAppointmentRecord,
    initialData,
    resumeOpen,
    loadingEdit,
    insertingProcedure,
    handleResumeShow,
    onAddOrEditProcedure,
  };
};
