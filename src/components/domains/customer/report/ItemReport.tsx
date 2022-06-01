/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import shortid from "shortid";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import Editor from "../../../inputs/Editor";

const styles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  content: {
    display: "flex",
    width: "100%",
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
    flexDirection: "column",
    textAlign: "justify",
  },
  arrayInfoItem: {
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
  full: {
    width: "100%",
  },
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
}));

interface Props {
  code: string;
  index: number;
  requestType?: string;
  date: string;
  time: string;
  patientName: string;
  details: string[];
  request?: string[];
  deleteRequest: (code: string) => void;
  loadingDelete?: boolean;
  handleRequestClick?: () => void;
  handleEditRequest?: () => void;
  handlePrint?: (code: string) => void;
  handlePatientByCell: () => void;
  loadingPrint?: boolean;
  loadingSendingCell?: boolean;
  handleSendByEmail: () => void;
  loadingByEmail?: boolean;
}

export default function ItemReport({
  code,
  index,
  requestType,
  date,
  time,
  patientName,
  details,
  request,
  deleteRequest,
  loadingDelete,
  handleRequestClick,
  handleEditRequest,
  handlePrint,
  loadingPrint,
  handlePatientByCell,
  loadingSendingCell,
  handleSendByEmail,
  loadingByEmail = false,
}: Props) {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    deleteRequest(code);
  }, [code, deleteRequest]);

  const handlePrintCallBack = useCallback(() => {
    handlePrint && handlePrint(code);
  }, [code, handlePrint]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div>
          <Typography>{index}</Typography>
        </div>
        <div className={classes.full}>
          <Typography className={classes.boldLabel}>
            {requestType || ""}
          </Typography>
          <div className={classes.spanStyle}>
            <Typography className={classes.boldLabel}>
              {STRINGS.historical.DATE}
            </Typography>
            <Typography>{date}</Typography>
          </div>
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
          <span className={`${classes.spanStyle} ${classes.full}`}>
            <Typography className={classes.boldLabel}>
              {STRINGS.reports.DETAILS}
            </Typography>
            <div className={`${classes.arrayInfoContainer} ${classes.full}`}>
              {details.map((detail) => (
                <div className={classes.box}>
                  <Editor
                    key={shortid()}
                    htmlValue={detail}
                    readOnly
                    truncate
                  />
                </div>
              ))}
            </div>
          </span>
          <span className={classes.spanStyle}>
            {request && (
              <Typography className={classes.boldLabel}>
                {STRINGS.historical.LOWER_REQUEST}
              </Typography>
            )}
            <span className={classes.arrayInfoContainer}>
              {request &&
                request.map((rqt, index) => (
                  <Typography key={index} className={classes.arrayInfoItem}>
                    {rqt}
                  </Typography>
                ))}
            </span>
          </span>
        </div>
      </div>
      <div className={classes.actionContainer}>
        <div className={classes.cardContent}>
          {handleRequestClick && (
            <BadgedButton
              iconName="openEye"
              onClick={handleRequestClick}
              iconWidth={theme.spacing(2)}
              iconHeight={theme.spacing(2)}
            />
          )}
          {handleEditRequest && (
            <BadgedButton
              iconName="edit"
              onClick={handleEditRequest}
              iconWidth={15}
              iconHeight={15}
              containerStyle={classes.button}
              classNameWrapper={classes.classNameWrapper}
            />
          )}
        </div>
        {handlePatientByCell && (
          <BadgedButton
            iconName="cellLogo"
            onClick={handlePatientByCell}
            iconWidth={15}
            iconHeight={15}
            loading={loadingSendingCell}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {handleSendByEmail && (
          <BadgedButton
            iconName="mail"
            onClick={handleSendByEmail}
            loading={loadingByEmail}
            iconWidth={15}
            iconHeight={15}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        {handlePrintCallBack && (
          <BadgedButton
            iconName="print"
            onClick={handlePrintCallBack}
            iconWidth={15}
            iconHeight={15}
            loading={loadingPrint}
            containerStyle={classes.button}
            classNameWrapper={classes.classNameWrapper}
          />
        )}
        <BadgedButton
          iconName="delete"
          onClick={handleOnDelete}
          iconWidth={15}
          iconHeight={15}
          loading={loadingDelete}
          containerStyle={classes.button}
          classNameWrapper={classes.classNameWrapper}
        />
      </div>
    </div>
  );
}
