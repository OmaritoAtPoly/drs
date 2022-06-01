/* eslint-disable consistent-return */
import moment from "moment";
import React, { useCallback, useState } from "react";
import STRINGS from "../../../../../utils/strings";
import { fullName } from "../../../../../utils/user";
import LabeledDialog from "../../../../dialogs/LabeledDialog";
import ListSkeleton from "../../../../skeletons/ListSkeleton";
import RequestItemHistory from "../../request/history/RequestItem";
import NoItemToShow from "../../request/NoItemToShow";
import HistoryActionPanel from "../HistoryActionPanel";

interface Props {
  currentPatient?: Schemas.CustomerData;
  open: boolean;
  handleShow: () => void;
  certificatesData?: Schemas.CertificateResponse[];
  loadingData?: boolean;
  deleteLoading: boolean;
  handleDeleteCertificate: (requestCode?: string) => void;
  handlePrintPdf: (requestCode?: string) => void;
  loadingPrintPdf?: boolean;
  handleNewCertificate: () => void;
  handleEditCertificate: (value: Schemas.CertificateResponse) => void;
  handleRequestClicked: (value: Schemas.CertificateResponse) => void;
  handlePatientCellClicked: (code: string) => void;
  handleMailClicked: (code: string) => void;
  loadingSendingByEmail?: boolean;
  loadingSendingCell?: boolean;
}

export default function CertificateHistoryDialog({
  currentPatient,
  handleShow,
  open,
  certificatesData,
  loadingData,
  handleDeleteCertificate,
  deleteLoading,
  handlePrintPdf,
  loadingPrintPdf,
  handleNewCertificate,
  handleEditCertificate,
  handlePatientCellClicked,
  handleMailClicked,
  loadingSendingByEmail = false,
  loadingSendingCell = false,
  handleRequestClicked,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEditCallBack = useCallback((code: string) => () => {}, []);
  const [currentToDelete, setCurrentToDelete] = useState<string | undefined>();
  const [currentToPrint, setCurrentToPrint] = useState<string | undefined>();
  const [currentEmail, setCurrentEmail] = useState<string | undefined>();
  const [currentCell, setCurrentCell] = useState<string | undefined>();

  const onDelete = useCallback(
    (code: string) => () => {
      setCurrentToDelete(code);
      handleDeleteCertificate(code);
    },
    [handleDeleteCertificate],
  );

  const onPrintCallBack = useCallback(
    (code: string) => () => {
      setCurrentToPrint(code);
      handlePrintPdf(code);
    },
    [handlePrintPdf],
  );

  const handleEditCertificateCallBack = useCallback(
    (value: Schemas.CertificateResponse) => () => {
      handleEditCertificate(value);
    },
    [handleEditCertificate],
  );

  const handleRequestClickCallBack = useCallback(
    (value: Schemas.CertificateResponse) => () => {
      handleRequestClicked(value);
    }, [handleRequestClicked]);

  const handlePatientOnCellClicked = useCallback(
    (code: string) => () => {
      setCurrentCell(code);
      handlePatientCellClicked(code);
    },
    [handlePatientCellClicked],
  );
  const handleMailOnClicked = useCallback(
    (code: string) => () => {
      setCurrentEmail(code);
      handleMailClicked(code);
    },
    [handleMailClicked],
  );

  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.certificates.CERTIFICATE_HISTORY}
      actionPanel={
        <HistoryActionPanel
          handleNewCertificate={handleNewCertificate}
          onClose={handleShow}
        />
      }>
      <div>
        {loadingData ? (
          <ListSkeleton />
        ) : (
          <span>
            {certificatesData && certificatesData.length > 0 ? (
              // eslint-disable-next-line array-callback-return
              certificatesData.map((a, index) => {
                const key = Math.random();
                if (a.code && a.diagnoses) {
                  return (
                    <RequestItemHistory
                      key={key}
                      code={a.code && a.code}
                      date={`${a.createdAt?.dateDay}/${a.createdAt?.dateMonth}/${a.createdAt?.dateYear}`}
                      deleteRequest={onDelete(a.code)}
                      loadingDelete={
                        currentToDelete === a.code && deleteLoading
                      }
                      handleEditRequestClick={handleEditCertificateCallBack(a)}
                      onRequestClick={handleRequestClickCallBack(a)}
                      time={moment(
                        `${a.createdAt?.timeHour || 0}:${a.createdAt?.timeMinute || 0
                        }`,
                        "hh:mm",
                      ).format("hh:mm A")}
                      diagnosis={
                        a.diagnoses?.map((d) => d.description || "") || []
                      }
                      patientName={fullName(currentPatient)}
                      index={index + 1}
                      onPrint={onPrintCallBack(a.code)}
                      loadingPrint={
                        currentToPrint === a.code && loadingPrintPdf
                      }
                      handlePatientCellClicked={handlePatientOnCellClicked(
                        a.code,
                      )}
                      handleMailClicked={handleMailOnClicked(a.code)}
                      loadingSendingByEmail={
                        currentEmail === a.code && loadingSendingByEmail
                      }
                      loadingSendingCell={
                        currentCell === a.code && loadingSendingCell
                      }
                    />
                  );
                }
              })
            ) : (
              <NoItemToShow value={STRINGS.certificates.NEW_CERTIFICATE} />
            )}
          </span>
        )}
      </div>
    </LabeledDialog>
  );
}
