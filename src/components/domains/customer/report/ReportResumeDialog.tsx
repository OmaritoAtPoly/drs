/* eslint-disable react/jsx-one-expression-per-line */
import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import Editor from "../../../inputs/Editor";
import ActionReportResume from "./ActionReportResume";

interface Props {
  handleShow: () => void;
  open: boolean;
  handleHistoryClicked: () => void;
  initialData: Schemas.ReportResponse;
  handlePrintPdf: (requestCode?: string) => void;
  handleSendEmail: (requestCode?: string) => void;
  handleCellAction: (requestCode?: string) => void;
  handleClose: () => void;
  loadingSendEmail?: boolean;
  loadingPrintPdf?: boolean;
  loadingCellAction?: boolean;
  showEditLabel?: boolean;
}

const styles = makeStyles({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  reportTitleStyle: {
    paddingBottom: theme.spacing(2),
  },
  primaryButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
});

const ReportResumeDialog = ({
  handleSendEmail,
  handlePrintPdf,
  handleShow,
  open,
  handleHistoryClicked,
  initialData,
  loadingSendEmail,
  loadingPrintPdf,
  handleCellAction,
  loadingCellAction,
  handleClose,
  showEditLabel = true,
}: Props) => {
  const classes = styles();

  const reportDetails = useMemo(
    () => initialData?.details && initialData.details?.map((a) => a),
    [initialData?.details],
  );

  const reportId = useMemo(() => initialData?.code, [initialData?.code]);

  return (
    <LabeledDialog
      open={open}
      handleShow={handleShow}
      label={STRINGS.reports.REPORT_RESUME}
      actionPanel={
        <ActionReportResume
          reportId={reportId}
          handleHistoryClicked={handleHistoryClicked}
          handlePrintPdf={handlePrintPdf}
          handleSendEmail={handleSendEmail}
          loadingSendEmail={loadingSendEmail}
          loadingPrintPdf={loadingPrintPdf}
          handleCellAction={handleCellAction}
          loadingCellAction={loadingCellAction}
          handleClose={handleClose}
        />
      }>
      <div className={classes.container}>
        <div>
          <Typography className={classes.reportTitleStyle}>
            {STRINGS.reports.DETAILS_INFORM}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={reportDetails && reportDetails[0]}
              readOnly
            />
          </div>
        </div>
        <div className={classes.primaryButton}>
          {showEditLabel && <PrimaryButton
            label={STRINGS.generals.EDIT}
            onClick={handleShow}
            color="primary"
          />}
        </div>
      </div>
    </LabeledDialog>
  );
};

export default ReportResumeDialog;
