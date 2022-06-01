import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import shortid from "shortid";
import InterConsultAttachmentItemContainer from "../../../../../containers/customer/interconsult/InterConsultAttachmentItemContainer";
import { usePatientCacheSelector } from "../../../../../modules/customer/profile/cacheSelector";
import useProfileCacheSelector from "../../../../../modules/profile/cacheSelector";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { fullName, referAllergyText } from "../../../../../utils/user";
import Icon from "../../../../Icon/Icon";
import Editor from "../../../../inputs/Editor";
import NotReferPanel from "../../background/NotReferPanel";
import ItemDiagnosisShowMode from "../../request/diagnosisPanel/ItemDiagnosisShowMode";

const styles = makeStyles({
  row: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  col: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: theme.spacing(0.5),
  },
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
  allergyContainer: {
    display: "flex",
  },
  allergyCol: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  headerText: {
    color: "#82828",
  },
  emergencyField: {
    display: "flex",
    alignItems: "center",
  },
  boldText: { fontWeight: "bold", marginRight: theme.spacing(0.5) },
  itemLabelContainer: {
    display: "flex",
    alignItems: "center",
  },
  itemLabel: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  bullet: {
    width: "10px",
    height: "10px",
    backgroundColor: "black",
    borderRadius: "100%",
    marginRight: theme.spacing(1),
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
});

interface Props {
  editAction: boolean;
  interConsult: Schemas.InterConsultationResp;
  handleEdit: () => void;
  onCancel: () => void;
}

export default function InterConsultPanelAbstract({
  editAction,
  interConsult,
  onCancel,
  handleEdit,
}: Props) {
  const classes = styles();
  const { currentProfessional } = useProfileCacheSelector();
  const { currentPatient } = usePatientCacheSelector({});

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography className={classes.headerText} color="textSecondary">
            {STRINGS.interconsult.FROM_PROFESSIONAL}
          </Typography>
          <Typography>{fullName(currentProfessional)}</Typography>
        </div>
        <div className={classes.col}>
          <Typography className={classes.headerText} color="textSecondary">
            {STRINGS.interconsult.REASON}
          </Typography>
          <Typography>{interConsult.reason || ""}</Typography>
        </div>
        <div className={classes.col}>
          <div>
            <Typography className={classes.headerText} color="textSecondary">
              {STRINGS.generals.SPECIALTY}
            </Typography>
            <Typography>{interConsult.toSpecialty?.name || ""}</Typography>
          </div>
          <div>
            <Typography className={classes.headerText} color="textSecondary">
              {STRINGS.interconsult.TO_PROFESSIONAL}
            </Typography>
            <Typography>{fullName(interConsult.toProfessional)}</Typography>
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.emergencyField}>
            <Typography className={classes.boldText}>
              {interConsult.emergency
                ? STRINGS.interconsult.EMERGENCY
                : STRINGS.interconsult.NORMAL}
            </Typography>
            <Icon name="checked" />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.CLINIC_PROFILE}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.clinicalProfile &&
                interConsult.clinicalProfile.length
                  ? interConsult.clinicalProfile[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.allergyContainer}>
            <div className={classes.allergyCol}>
              <Typography>{STRINGS.allergies.ALLERGIES_TITLE}</Typography>
              <div>
                {interConsult.hasAllergies === "FALSE" ? (
                  <NotReferPanel label={referAllergyText(currentPatient)} />
                ) : (
                  interConsult.medicineAllergies?.map((pill) => (
                    <div className={classes.itemLabelContainer}>
                      <div className={classes.bullet} />
                      <Typography className={classes.itemLabel}>
                        {pill}
                      </Typography>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className={classes.allergyCol}>
              <Typography>{STRINGS.allergies.OTHER_ALLERGIES}</Typography>
              <div>
                {interConsult.hasAllergies === "TRUE" && interConsult.allergies?.map((allergy) => (
                  <div className={classes.itemLabelContainer}>
                    <div className={classes.bullet} />
                    <Typography className={classes.itemLabel}>
                      {allergy}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.PHISICAL_EXAM}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.physicalExam && interConsult.physicalExam.length
                  ? interConsult.physicalExam[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.ANALISYS}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.analysis && interConsult.analysis.length
                  ? interConsult.analysis[0]
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
          {interConsult.diagnoses?.map((diagnose, indx) => (
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
          <Typography>{STRINGS.interconsult.TREATMENT}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.treatment && interConsult.treatment.length
                  ? interConsult.treatment[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.EXAM_PROCEDURE}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.examsProcedures &&
                interConsult.examsProcedures.length
                  ? interConsult.examsProcedures[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.BACKGROUND}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.background && interConsult.background.length
                  ? interConsult.background[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography>{STRINGS.generals.LOW_RESULTS}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.results && interConsult.results.length
                  ? interConsult.results[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.OBSERVATIONS}</Typography>
          <div className={classes.box}>
            <Editor
              minEditorHeight={theme.spacing(20)}
              htmlValue={
                interConsult.observations && interConsult.observations.length
                  ? interConsult.observations[0]
                  : ""
              }
              readOnly
            />
          </div>
        </div>
        <div className={classes.col}>
          <Typography>{STRINGS.interconsult.ATTACHMENT}</Typography>
          {interConsult.attachments &&
            interConsult.attachments.map((a) => (
              <InterConsultAttachmentItemContainer
                key={shortid()}
                attachment={a}
                code={currentPatient?.legalID}
                requestCode={interConsult.code}
                downloadable
              />
            ))}
        </div>
      </div>
      <div className={classes.actionSection}>
        <Button variant="text" color="primary" onClick={onCancel}>
          {STRINGS.generals.CLOSE}
        </Button>
        {editAction && (
          <Button
            variant="text"
            color="primary"
            onClick={handleEdit}
            className={classes.saveButton}>
            {STRINGS.generals.EDIT}
          </Button>
        )}
      </div>
    </div>
  );
}
