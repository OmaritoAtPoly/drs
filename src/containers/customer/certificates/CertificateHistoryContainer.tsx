import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import CertificateHistoryDialog from "../../../components/domains/customer/certificate/certificateHistory/CertificateHistoryDialog";
import CertificateResumeDialog from "../../../components/domains/customer/certificate/CertificateResumeDialog";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import {
  useCertificatesCacheSelector,
  useCurrentCertificateToEditCacheSelector,
} from "../../../modules/customer/certificates/cacheSelector";
import {
  useCustomerCertificatesPdfMutation,
  useDeleteCertificateMutation,
  useSendCertificateByEmailMutation,
} from "../../../modules/customer/certificates/mutation";
import { useCurrentCertificateToEditQuery } from "../../../modules/customer/certificates/query";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
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

export default function CertificateHistoryContainer({
  handleShow,
  open,
  handleDialogName,
}: Props) {
  const { currentPatient } = usePatientCacheSelector({});
  const { id: patientId } = useParams<{ id: string }>();
  const {
    saveCurrentCertificateToEdit,
  } = useCurrentCertificateToEditCacheSelector();

  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();

  const {
    data: initialDataAppointmentRecord,
  } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });

  const { data: initialData } = useCurrentCertificateToEditQuery();

  const [showResume, setShowResume] = useState<boolean>(false);

  const { addLastAlerts } = useAddLastAlerts();
  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    mutate: mutatePrintPdf,
    loading: loadingPrintPdf,
  } = useCustomerCertificatesPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const onPrintPdf = useCallback(
    (requestCode?: string) => {
      if (initialData?.code) {
        mutatePrintPdf({
          code: patientId,
          requestCode: initialData?.code,
        });
        return;
      }
      if (requestCode && patientId) {
        mutatePrintPdf({
          code: patientId,
          requestCode,
        });
      }
    },
    [mutatePrintPdf, patientId, initialData?.code],
  );

  const { certificatesData, loadingData } = useCertificatesCacheSelector();

  const onSuccessDelete = useCallback(() => {
    queryCache.invalidateQueries(
      [ReactQueryKeys["patient-certificates-list"]],
      {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      },
    );
  }, []);

  const { mutate, loading: deleteLoading } = useDeleteCertificateMutation({
    showError: true,
    onSuccess: onSuccessDelete,
  });

  const handleDeleteCertificate = useCallback(
    (requestCode?: string) => {
      if (!patientId || !requestCode) return;
      mutate({
        code: patientId,
        requestCode,
      });
    },
    [patientId, mutate],
  );

  const handleNewCertificate = useCallback(() => {
    saveCurrentCertificateToEdit(undefined);
    handleDialogName(STRINGS.certificates.NEW_CERTIFICATE);
  }, [handleDialogName, saveCurrentCertificateToEdit]);

  const handleEditCertificate = useCallback(
    (value: Schemas.CertificateResponse) => {
      handleDialogName(STRINGS.certificates.NEW_CERTIFICATE);
      saveCurrentCertificateToEdit(value);
    },
    [handleDialogName, saveCurrentCertificateToEdit],
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
      if (initialData?.code) {
        mutateSendEmail({
          code: patientId,
          requestCode: initialData?.code,
          sendByEmail: true,
          sendToCustomer: false,
          sendToProfessional: false,
        });
        return;
      }
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
    [mutateSendEmail, patientId, initialData?.code],
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
      if (initialData?.code) {
        mutateSendCell({
          code: patientId,
          requestCode: initialData?.code,
          sendByEmail: false,
          sendToCustomer: true,
          sendToProfessional: false,
        });
        return;
      }
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
    [mutateSendCell, patientId, initialData?.code],
  );

  const handleShowResume = useCallback(() => setShowResume(!showResume), [
    showResume,
  ]);

  const handleRequestClicked = useCallback(
    (value: Schemas.CertificateResponse) => {
      saveCurrentCertificateToEdit(value);
      handleShowResume();
    },
    [saveCurrentCertificateToEdit, handleShowResume],
  );

  const renderResumeDialog = useCallback(
    () => (
      <CertificateResumeDialog
        handleMailClicked={handleMailClicked}
        handlePatientCellClicked={handlePatientCellClicked}
        handlePrint={onPrintPdf}
        handleShow={handleShowResume}
        initialData={
          {
            ...initialData,
            diagnoses:
              initialData?.diagnoses || initialDataAppointmentRecord?.diagnoses,
          } || defaultCertificate
        }
        onHistoryClicked={handleShowResume}
        open={showResume}
        withDefinitiveDiagnosis={false}
        handleClose={handleShowResume}
        showEditLabel={false}
        customer={currentPatient || defaultCustomerData}
      />
    ),
    [
      handleMailClicked,
      handlePatientCellClicked,
      onPrintPdf,
      handleShowResume,
      initialData,
      initialDataAppointmentRecord?.diagnoses,
      showResume,
      currentPatient,
    ],
  );

  return (
    <>
      <CertificateHistoryDialog
        handleShow={handleShow}
        open={open}
        certificatesData={certificatesData}
        currentPatient={currentPatient}
        loadingData={loadingData}
        handleDeleteCertificate={handleDeleteCertificate}
        deleteLoading={deleteLoading}
        handlePrintPdf={onPrintPdf}
        loadingPrintPdf={loadingPrintPdf}
        handleNewCertificate={handleNewCertificate}
        handleEditCertificate={handleEditCertificate}
        handleMailClicked={handleMailClicked}
        handlePatientCellClicked={handlePatientCellClicked}
        loadingSendingByEmail={loadingSendingByEmail}
        loadingSendingCell={loadingSendByCell}
        handleRequestClicked={handleRequestClicked}
      />
      {showResume && renderResumeDialog()}
    </>
  );
}
