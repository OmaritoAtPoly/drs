/* eslint-disable react/no-array-index-key */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import InterConsultHistoryPanelAction from "./ActionPanel";

const styles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  content: {
    display: "flex",
  },
  boldLabel: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  spanStyle: {
    display: "flex",
  },
  arrayInfoContainer: {
    display: "flex",
  },
  arrayInfoItem: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  actionContainer: {
    display: "flex",
    marginLeft: theme.spacing(2),
    alignItems: "center",
  },
  cardContainer: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    backgroundColor: "#F9F9F9",
    border: "1px solid #D6E3F3",
    cursor: "pointer",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    height: "35px",
  },
  labelStyle: {
    fontSize: "14px",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
  },
  iconButton: {
    height: theme.spacing(5),
  },
}));

interface Props {
  index: number;
  date: string;
  time: string;
  professionalName: string;
  diagnosis: string[];
  reason: string;
  visited: boolean;
  attachment: boolean;
  deleteLoading: boolean;
  informActionLabel: string;
  haveReport: boolean;
  affectedInterConsultCode: string;
  currentInterConsultCode: string;
  specialty?: string;
  targetProfessionalName?: string;
  loadingPrintClicked?: boolean;
  loadingMailClicked?: boolean;
  loadingCellClicked?: boolean;
  fromrecievedInterconsult?: boolean;
  onInterConsultSheetClicked: () => void;
  onDeleteClicked: () => void;
  onReportClicked: () => void;
  handleEdit?: () => void;
  handleMailClicked?: () => void;
  handleCellClicked?: () => void;
  handlePrintClicked?: () => void;
}

export default function InterConsultHistoryItem({
  index,
  date,
  time,
  professionalName,
  diagnosis,
  reason,
  visited,
  deleteLoading,
  attachment,
  informActionLabel,
  haveReport,
  affectedInterConsultCode,
  currentInterConsultCode,
  specialty = "",
  loadingPrintClicked,
  loadingMailClicked,
  loadingCellClicked,
  fromrecievedInterconsult,
  onDeleteClicked,
  onInterConsultSheetClicked,
  onReportClicked,
  targetProfessionalName = "",
  handleEdit,
  handleMailClicked,
  handleCellClicked,
  handlePrintClicked,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography>{index}</Typography>
        <div>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.DATE}
            </Typography>
            <Typography>{date}</Typography>
          </span>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.TIME}
            </Typography>
            <Typography>{time}</Typography>
          </span>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.INTER_CONSULTER_PROFESSIONAL}
            </Typography>
            <Typography>{professionalName}</Typography>
          </span>
          {targetProfessionalName && (
            <span className={classes.spanStyle}>
              <Typography className={classes.boldLabel}>
                {STRINGS.interconsult.TO_PROFESSIONAL}
              </Typography>
              <Typography>{targetProfessionalName}</Typography>
            </span>
          )}
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {`${STRINGS.generals.SPECIALTY}:`}
            </Typography>
            <Typography>{specialty}</Typography>
          </span>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.DIAGNOSES}
            </Typography>
            <span className={classes.arrayInfoContainer}>
              {diagnosis.map((dg, idx) => (
                <Typography key={idx} className={classes.arrayInfoItem}>
                  {dg}
                </Typography>
              ))}
            </span>
          </span>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.INTER_CONSULTER_REASON}
            </Typography>
            <Typography>{reason}</Typography>
          </span>
        </div>
      </div>
      <div className={classes.actionContainer}>
        <InterConsultHistoryPanelAction
          visited={visited}
          attachment={attachment}
          deleteLoading={deleteLoading}
          informActionLabel={informActionLabel}
          haveReport={haveReport}
          affectedInterConsultCode={affectedInterConsultCode}
          currentInterConsultCode={currentInterConsultCode}
          loadingCellClicked={loadingCellClicked}
          loadingMailClicked={loadingMailClicked}
          loadingPrintClicked={loadingPrintClicked}
          onDeleteClicked={onDeleteClicked}
          onInterConsultSheetClicked={onInterConsultSheetClicked}
          onReportClicked={onReportClicked}
          handleEdit={handleEdit}
          handleMailClicked={handleMailClicked}
          handleCellClicked={handleCellClicked}
          handlePrintClicked={handlePrintClicked}
          fromrecievedInterconsult={fromrecievedInterconsult}
        />
      </div>
    </div>
  );
}
