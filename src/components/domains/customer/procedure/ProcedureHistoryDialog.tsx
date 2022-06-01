/* eslint-disable consistent-return */
import React, { useCallback, useState } from "react";
import STRINGS from "../../../../utils/strings";
import { fullName } from "../../../../utils/user";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import RequestItemHistory from "../request/history/RequestItem";
import NoItemToShow from "../request/NoItemToShow";
import ProcedureActionPanel from "./HistoryActionPanel";

interface Props {
  currentPatient?: Schemas.CustomerData;
  open: boolean;
  procedureData?: Schemas.ProcedureResponse[];
  loadingData?: boolean;
  deleteLoading: boolean;
  loadingPrintPdf?: boolean;
  loadingSendEmail: boolean;
  loadingSendCell: boolean;
  handleShow: () => void;
  handleDeleteProcedure: (requestCode: string) => void;
  handlePrintPdf: (requestCode?: string) => void;
  handleNewProcedure: (value: string) => void;
  handleShowResume?: (requestCode: string) => void;
  handleSendEmail: (requestCode: string) => void;
  handleCellAction: (requestCode: string) => void;
  handleEditAction: (requestCode: string) => void;
}

export default function ProcedureHistoryDialog({
  currentPatient,
  open,
  procedureData,
  loadingData,
  deleteLoading,
  loadingPrintPdf,
  loadingSendEmail,
  loadingSendCell,
  handleShow,
  handleDeleteProcedure,
  handlePrintPdf,
  handleNewProcedure,
  handleShowResume,
  handleCellAction,
  handleEditAction,
  handleSendEmail,
}: Props) {
  const [currentToDelete, setCurrentToDelete] = useState<string | undefined>();
  const [currentToPrint, setCurrentToPrint] = useState<string | undefined>();
  const [currentToSendEmail, setCurrentToSendEmail] = useState<
    string | undefined
  >();
  const [currentToSendCell, setCurrentToSendCell] = useState<
    string | undefined
  >();

  const onDelete = useCallback(
    (code: string) => () => {
      setCurrentToDelete(code);
      handleDeleteProcedure(code);
    },
    [handleDeleteProcedure],
  );

  const onPrintCallBack = useCallback(
    (code: string) => () => {
      setCurrentToPrint(code);
      handlePrintPdf(code);
    },
    [handlePrintPdf],
  );

  const handleSendEmailCallBack = useCallback(
    (code: string) => () => {
      setCurrentToSendEmail(code);
      handleSendEmail(code);
    },
    [handleSendEmail],
  );

  const handleSendCellCallBack = useCallback(
    (code: string) => () => {
      setCurrentToSendCell(code);
      handleCellAction(code);
    },
    [handleCellAction],
  );

  const handleEditCallBack = useCallback(
    (code: string) => () => {
      handleEditAction(code);
    },
    [handleEditAction],
  );

  const handleOnResumeClick = useCallback(
    (requestCode: string) => () => {
      handleShowResume && handleShowResume(requestCode);
    },
    [handleShowResume],
  );

  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.procedure.PROCEDURE_HISTORY}
      actionPanel={
        <ProcedureActionPanel
          handleNewProcedure={handleNewProcedure}
          onClose={handleShow}
        />
      }>
      <div>
        {loadingData ? (
          <ListSkeleton />
        ) : (
          <span>
            {procedureData && procedureData.length > 0 ? (
              // eslint-disable-next-line array-callback-return
              procedureData.map((a, index) => {
                const key = Math.random();
                if (a.code && a.diagnoses) {
                  return (
                    <RequestItemHistory
                      key={key}
                      procedure
                      name={a.name}
                      code={a.code && a.code}
                      date={`${a.createdAt?.dateDay}/${a.createdAt?.dateMonth}/${a.createdAt?.dateYear}`}
                      deleteRequest={onDelete(a.code)}
                      loadingDelete={
                        currentToDelete === a.code && deleteLoading
                      }
                      onRequestClick={handleOnResumeClick(a.code)}
                      time={`${a.createdAt?.timeHour}:${a.createdAt?.timeMinute}`}
                      diagnosis={
                        a.diagnoses?.map((d) => d.description || "") || []
                      }
                      patientName={fullName(currentPatient)}
                      index={index + 1}
                      onPrint={onPrintCallBack(a.code)}
                      loadingPrint={
                        currentToPrint === a.code && loadingPrintPdf
                      }
                      handleMailClicked={handleSendEmailCallBack(a.code)}
                      loadingSendingByEmail={
                        currentToSendEmail === a.code && loadingSendEmail
                      }
                      handlePatientCellClicked={handleSendCellCallBack(a.code)}
                      loadingSendingCell={
                        currentToSendCell === a.code && loadingSendCell
                      }
                      handleEditRequestClick={handleEditCallBack(a.code)}
                    />
                  );
                }
              })
            ) : (
              <NoItemToShow value={STRINGS.procedure.PROCEDURE} />
            )}
          </span>
        )}
      </div>
    </LabeledDialog>
  );
}
