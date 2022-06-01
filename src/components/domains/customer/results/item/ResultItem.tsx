/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import STRINGS from "../../../../../utils/strings";
import ActionPanel from "./ActionPanel";

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
  patientName: string;
  diagnosis: string[];
  request: string[];
  visited?: boolean;
  handleOnPrintClicked: () => void;
  handleSendEmail: () => void;
  loadingSendEmail?: boolean;
  loadingResultPdf?: boolean;
  handleInform?: () => void;
  loadingHandleInform?: boolean;
  handleDeleteResult: () => void;
  loadingDeleteResult?: boolean;
  handlePatientCellClicked: () => void;
  loadingSendingCell?: boolean;
  requestType?: string;
  title: string;
  handleEditResult: () => void;
  editable: boolean;
}

export default function ResultItem({
  title,
  requestType,
  index,
  date,
  time,
  patientName,
  diagnosis,
  request,
  handleInform,
  visited = false,
  handleOnPrintClicked,
  loadingResultPdf = false,
  handleSendEmail,
  loadingSendEmail = false,
  loadingHandleInform = false,
  loadingDeleteResult = false,
  handleDeleteResult,
  handlePatientCellClicked,
  handleEditResult,
  loadingSendingCell,
  editable,
}: Props) {
  const classes = styles();

  const requestTypeMemo = useMemo(() => {
    switch (requestType) {
      case "other":
        return STRINGS.generals.OTHER_REQUESTS;
      case "image":
        return STRINGS.generals.IMAGES;
      case "laboratory":
        return STRINGS.generals.LAB;
      default:
        return "";
    }
  }, [requestType]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div>
          <Typography>{index}</Typography>
        </div>
        <div>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.generals.TITLE}
            </Typography>
            <Typography>{title}</Typography>
          </span>
          <span className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.REQUEST}
            </Typography>
            <Typography>{requestTypeMemo}</Typography>
          </span>
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
              {STRINGS.historical.PATIENT_NAME}
            </Typography>
            <Typography>{patientName}</Typography>
          </span>
          {diagnosis && !!diagnosis.length && (
            <span className={classes.spanStyle}>
              <Typography className={classes.boldLabel}>
                {STRINGS.historical.DIAGNOSES}
              </Typography>
              <span className={classes.arrayInfoContainer}>
                {diagnosis.map((dg, index) => (
                  <Typography key={index} className={classes.arrayInfoItem}>
                    {dg}
                  </Typography>
                ))}
              </span>
            </span>
          )}
          {request && !!request.length && (
            <span className={classes.spanStyle}>
              <Typography className={classes.boldLabel}>
                {STRINGS.historical.LOWER_REQUEST}
              </Typography>
              <span className={classes.arrayInfoContainer}>
                {request.map((rqt, index) => (
                  <Typography key={index} className={classes.arrayInfoItem}>
                    {rqt}
                  </Typography>
                ))}
              </span>
            </span>
          )}
        </div>
      </div>
      <div className={classes.actionContainer}>
        <ActionPanel
          visited={visited}
          handleOnPrintClicked={handleOnPrintClicked}
          loadingResultPdf={loadingResultPdf}
          handleSendEmail={handleSendEmail}
          loadingSendEmail={loadingSendEmail}
          handleInform={handleInform}
          loadingHandleInform={loadingHandleInform}
          handleDeleteResult={handleDeleteResult}
          loadingDeleteResult={loadingDeleteResult}
          handlePatientCellClicked={handlePatientCellClicked}
          handleEditResult={handleEditResult}
          loadingSendingCell={loadingSendingCell}
          editable={editable}
        />
      </div>
    </div>
  );
}
