/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";

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
  spanStyleToBottom: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  spanStyleScroll: {
    display: "flex",
    width: "100%",
    overflowY: "scroll",
    maxHeight: theme.spacing(15),
  },
  arrayInfoContainerScroll: {
    display: "flex",
    flexDirection: "column",
    textAlign: "justify",
    width: "100%",
  },
  arrayInfoContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "justify",
  },
  arrayInfoItem: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  full: {
    width: "100%",
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  actionContainer: {
    display: "flex",
    marginLeft: 25,
    alignItems: "center",
  },
  cardContainer: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    backgroundColor: "#F9F9F9",
    border: "1px solid #D6E3F3",
    cursor: "pointer",
    marginRight: 20,
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
  button: {
    margin: 4,
  },
  classNameWrapper: {
    margin: 0,
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
  divFull: {
    width: "100%",
  },
}));

interface Props {
  code: string;
  index?: number;
  requestType?: string;
  date: string;
  time: string;
  patientName: string;
  diagnosis: string[];
  request?: string[];
  deleteRequest?: (code: string) => void;
  loadingDelete?: boolean;
  onRequestClick?: () => void;
  handleEditRequestClick?: () => void;
  onPrint?: (code: string) => void;
  loadingPrint?: boolean;
  handleDuplicateRequest?: (value?: string) => void;
  selected?: boolean;
  handlePatientCellClicked?: (code: string) => void;
  handleMailClicked?: (code: string) => void;
  loadingSendingCell?: boolean;
  loadingSendingByEmail?: boolean;
  name?: string;
  procedure?: boolean;
}

export default function RequestItemHistory({
  code,
  index,
  requestType,
  date,
  time,
  patientName,
  diagnosis,
  request,
  deleteRequest,
  loadingDelete,
  onRequestClick,
  handleEditRequestClick,
  onPrint,
  loadingPrint,
  handleDuplicateRequest,
  selected,
  handlePatientCellClicked,
  handleMailClicked,
  loadingSendingCell = false,
  loadingSendingByEmail = false,
  name = "",
  procedure = false,
}: Props) {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    deleteRequest && deleteRequest(code);
  }, [code, deleteRequest]);

  const onPrintCallBack = useCallback(() => {
    onPrint && onPrint(code);
  }, [code, onPrint]);

  const handleDuplicateCallBack = useCallback(() => {
    handleDuplicateRequest && handleDuplicateRequest(requestType);
  }, [handleDuplicateRequest, requestType]);

  const handlePatientOnCellClicked = useCallback(() => {
    handlePatientCellClicked && handlePatientCellClicked(code);
  }, [code, handlePatientCellClicked]);

  const handleOnMailClicked = useCallback(() => {
    handleMailClicked && handleMailClicked(code);
  }, [code, handleMailClicked]);

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
    <div className={`${classes.container} ${selected ? classes.selected : ""}`}>
      <div className={classes.content}>
        <div>{index && <Typography>{index}</Typography>}</div>
        <div className={classes.divFull}>
          {requestType &&
            <span className={classes.spanStyle}>
              <Typography className={classes.boldLabel}>
                {STRINGS.historical.REQUEST}
              </Typography>
              <Typography>{requestTypeMemo}</Typography>
            </span>}
          {procedure && (
            <span className={classes.spanStyle}>
              <Typography className={classes.boldLabel}>
                {`${STRINGS.error.ADD_PROCEDURE_NAME}:`}
              </Typography>
              <Typography>{name}</Typography>
            </span>
          )}
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
          <span
            className={request ? classes.spanStyle : classes.spanStyleToBottom}>
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
          {request && (
            <div className={classes.spanStyleScroll}>
              <Typography className={classes.boldLabel}>
                {STRINGS.historical.LOWER_REQUEST}
              </Typography>
              <div className={classes.arrayInfoContainer}>
                {request &&
                  request.map((rqt, index) => (
                    <Typography key={index} className={classes.full}>
                      {rqt}
                    </Typography>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.actionContainer}>
        {onRequestClick && (
          <BadgedButton
            iconName="openEye"
            onClick={onRequestClick}
            iconWidth={15}
            iconHeight={15}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {handleEditRequestClick && (
          <BadgedButton
            iconName="edit"
            onClick={handleEditRequestClick}
            iconWidth={15}
            iconHeight={15}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {handleDuplicateRequest && (
          <BadgedButton
            iconName="duplicate"
            onClick={handleDuplicateCallBack}
            iconWidth={15}
            iconHeight={15}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
            toolTip={STRINGS.generals.DUPLICATE_REQUEST}
          />
        )}
        {handlePatientCellClicked && (
          <BadgedButton
            iconName="cellLogo"
            onClick={handlePatientOnCellClicked}
            iconWidth={15}
            iconHeight={15}
            loading={loadingSendingCell}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {handleMailClicked && (
          <BadgedButton
            iconName="mail"
            onClick={handleOnMailClicked}
            iconWidth={15}
            iconHeight={15}
            loading={loadingSendingByEmail}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {onPrint && (
          <BadgedButton
            iconName="print"
            onClick={onPrintCallBack}
            iconWidth={15}
            iconHeight={15}
            loading={loadingPrint}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {deleteRequest && (
          <BadgedButton
            iconName="delete"
            onClick={handleOnDelete}
            iconWidth={15}
            iconHeight={15}
            loading={loadingDelete}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
      </div>
    </div>
  );
}
