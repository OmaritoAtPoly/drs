import {
  Card,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { useAddLastAlerts } from "../../../../../modules/utils/error/handleError";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import Icon from "../../../../Icon/Icon";
import LoadingWrapper from "../../../../LoadingWrapper";

// eslint-disable-next-line @typescript-eslint/no-shadow
const styles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    margin: theme.spacing(1),
  },
  iconButton: {
    height: theme.spacing(5),
  },
  iconContainer: {
    display: "flex",
  },
  actionContainer: {
    display: "flex",
    marginLeft: theme.spacing(2),
    alignItems: "center",
  },
  cardContainer: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    backgroundColor: "#F9F9F9",
    border: "1px solid #D6E3F3",
    cursor: "pointer",
  },
  notHaveReportCardContainer: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "#F41616",
    border: "none",
    cursor: "pointer",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    height: "35px",
  },
  notHaveReportCardTypography: {
    fontSize: "14px",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  labelStyle: {
    fontSize: "14px",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
}));

interface Props {
  visited: boolean;
  attachment: boolean;
  deleteLoading: boolean;
  informActionLabel: string;
  haveReport: boolean;
  affectedInterConsultCode: string;
  currentInterConsultCode: string;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function InterConsultHistoryPanelAction({
  visited,
  attachment,
  deleteLoading,
  informActionLabel,
  haveReport,
  affectedInterConsultCode,
  currentInterConsultCode,
  loadingPrintClicked = false,
  loadingMailClicked = false,
  loadingCellClicked = false,
  fromrecievedInterconsult = false,
  onInterConsultSheetClicked,
  onDeleteClicked,
  onReportClicked,
  handleEdit,
  handleMailClicked,
  handleCellClicked,
  handlePrintClicked,
}: Props) {
  const classes = styles();

  const { addLastAlerts } = useAddLastAlerts();

  const handleAlert = useCallback(
    () =>
      addLastAlerts({
        name: "",
        message: STRINGS.interconsult.WITH_OUT_REPORT,
        severity: "success",
      }),
    [addLastAlerts],
  );

  const handleOnReportClicked = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      haveReport || fromrecievedInterconsult
        ? onReportClicked()
        : handleAlert(),
    [haveReport, onReportClicked, handleAlert, fromrecievedInterconsult],
  );

  return (
    <div className={classes.content}>
      <div className={classes.actionContainer}>
        <Card
          className={classes.cardContainer}
          onClick={onInterConsultSheetClicked}>
          <div className={classes.cardContent}>
            <Typography className={classes.labelStyle}>
              {STRINGS.interconsult.INTERCONSULT_SHEET}
            </Typography>
          </div>
        </Card>
        <Card
          className={
            haveReport
              ? classes.notHaveReportCardContainer
              : classes.cardContainer
          }
          onClick={handleOnReportClicked}>
          <div className={classes.cardContent}>
            <Typography
              className={
                haveReport
                  ? classes.notHaveReportCardTypography
                  : classes.labelStyle
              }>
              {informActionLabel}
            </Typography>
          </div>
        </Card>
        {attachment && (
          <BadgedButton
            iconName="attachment"
            iconWidth={15}
            iconHeight={15}
            onClick={onInterConsultSheetClicked}
          />
        )}
        {visited && handleEdit && (
          <BadgedButton
            iconName="edit"
            iconWidth={15}
            iconHeight={15}
            onClick={handleEdit}
          />
        )}
        {handleMailClicked && (
          <BadgedButton
            onClick={handleMailClicked}
            iconName="letter"
            fill={theme.palette.primary.main}
            iconWidth={15}
            iconHeight={15}
            loading={loadingMailClicked}
          />
        )}
        {handleCellClicked && (
          <BadgedButton
            onClick={handleCellClicked}
            iconName="doubleCell"
            iconWidth={15}
            iconHeight={15}
            loading={loadingCellClicked}
          />
        )}
        {handlePrintClicked && (
          <BadgedButton
            onClick={handlePrintClicked}
            iconName="print"
            iconWidth={15}
            iconHeight={15}
            loading={loadingPrintClicked}
          />
        )}

        {visited && (
          <LoadingWrapper
            loading={
              deleteLoading &&
              affectedInterConsultCode === currentInterConsultCode
            }>
            <IconButton
              className={classes.iconButton}
              onClick={onDeleteClicked}>
              <Icon height={17} width={15} name="delete" />
            </IconButton>
          </LoadingWrapper>
        )}
      </div>
    </div>
  );
}
