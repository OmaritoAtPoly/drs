/* eslint-disable no-confusing-arrow */
/* eslint-disable react/no-array-index-key */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import useProfileCacheSelector from "../../../../../modules/profile/cacheSelector";
import STRINGS from "../../../../../utils/strings";
import { fullName } from "../../../../../utils/user";
import InterConsultHistoryItem from "./InterConsultHistoryItem";

const styles = makeStyles((theme: Theme) => ({
  item: { margin: theme.spacing(1) },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  notResult: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Props {
  interConsults: Schemas.InterConsultationResp[];
  deleteLoading: boolean;
  loadingPrintClicked?: boolean;
  loadingMailClicked?: boolean;
  loadingCellClicked?: boolean;
  onInterConsultSheetClicked: (code: string) => void;
  onDeleteClicked: (code: string) => void;
  onReportClicked: (code: string) => void;
  handleEdit: (interConsult: Schemas.InterConsultationResp) => void;
  handleMailClicked?: (code: string) => void;
  handleCellClicked?: (code: string) => void;
  handlePrintClicked?: (code: string) => void;
}

export default function MadeInterConsult({
  interConsults,
  deleteLoading,
  loadingPrintClicked,
  loadingMailClicked,
  loadingCellClicked,
  onDeleteClicked,
  onInterConsultSheetClicked,
  onReportClicked,
  handleEdit,
  handleMailClicked,
  handleCellClicked,
  handlePrintClicked,
}: Props) {
  const classes = styles();
  const [currentCode, setCurrentCode] = useState<string>("");
  const [affectedCode, setAffectedCode] = useState<string>("");
  const { currentProfessional } = useProfileCacheSelector();

  const handleOnDeleteClicked = useCallback(
    (code: string) => {
      setCurrentCode(code);
      setAffectedCode(code);
      onDeleteClicked(code);
    },
    [onDeleteClicked],
  );

  const getDiagnosesAsString = useCallback(
    (interConsult: Schemas.InterConsultationResp) =>
      interConsult.diagnoses?.map((diagnose) => ` ${diagnose.description},`),
    [],
  );

  const handleDeleteClicked = useCallback(
    (code: string) => () => {
      handleOnDeleteClicked(code);
    },
    [handleOnDeleteClicked],
  );

  const handleInterConsultSheetClicked = useCallback(
    (code: string) => () => {
      onInterConsultSheetClicked(code);
    },
    [onInterConsultSheetClicked],
  );
  const handleReportClicked = useCallback(
    (code: string) => () => {
      onReportClicked(code);
    },
    [onReportClicked],
  );

  const handleEditCallBack = useCallback(
    (interConsult: Schemas.InterConsultationResp) => () => {
      handleEdit(interConsult);
    },
    [handleEdit],
  );

  const handleSendByMailClicked = useCallback(
    (code: string) => () => {
      setCurrentCode(code);
      setAffectedCode(code);
      handleMailClicked && handleMailClicked(code);
    },
    [handleMailClicked],
  );

  const handleSendByCellClicked = useCallback(
    (code: string) => () => {
      setCurrentCode(code);
      setAffectedCode(code);
      handleCellClicked && handleCellClicked(code);
    },
    [handleCellClicked],
  );

  const handlePdfPrintClicked = useCallback(
    (code: string) => () => {
      setCurrentCode(code);
      setAffectedCode(code);
      handlePrintClicked && handlePrintClicked(code);
    },
    [handlePrintClicked],
  );

  const renderInterConsultList = useCallback(
    () =>
      interConsults.length > 0 ? (
        interConsults.map((interConsult, index) => (
          <div key={index} className={classes.item}>
            <InterConsultHistoryItem
              index={index + 1}
              date={`${interConsult.createdAt?.dateDay}/${interConsult.createdAt?.dateMonth}/${interConsult.createdAt?.dateYear}`}
              time={`${interConsult.createdAt?.timeHour}:${interConsult.createdAt?.timeMinute}`}
              diagnosis={getDiagnosesAsString(interConsult) || []}
              visited
              professionalName={fullName(currentProfessional)}
              reason={interConsult.reason || ""}
              attachment={
                (interConsult.attachments &&
                  interConsult.attachments?.length > 0) ||
                false
              }
              deleteLoading={currentCode === interConsult.code && deleteLoading}
              informActionLabel={STRINGS.interconsult.INTERCONSULT_INFORM}
              haveReport={!!interConsult.report}
              affectedInterConsultCode={affectedCode}
              currentInterConsultCode={currentCode}
              loadingPrintClicked={
                currentCode === interConsult.code && loadingPrintClicked
              }
              loadingMailClicked={
                currentCode === interConsult.code && loadingMailClicked
              }
              loadingCellClicked={
                currentCode === interConsult.code && loadingCellClicked
              }
              onDeleteClicked={handleDeleteClicked(interConsult.code || "")}
              onInterConsultSheetClicked={handleInterConsultSheetClicked(
                interConsult.code || "",
              )}
              onReportClicked={handleReportClicked(interConsult.code || "")}
              specialty={interConsult.toSpecialty?.name}
              targetProfessionalName={interConsult.targetProfessionalName}
              handleEdit={handleEditCallBack(interConsult)}
              handleMailClicked={handleSendByMailClicked(
                interConsult.code || "",
              )}
              handleCellClicked={handleSendByCellClicked(
                interConsult.code || "",
              )}
              handlePrintClicked={handlePdfPrintClicked(
                interConsult.code || "",
              )}
            />
          </div>
        ))
      ) : (
        <div className={classes.notResult}>
          <Typography color="error" variant="h6">
            {STRINGS.interconsult.NOT_RESULTS}
          </Typography>
        </div>
      ),
    [
      interConsults,
      classes.notResult,
      classes.item,
      getDiagnosesAsString,
      currentProfessional,
      currentCode,
      deleteLoading,
      affectedCode,
      loadingPrintClicked,
      loadingMailClicked,
      loadingCellClicked,
      handleDeleteClicked,
      handleInterConsultSheetClicked,
      handleReportClicked,
      handleEditCallBack,
      handleSendByMailClicked,
      handleSendByCellClicked,
      handlePdfPrintClicked,
    ],
  );

  return (
    <div>
      <Typography className={classes.title} color="primary">
        {STRINGS.interconsult.MADE_BY_ME}
      </Typography>
      {renderInterConsultList()}
    </div>
  );
}
