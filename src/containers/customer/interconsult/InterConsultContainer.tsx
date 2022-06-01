import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import InterConsult from "../../../components/domains/customer/interconsult/InterConsult";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import { useBackgroundPatientCacheSelector } from "../../../modules/customer/background/cacheSelector";
import { useCurrentInterconsultationToEditCacheSelector } from "../../../modules/customer/interconsult/madeInterConsultationCacheSelector";
import {
  useAddAttachmentMutation,
  useAddNewInterConsultationMutation,
  useUpdateInterConsultationMutation,
} from "../../../modules/customer/interconsult/mutation";
import {
  useCurrentInterconsultationToEditQuery,
  useFetchInterConsultationBackgroundQuery,
} from "../../../modules/customer/interconsult/query";
import InterConsultAbstractContainer from "./InterConsultAbstractContainer";
import useAddAttachment from "./InterConsultUtils";

interface Props {
  open: boolean;
  handleShow: () => void;
  onHistoricalActionClicked: () => void;
}

export default function InterConsultContainer({
  open,
  handleShow,
  onHistoricalActionClicked,
}: Props) {
  const [abstract, openAbstract] = useState<boolean>(false);
  const { id: patientId } = useParams<{ id: string }>();
  const {
    data: backgroundFromCustomer,
    loading,
  } = useFetchInterConsultationBackgroundQuery({
    code: patientId,
    enabled: !!patientId,
  });
  const {
    data: currentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditQuery();
  const {
    saveCurrentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditCacheSelector();
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();
  const {
    data: interConsultationReqData,
  } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });

  const { pathologies, allergies } = useBackgroundPatientCacheSelector();
  const {
    localBase64,
    uploadLocalProfessionalFile,
    handleResetUpload,
    deleteAttachmentItem,
  } = useAddAttachment();

  const currentAttachments = useMemo<Schemas.ResultFileRequest[]>(
    () =>
      (currentInterconsultationToEdit &&
        currentInterconsultationToEdit.attachments?.map((attachment) => ({
          name: attachment,
        }))) ||
      [],
    [currentInterconsultationToEdit],
  );

  const allergyList = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      allergies && allergies.medicine
        ? allergies?.medicine?.map((med) => med.medicine || "")
        : [],
    [allergies],
  );

  const otherAllergyList = useMemo(
    () => (allergies && allergies.other ? allergies?.other : []),
    [allergies],
  );

  const patientAllergiesIndicator = useMemo(() => {
    if (allergies?.hasAllergies) return allergies.hasAllergies;
    return "";
  }, [allergies]);

  const pathologicList = useMemo<Schemas.CustomerPathologyData[] | undefined>(
    () =>
      pathologies && pathologies?.pathologies?.map((pathology) => pathology),
    [pathologies],
  );

  const handleShowResume = useCallback(
    (data) => {
      saveCurrentInterconsultationToEdit({
        ...data,
        attachments: localBase64.map((a) => a.name),
      });
      saveCurrentInterconsultationToEdit(data);
      handleResetUpload();
      openAbstract(!abstract);
    },
    [
      abstract,
      handleResetUpload,
      localBase64,
      saveCurrentInterconsultationToEdit,
    ],
  );

  const handleHistoricalActionClickedCallBack = useCallback(() => {
    saveCurrentInterconsultationToEdit(undefined);
    onHistoricalActionClicked();
  }, [onHistoricalActionClicked, saveCurrentInterconsultationToEdit]);

  const onSuccessAttachment = useCallback(
    (data: Schemas.InterConsultationResp) => {
      handleShowResume(data);
    },
    [handleShowResume],
  );

  const {
    mutate: attachmentMutation,
    loading: attachingFiles,
  } = useAddAttachmentMutation({
    onSuccess: onSuccessAttachment,
    showError: true,
  });

  const handleUpFiles = useCallback(
    (data: Schemas.InterConsultationResp) => {
      localBase64 && localBase64.length > 0
        ? Promise.all(
            localBase64.map((files) =>
              attachmentMutation({
                code: patientId,
                requestCode: data.code || "",
                base64: files.base64,
                name: files.name,
              }),
            ),
          )
        : handleShowResume(data);
    },
    [attachmentMutation, handleShowResume, localBase64, patientId],
  );

  const onSuccess = useCallback(
    (data: Schemas.InterConsultationResp) => {
      handleUpFiles(data);
    },
    [handleUpFiles],
  );

  const {
    mutate,
    loading: creatingInterconsult,
  } = useAddNewInterConsultationMutation({
    onSuccess,
    showError: true,
  });

  const {
    mutate: updateInterConsultMutation,
    loading: updatingInterConsult,
  } = useUpdateInterConsultationMutation({
    showError: true,
    onSuccess,
  });

  const getRequestData = useCallback(
    (interConsultReq: Schemas.InterConsultationReq) => ({
      ...interConsultReq,
      clinicalProfile: interConsultReq.clinicalProfile || [],
      physicalExam: interConsultReq.physicalExam || [],
      analysis: interConsultReq.analysis || [],
      treatment: interConsultReq.treatment || [],
      examsProcedures: interConsultReq.examsProcedures || [],
      background: interConsultReq.background || [],
      results: interConsultReq.results || [],
      observations: interConsultReq.observations || [],
      allergies: interConsultReq.allergies || [],
      hasAllergies: interConsultReq.hasAllergies,
      medicineAllergies: interConsultReq.medicineAllergies || [],
      targetProfessionalLegalID:
        interConsultReq.targetProfessionalLegalID ||
        (interConsultReq as Schemas.InterConsultationResponse).toProfessional
          ?.legalID,
    }),
    [],
  );

  const handleAddNewInterConsult = useCallback(
    (interConsultReq: Schemas.InterConsultationReq) => {
      currentInterconsultationToEdit
        ? updateInterConsultMutation({
            ...getRequestData(interConsultReq),
            patientCode: patientId || "",
            code: currentInterconsultationToEdit?.code || "",
            requestCode: currentInterconsultationToEdit?.code || "",
          })
        : mutate({
            ...getRequestData(interConsultReq),
            code: patientId,
          });
    },
    [
      currentInterconsultationToEdit,
      getRequestData,
      mutate,
      patientId,
      updateInterConsultMutation,
    ],
  );

  const handleOpenAbstract = useCallback(() => {
    openAbstract(!abstract);
  }, [abstract]);

  const handleCloseForm = useCallback(() => {
    openAbstract(!abstract);
    handleShow();
  }, [abstract, handleShow]);

  const handleCloseAbstract = useCallback(() => {
    openAbstract(!abstract);
    handleShow();
  }, [abstract, handleShow]);

  const handleCloseEditMode = useCallback(() => {
    openAbstract(!abstract);
    handleShow();
  }, [abstract, handleShow]);
  return (
    <>
      <InterConsult
        loading={creatingInterconsult || updatingInterConsult || loading}
        initialValues={{
          ...currentInterconsultationToEdit,
          // eslint-disable-next-line max-len
          diagnoses:
            currentInterconsultationToEdit?.diagnoses ||
            interConsultationReqData?.diagnoses ||
            [],
        }}
        open={open}
        allergies={
          currentInterconsultationToEdit?.medicineAllergies || allergyList
        }
        otherAllergies={
          currentInterconsultationToEdit?.allergies || otherAllergyList
        }
        pathologies={pathologicList || []}
        handleShow={handleCloseForm}
        handleAddNewInterConsult={handleAddNewInterConsult}
        onHistoricalActionClicked={handleHistoricalActionClickedCallBack}
        uploadLocalProfessionalFile={uploadLocalProfessionalFile}
        attachingFiles={attachingFiles}
        localBase64={[...localBase64, ...currentAttachments]}
        deleteAttachmentItem={deleteAttachmentItem}
        backgroundFromCustomer={backgroundFromCustomer}
        patientAllergiesIndicator={
          currentInterconsultationToEdit?.hasAllergies ||
          patientAllergiesIndicator
        }
      />
      {abstract && (
        <InterConsultAbstractContainer
          handleShow={handleOpenAbstract}
          onCancel={handleCloseAbstract}
          open={abstract}
          interConsult={currentInterconsultationToEdit || {}}
          editAction
          handleDialogName={handleHistoricalActionClickedCallBack}
          handleCloseEditMode={handleCloseEditMode}
        />
      )}
    </>
  );
}
