import React from "react";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import InterConsultForm from "./InterConsultForm";
import ActionInterConsult from "./ActionInterConsult";

interface Props {
  initialValues: Schemas.InterConsultationReq;
  open: boolean;
  allergies: string[];
  otherAllergies: string[];
  pathologies: Schemas.CustomerPathologyData[];
  loading: boolean;
  handleShow: () => void;
  handleAddNewInterConsult: (
    interConsultRequest: Schemas.InterConsultationReq,
  ) => void;
  onHistoricalActionClicked: () => void;
  uploadLocalProfessionalFile: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  attachingFiles: boolean;
  localBase64: Schemas.ResultFileRequest[];
  deleteAttachmentItem: (name: string) => void;
  backgroundFromCustomer?: Schemas.InterConsultationReq;
  patientAllergiesIndicator: string;
}

export default function InterConsult({
  initialValues,
  open,
  allergies,
  otherAllergies,
  pathologies,
  loading,
  handleShow,
  handleAddNewInterConsult,
  onHistoricalActionClicked,
  uploadLocalProfessionalFile,
  attachingFiles,
  localBase64,
  deleteAttachmentItem,
  backgroundFromCustomer,
  patientAllergiesIndicator,
}: Props) {
  return (
    <LabeledDialog
      label={STRINGS.interconsult.NEW_INTERCONSULT}
      open={open}
      actionPanel={
        <ActionInterConsult
          handleHistoricalActionClicked={onHistoricalActionClicked}
          handleClose={handleShow}
          historyToolTipLabel="Historial"
          closeToolTipLabel="Cerrar"
        />
      }
      handleShow={handleShow}>
      <InterConsultForm
        initialValues={initialValues}
        allergies={allergies}
        otherAllergies={otherAllergies}
        pathologies={pathologies}
        loading={loading}
        handleMode={handleShow}
        handleAddNewInterConsult={handleAddNewInterConsult}
        uploadLocalProfessionalFile={uploadLocalProfessionalFile}
        attachingFiles={attachingFiles}
        localBase64={localBase64}
        deleteAttachmentItem={deleteAttachmentItem}
        backgroundFromCustomer={backgroundFromCustomer}
        patientAllergiesIndicator={patientAllergiesIndicator}
      />
    </LabeledDialog>
  );
}
