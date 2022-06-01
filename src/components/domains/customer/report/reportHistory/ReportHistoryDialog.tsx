/* eslint-disable consistent-return */
import React, { useCallback, useState } from "react";
import STRINGS from "../../../../../utils/strings";
import { fullName } from "../../../../../utils/user";
import LabeledDialog from "../../../../dialogs/LabeledDialog";
import ListSkeleton from "../../../../skeletons/ListSkeleton";

import NoItemToShow from "../../request/NoItemToShow";
import HistoryActionPanel from "../HistoryActionPanel";
import ItemReport from "../ItemReport";

interface Props {
  currentPatient?: Schemas.CustomerData;
  open: boolean;
  handleShow: () => void;
  reportData?: Schemas.ReportResponse[];
  loadingData?: boolean;
  deleteLoading: boolean;
  handleDeleteReport: (requestCode?: string) => void;
  handlePrintPdf: (requestCode?: string) => void;
  handlePatientByCell: (requestCode: string) => void;
  handlePatientByEmail: (requestCode: string) => void;
  loadingPrintPdf?: boolean;
  handleNewReport: () => void;
  handleEditReport: (value: Schemas.ReportResponse) => void;
  handleRequestClicked: (value: Schemas.ReportResponse) => void;
  loadingSendingCell?: boolean;
  loadingSendingByEmail?: boolean;
}

export default function ReportHistoryDialog({
  currentPatient,
  handleShow,
  open,
  reportData,
  loadingData,
  handleDeleteReport,
  deleteLoading,
  handlePrintPdf,
  loadingPrintPdf,
  handleNewReport,
  handleEditReport,
  handlePatientByCell,
  loadingSendingCell = false,
  loadingSendingByEmail = false,
  handlePatientByEmail,
  handleRequestClicked,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEditCallBack = useCallback((code: string) => () => {}, []);
  const [currentToDelete, setCurrentToDelete] = useState<string | undefined>();
  const [currentToPrint, setCurrentToPrint] = useState<string | undefined>();
  const [currentToCell, setCurrentToCell] = useState<string | undefined>();
  const [currentByEmail, setCurrentByEmail] = useState<string | undefined>();

  const handleDelete = useCallback(
    (code: string) => () => {
      setCurrentToDelete(code);
      handleDeleteReport(code);
    },
    [handleDeleteReport],
  );

  const handlePrintCallBack = useCallback(
    (code: string) => () => {
      setCurrentToPrint(code);
      handlePrintPdf(code);
    },
    [handlePrintPdf],
  );
  const handlePatientByCellClicked = useCallback(
    (code: string) => () => {
      setCurrentToCell(code);
      handlePatientByCell(code || "");
    },
    [handlePatientByCell],
  );

  const handleSendByEmail = useCallback(
    (code: string) => () => {
      setCurrentByEmail(code);
      handlePatientByEmail(code || "");
    },
    [handlePatientByEmail],
  );

  const handleEditReportCallBack = useCallback(
    (value: Schemas.ReportResponse) => () => {
      handleEditReport(value);
    },
    [handleEditReport],
  );

  const handleRequestClickCallBack = useCallback(
    (value: Schemas.ReportResponse) => () => {
      handleRequestClicked(value);
  }, [handleRequestClicked]);

  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.reports.REPORTS_HISTORY}
      actionPanel={
        <HistoryActionPanel
          handleNewReport={handleNewReport}
          onClose={handleShow}
        />
      }>
      <div>
        {loadingData ? (
          <ListSkeleton />
        ) : (
          <span>
            {reportData && reportData.length > 0 ? (
              // eslint-disable-next-line array-callback-return
              reportData.map((a, index) => {
                const key = Math.random();
                if (a.code) {
                  return (
                    <ItemReport
                      key={key}
                      code={a.code && a.code}
                      date={`${a.createdAt?.dateDay}/${a.createdAt?.dateMonth}/${a.createdAt?.dateYear}`}
                      deleteRequest={handleDelete(a.code)}
                      loadingDelete={
                        currentToDelete === a.code && deleteLoading
                      }
                      handleEditRequest={handleEditReportCallBack(a)}
                      handleRequestClick={handleRequestClickCallBack(a)}
                      time={`${a.createdAt?.timeHour}:${a.createdAt?.timeMinute}`}
                      patientName={fullName(currentPatient)}
                      index={index + 1}
                      details={a.details?.map((d) => d || "") || []}
                      handlePrint={handlePrintCallBack(a.code)}
                      loadingPrint={
                        currentToPrint === a.code && loadingPrintPdf
                      }
                      handlePatientByCell={handlePatientByCellClicked(a.code)}
                      loadingSendingCell={
                        currentToCell === a.code && loadingSendingCell
                      }
                      handleSendByEmail={handleSendByEmail(a.code)}
                      loadingByEmail={
                        currentByEmail === a.code && loadingSendingByEmail
                      }
                    />
                  );
                }
              })
            ) : (
              <NoItemToShow value={STRINGS.reports.NEW_REPORT} />
            )}
          </span>
        )}
      </div>
    </LabeledDialog>
  );
}
