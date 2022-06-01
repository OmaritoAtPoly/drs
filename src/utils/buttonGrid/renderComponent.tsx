import React from "react";
import CertificateContainer from "../../containers/customer/certificates/CertificateContainer";
import CertificateHistoryContainer from "../../containers/customer/certificates/CertificateHistoryContainer";
import SearchConsentTemplateContainer from "../../containers/customer/consents/SearchConsentTemplateContainer";
import SearchFilesTemplateContainer from "../../containers/customer/files/SearchFilesTemplateContainer";
import SearchInsuranceTemplateContainer from "../../containers/customer/insurances/SearchInsuranceTemplateContainer";
import InterConsultSwitcherComponentContainer from "../../containers/customer/interconsult/InterConsultSwitcherComponentContainer";
import RecipeContainer from "../../containers/customer/newRecipe/RecipeContainer";
import ProcedureContainer from "../../containers/customer/procedure/ProcedureContainer";
import ProcedureHistoryContainer from "../../containers/customer/procedure/ProcedureHistoryContainer";
import ReportContainer from "../../containers/customer/report/ReportContainer";
import ReportHistoryContainer from "../../containers/customer/report/ReportHistoryContainer";
import RequestHistoryContainer from "../../containers/customer/requests/history/RequestHistoryContainer";
import RequestContainer from "../../containers/customer/requests/RequestContainer";
import ResultContainer from "../../containers/customer/results/ResultContainer";
import STRINGS from "../strings";

interface Props {
  name: string;
  open: boolean;
  handleShow: () => void;
  handleDialogName: (dialogName: string) => void;
}

export default function renderComponent({
  name,
  handleShow,
  open,
  handleDialogName,
}: Props) {
  const handleNewInterConsult = () => (
    <InterConsultSwitcherComponentContainer
      componentName={STRINGS.buttonGrid.NEW_INTER_CONSULT}
      handleShow={handleShow}
      open={open}
    />
    );

  switch (name) {
    case STRINGS.buttonGrid.RX_REQUESTS:
      return <RequestContainer handleShow={handleShow} open={open} />;
    case STRINGS.buttonGrid.LAB_REQUESTS:
      return <RequestContainer handleShow={handleShow} open={open} />;
    case STRINGS.buttonGrid.OTHER_REQUEST:
      return <RequestContainer handleShow={handleShow} open={open} />;
    case STRINGS.buttonGrid.HISTORY_REQUESTS:
      return <RequestHistoryContainer handleShow={handleShow} open={open} />;
    case STRINGS.buttonGrid.RECIPES:
      return <RecipeContainer handleShow={handleShow} open={open} />;
    case STRINGS.buttonGrid.RESULTS:
      return <ResultContainer handleShow={handleShow} open={open} />;
    case STRINGS.buttonGrid.NEW_INTER_CONSULT:
      return handleNewInterConsult();
    case STRINGS.buttonGrid.HISTORICAL_INTER_CONSULT:
      return (
        <InterConsultSwitcherComponentContainer
          componentName={STRINGS.buttonGrid.HISTORICAL_INTER_CONSULT}
          handleShow={handleShow}
          open={open}
        />
      );
    case STRINGS.certificates.NEW_CERTIFICATE:
      return (
        <CertificateContainer
          handleShow={handleShow}
          open={open}
          handleDialogName={handleDialogName}
        />
      );
    case STRINGS.certificates.CERTIFICATE_HISTORY:
      return (
        <CertificateHistoryContainer
          handleShow={handleShow}
          open={open}
          handleDialogName={handleDialogName}
        />
      );
    case STRINGS.buttonGrid.FILES:
      return (
        <SearchFilesTemplateContainer handleShow={handleShow} open={open} />
      );
    case STRINGS.buttonGrid.INSURANCES:
      return (
        <SearchInsuranceTemplateContainer handleShow={handleShow} open={open} />
      );
    case STRINGS.reports.NEW_REPORT:
      return (
        <ReportContainer
          handleShow={handleShow}
          open={open}
          handleDialogName={handleDialogName}
        />
      );
    case STRINGS.reports.REPORTS_HISTORY:
      return (
        <ReportHistoryContainer
          handleShow={handleShow}
          open={open}
          handleDialogName={handleDialogName}
        />
      );
    case STRINGS.buttonGrid.INFORM_CONSENTS:
      return (
        <SearchConsentTemplateContainer handleShow={handleShow} open={open} />
      );
    case STRINGS.procedure.NEW_PROCEDURE:
      return (
        <ProcedureContainer
          handleShow={handleShow}
          open={open}
          handleDialogName={handleDialogName}
        />
      );
    case STRINGS.procedure.PROCEDURE_HISTORY:
      return (
        <ProcedureHistoryContainer
          handleShow={handleShow}
          open={open}
          handleDialogName={handleDialogName}
        />
      );
    default:
      return <div />;
  }
}
