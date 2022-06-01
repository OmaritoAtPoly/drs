import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import Certificates from "../../../components/domains/customer/certificate/Certificates";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import { useCurrentCertificateToEditCacheSelector } from "../../../modules/customer/certificates/cacheSelector";
import {
  useCreateCertificateMutation,
  useCustomerCertificatesPdfMutation,
  useEditCertificateMutation,
  useSendCertificateByEmailMutation,
} from "../../../modules/customer/certificates/mutation";
import { useCurrentCertificateToEditQuery } from "../../../modules/customer/certificates/query";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import useHandlerError, {
  useAddLastAlerts,
} from "../../../modules/utils/error/handleError";
import {
  defaultCertificate,
  defaultCustomerData,
} from "../../../utils/defaultData";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleDialogName: (labelName: string) => void;
}

export default function CertificateContainer({
  handleShow,
  open,
  handleDialogName,
}: Props) {
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();
  const {
    data: initialDataAppointmentRecord,
  } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });
  const { id: patientId } = useParams<{ id: string }>();
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const { data: initialData } = useCurrentCertificateToEditQuery();
  const {
    saveCurrentCertificateToEdit,
  } = useCurrentCertificateToEditCacheSelector();
  const { currentPatient } = usePatientCacheSelector({});
  const { handlerError } = useHandlerError();
  const handleResumeShow = useCallback(() => setResumeOpen(!resumeOpen), [
    resumeOpen,
  ]);

  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(
    (data: Schemas.CertificateResponse) => {
      saveCurrentCertificateToEdit(data);
      queryCache.invalidateQueries(
        [ReactQueryKeys["patient-certificates-list"]],
        {
          exact: false,
          refetchActive: true,
          refetchInactive: true,
        },
      );
      handleResumeShow();
    },
    [handleResumeShow, saveCurrentCertificateToEdit],
  );

  const { mutate, loading: loadingCreate } = useCreateCertificateMutation({
    onSuccess,
    showError: true,
  });

  const {
    mutate: mutateEdit,
    loading: loadingEdit,
  } = useEditCertificateMutation({
    onSuccess,
    showError: true,
  });

  const onAddOrEditCertificate = useCallback(
    (value: Schemas.CertificateResponse) => {
      if (!value.diagnoses || !value.diagnoses.length) {
        handlerError(STRINGS.error.CHOOSE_DIAGNOSE);
        return;
      }
      if (!value.details || !value.details.length) {
        handlerError(STRINGS.error.CHOOSE_ADD_DETAILS_CERTIFICATE);
        return;
      }

      if (initialData) {
        mutateEdit({
          details: value.details,
          diagnoses: value.diagnoses,
          code: patientId,
          requestCode: initialData.code || "",
          appointment: appointmentId,
        });
      } else {
        mutate({
          code: patientId,
          details: value.details,
          diagnoses: value.diagnoses,
          appointmentId,
        });
      }
    },
    [appointmentId, handlerError, initialData, mutate, mutateEdit, patientId],
  );

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    mutate: mutatePrintPdf,
    loading: loadingPrint,
  } = useCustomerCertificatesPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handlePrint = useCallback(
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

  const {
    mutate: mutateSendEmail,
    loading: loadingSendingByEmail,
  } = useSendCertificateByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByEmailSuccess,
  });

  const handleMailClicked = useCallback(
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
    mutate: mutateSendCell,
    loading: loadingSendByCell,
  } = useSendCertificateByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });
  const handlePatientCellClicked = useCallback(
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

  return (
    <Certificates
      initialValue={
        {
          ...initialData,
          diagnoses:
            initialData?.diagnoses || initialDataAppointmentRecord?.diagnoses,
        } || defaultCertificate
      }
      open={open}
      handleShow={handleShow}
      resumeOpen={resumeOpen}
      handleResumeShow={handleResumeShow}
      handleDialogName={handleDialogName}
      handleMailClicked={handleMailClicked}
      loadingSendingByEmail={loadingSendingByEmail}
      handlePrint={handlePrint}
      loadingPrint={loadingPrint}
      onAddOrEditCertificate={onAddOrEditCertificate}
      loadingCertificate={loadingCreate || loadingEdit}
      loadingSendByCell={loadingSendByCell}
      handlePatientCellClicked={handlePatientCellClicked}
      withDefinitiveDiagnosis={false}
      withComment={false}
      customer={currentPatient || defaultCustomerData}
    />
  );
}
