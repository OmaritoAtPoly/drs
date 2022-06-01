import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import IterConsultReportAttachmentItemContainer from "../../../../../containers/customer/interconsult/InterConsultReportAttachmentItemContainer";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import Editor from "../../../../inputs/Editor";
import ItemDiagnosisShowMode from "../../request/diagnosisPanel/ItemDiagnosisShowMode";

const styles = makeStyles(() => ({
  row: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    width: "100%",
  },
  col: {
    width: "49%",
    marginRight: theme.spacing(0.25),
    marginLeft: theme.spacing(0.25),
  },
  headRow: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  headCol: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  headerText: {
    color: "#82828",
  },
  title: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  currentInterConsult: Schemas.InterConsultationResp;
  handleShow: () => void;
}

export default function InterConsultReportShowModePanel({
  currentInterConsult,
  handleShow,
}: Props) {
  const classes = styles();
  const { id: code } = useParams<{ id: string }>();

  return (
    <>
      <div className={classes.headRow}>
        <div className={classes.headCol}>
          <Typography className={classes.headerText} color="textSecondary">
            {STRINGS.interconsult.FROM_PROFESSIONAL}
          </Typography>
          <Typography>
            {`${currentInterConsult.fromProfessional?.firstName || ""} ${
              currentInterConsult.fromProfessional?.firstFamilyName || ""
            } `}
          </Typography>
        </div>
        <div className={classes.headCol}>
          <Typography className={classes.headerText} color="textSecondary">
            {STRINGS.interconsult.REASON}
          </Typography>
          <Typography>{currentInterConsult.reason || ""}</Typography>
        </div>
        <div className={classes.headCol}>
          <div>
            <Typography className={classes.headerText} color="textSecondary">
              {STRINGS.generals.SPECIALTY}
            </Typography>
            <Typography>
              {currentInterConsult.toSpecialty?.name || ""}
            </Typography>
          </div>
        </div>
        <div className={classes.headCol}>
          <Typography className={classes.headerText} color="textSecondary">
            {STRINGS.interconsult.TO_PROFESSIONAL}
          </Typography>
          <Typography>{currentInterConsult.targetProfessionalName}</Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.interconsult.CLINIC_PROFILE}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.clinicalProfile &&
                currentInterConsult.clinicalProfile.length
                  ? currentInterConsult.clinicalProfile[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.interconsult.CLINICAL_CRITERIAL}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.report?.clinicalCriteria &&
                currentInterConsult.report?.clinicalCriteria.length
                  ? currentInterConsult.report?.clinicalCriteria[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.interconsult.EXAM_PROCEDURE}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.report?.treatment &&
                currentInterConsult.report
                  ? currentInterConsult.report.treatment[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.interconsult.ANALISYS}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.report?.analysis &&
                currentInterConsult.report?.analysis.length
                  ? currentInterConsult.report?.analysis[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div>
          <Typography>{STRINGS.buttonGrid.DIAGNOSIS}</Typography>
          {currentInterConsult.report?.diagnoses?.map((diagnose, indx) => (
            <ItemDiagnosisShowMode
              label={diagnose.description || ""}
              internCode={diagnose.code || ""}
              definitive={diagnose.definitive}
              index={indx}
            />
          ))}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.interconsult.TREATMENT}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.report?.treatment &&
                currentInterConsult.report
                  ? currentInterConsult.report.treatment[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.generals.LOW_RESULTS}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.report?.results &&
                currentInterConsult.report?.results.length
                  ? currentInterConsult.report?.results[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography className={classes.title}>
            {STRINGS.interconsult.OBSERVATIONS}
          </Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                currentInterConsult.report?.observations &&
                currentInterConsult.report
                  ? currentInterConsult?.report?.observations[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.ATTACHMENT}</Typography>
          <div>
            {currentInterConsult.report &&
              currentInterConsult.report.attachments &&
              currentInterConsult.report.attachments.map((a) => (
                <IterConsultReportAttachmentItemContainer
                  attachment={a}
                  requestCode={currentInterConsult.code}
                  code={code}
                  downloadable
                />
              ))}
          </div>
        </div>
      </div>
      <div className={classes.actionSection}>
        <Button variant="text" color="primary" onClick={handleShow}>
          {STRINGS.generals.CLOSE}
        </Button>
      </div>
    </>
  );
}
