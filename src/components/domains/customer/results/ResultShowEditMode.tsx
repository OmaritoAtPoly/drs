/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { useCurrentResultToEditQuery } from "../../../../modules/customer/result/query";
import theme from "../../../../styles/theme";
import { RequestType } from "../../../../utils/enums";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";

import LabeledDialog from "../../../dialogs/LabeledDialog";
import Editor from "../../../inputs/Editor";
import ActionCertificatesResume from "../certificate/ActionCertificatesResume";
import ItemDiagnosisShowMode from "../request/diagnosisPanel/ItemDiagnosisShowMode";
import NoItemToShow from "../request/NoItemToShow";

interface Props {
  handleShow: () => void;
  showEditMode?: boolean;
  initialData: Schemas.ResultResponse;
  handlePrint?: (requestCode?: string) => void;
  handleMailClicked?: (requestCode?: string) => void;
  handlePatientCellClicked?: (requestCode?: string) => void;
  loadingSendByCell?: boolean;
  loadingSendingByEmail?: boolean;
  loadingPrint?: boolean;
  onHistoryClicked: () => void;
  handleClose?: () => void;
  withDefinitiveDiagnosis: boolean;
  showEditLabel?: boolean;
  handleEdit: (
    value: {
      requestType?: RequestType;
    } & Omit<Schemas.ResultFileRequest, "requestType">,
  ) => void;
}

const styles = makeStyles({
  certificateTitleStyle: {
    paddingBottom: theme.spacing(2),
  },
  primaryButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  diagnosisTitleStyle: {
    paddingBlock: theme.spacing(1),
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  saveButton: {
    fontWeight: "bold",
  },
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
  labelDescriptions: {
    marginTop: 20,
  },
  diagnoses: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
  },
  certificateDetails: {
    marginTop: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: theme.spacing(0.5),
  },
  colum1: {
    margin: theme.spacing(0.5),
    width: "50%",
  },
  colum2: {
    margin: theme.spacing(0.5),
    width: "50%",
  },
  typography: {
    paddingBlock: theme.spacing(1),
    fontWeight: "bold",
  },
});

const ResultShowEditMode = ({
  handleMailClicked,
  handlePrint,
  handleShow,
  showEditMode = false,
  initialData,
  loadingSendByCell,
  loadingPrint,
  handlePatientCellClicked,
  loadingSendingByEmail,
  onHistoryClicked,
  handleClose,
  withDefinitiveDiagnosis,
  showEditLabel = true,
  handleEdit,
}: Props) => {
  const classes = styles();

  const resultID = useMemo(() => initialData?.code, [initialData?.code]);
  const { data: currentResult } = useCurrentResultToEditQuery();
  const renderNoSHowItem = useCallback(
    (label: string) => <NoItemToShow value={label} />,
    [],
  );

  const renderDiagnosisList = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      initialData.items && initialData.items[0].diagnoses ? (
        initialData.items[0].diagnoses.map((diagnose, index) => (
          <ItemDiagnosisShowMode
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={diagnose.description || ""}
            definitive={diagnose.definitive || true}
            index={index}
            internCode={diagnose.code}
            notes={diagnose.notes}
            withDefinitiveDiagnosis={withDefinitiveDiagnosis}
          />
        ))
      ) : (
        <div />
      ),
    [initialData.items, withDefinitiveDiagnosis],
  );

  const handleOnEdit = useCallback(() => {
    handleEdit({
      title:
        (currentResult &&
          currentResult.items &&
          currentResult.items[0].title) ||
        "",
      diagnoses:
        (currentResult &&
          currentResult.items &&
          currentResult.items[0].diagnoses) ||
        [],
      description:
        (currentResult &&
          currentResult.items &&
          currentResult.items[0].description) ||
        "",
      observations:
        (currentResult &&
          currentResult.items &&
          currentResult.items[0].observations) ||
        "",
      analysis:
        (currentResult &&
          currentResult.items &&
          currentResult.items[0].analysis) ||
        "",
    });
  }, [currentResult, handleEdit]);
  return (
    <LabeledDialog
      open={showEditMode}
      handleShow={handleShow}
      label={STRINGS.result.SUMMARY_RESULT}
      actionPanel={
        <ActionCertificatesResume
          certificateId={resultID}
          handlePrint={handlePrint}
          handleMailClicked={handleMailClicked}
          handlePatientCellClicked={handlePatientCellClicked}
          loadingPrint={loadingPrint}
          loadingSendByCell={loadingSendByCell}
          loadingSendingByEmail={loadingSendingByEmail}
          onHistoryClicked={onHistoryClicked}
          handleClose={handleClose}
        />
      }>
      <div className={classes.container}>
        <Typography className={classes.certificateTitleStyle}>
          {STRINGS.result.RESULT_TYPE}
        </Typography>
        {initialData && initialData.items && (
          <Typography className={classes.certificateTitleStyle}>
            {initialData.items[0].title}
          </Typography>
        )}
        <div>
          <div>
            <Typography className={classes.diagnosisTitleStyle}>
              {STRINGS.buttonGrid.DIAGNOSIS}
            </Typography>
            {initialData.items &&
            initialData.items[0] &&
            initialData.items[0].diagnoses &&
            initialData.items[0].diagnoses.length <= 0
              ? renderNoSHowItem("diagnóstico")
              : renderDiagnosisList()}
          </div>
          <div className={classes.row}>
            <div className={classes.colum1}>
              <Typography className={classes.typography}>
                {STRINGS.result.DESCRIPTION}
              </Typography>
              <div className={classes.box}>
                <Editor
                  minEditorHeight={376}
                  htmlValue={
                    initialData &&
                    initialData.items &&
                    initialData.items[0].description
                  }
                  readOnly
                />
              </div>
            </div>
            <div className={classes.colum2}>
              <div>
                <Typography className={classes.typography}>
                  {STRINGS.result.ANALISYS}
                </Typography>
                <div className={classes.box}>
                  <Editor
                    minEditorHeight={150}
                    htmlValue={
                      initialData &&
                      initialData.items &&
                      initialData.items[0].analysis
                    }
                    readOnly
                  />
                </div>
              </div>
              <div>
                <Typography className={classes.typography}>
                  {STRINGS.result.OBSERVATIONS}
                </Typography>
                <div className={classes.box}>
                  <Editor
                    minEditorHeight={150}
                    htmlValue={
                      initialData &&
                      initialData.items &&
                      initialData.items[0].observations
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.primaryButton}>
          {showEditLabel && (
            <PrimaryButton
              label={STRINGS.generals.EDIT}
              onClick={handleOnEdit}
              color="primary"
            />
          )}
        </div>
      </div>
    </LabeledDialog>
  );
};

export default ResultShowEditMode;
