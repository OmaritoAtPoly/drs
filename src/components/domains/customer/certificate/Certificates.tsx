import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import ActionCertificatesResume from "./ActionCertificatesResume";
import CertificateResumeDialog from "./CertificateResumeDialog";
import CertificatesForm from "./CertificatesForm";

interface Props {
  initialValue: Schemas.CertificateRequest;
  open: boolean;
  handleShow: () => void;
  resumeOpen?: boolean;
  handleResumeShow: () => void;
  handleDialogName: (labelName: string) => void;
  handleMailClicked: (requestCode?: string) => void;
  handlePrint: (requestCode?: string) => void;
  onAddOrEditCertificate: (values: Schemas.CertificateRequest) => void;
  handlePatientCellClicked: (requestCode?: string) => void;
  loadingSendByCell?: boolean;
  loadingSendingByEmail?: boolean;
  loadingPrint?: boolean;
  loadingCertificate?: boolean;
  withDefinitiveDiagnosis: boolean;
  withComment: boolean;
  customer: Schemas.CustomerData;
}

export default function Certificates({
  initialValue,
  open,
  handleShow,
  resumeOpen = false,
  handleResumeShow,
  handleDialogName,
  handleMailClicked,
  onAddOrEditCertificate,
  handlePrint,
  handlePatientCellClicked,
  loadingSendingByEmail,
  loadingPrint,
  loadingCertificate,
  loadingSendByCell,
  withDefinitiveDiagnosis,
  withComment,
  customer,
}: Props) {
  const handleHistoryDialog = useCallback(
    () => handleDialogName(STRINGS.certificates.CERTIFICATE_HISTORY),
    [handleDialogName],
  );

  return (
    <>
      <LabeledDialog
        label={STRINGS.certificates.NEW_CERTIFICATE}
        open={open}
        handleShow={handleShow}
        onHistoryClicked={handleHistoryDialog}
        actionPanel={
          <ActionCertificatesResume
            onHistoryClicked={handleHistoryDialog}
            handleClose={handleShow}
          />
        }>
        <CertificatesForm
          handleSubmit={onAddOrEditCertificate}
          handleShow={handleShow}
          loadingCertificate={loadingCertificate}
          initialValue={initialValue}
          withDefinitiveDiagnosis={withDefinitiveDiagnosis}
          withComment={withComment}
          customer={customer}
        />
      </LabeledDialog>
      <CertificateResumeDialog
        handleShow={handleResumeShow}
        open={resumeOpen}
        initialData={initialValue}
        handleMailClicked={handleMailClicked}
        handlePatientCellClicked={handlePatientCellClicked}
        handlePrint={handlePrint}
        loadingPrint={loadingPrint}
        loadingSendByCell={loadingSendByCell}
        loadingSendingByEmail={loadingSendingByEmail}
        onHistoryClicked={handleHistoryDialog}
        handleClose={handleShow}
        withDefinitiveDiagnosis={withDefinitiveDiagnosis}
        customer={customer}
      />
    </>
  );
}
