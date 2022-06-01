/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DialogProps, makeStyles, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import PrescriptionsShowModeContainer from "../../../../../containers/customer/requests/history/PrescriptionsShowModeContainer";
import { useAddLastAlerts } from "../../../../../modules/utils/error/handleError";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import LabeledDialog from "../../../../dialogs/LabeledDialog";
import Editor from "../../../../inputs/Editor";
import LoadingWrapper from "../../../../LoadingWrapper";
import DiagnosisPanelContainer from "../../request/diagnosisPanel/DiagnosisPanelContainer";
import ViewModeActionPanel from "../../request/ViewModeActionPanel";
import ActionPanelRecipe from "./ActionPanelRecipe";
import PrescriptionIndicationsForm from "./PrescriptionIndicationsForm";

export type DialogSelectionOptionType = {
  label: string;
  value: string;
};

const useStyles = makeStyles({
  root: {
    minWidth: "90%",
    minHeight: "90%",
    marginLeft: 40,
  },
  titleAndSearchStyle: {
    display: "flex",
    flexDirection: "column",
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingLeft: "20px",
  },
  dividerStyle: {
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    height: "1px",
    width: "95%",
    alignSelf: "center",
  },
  content: {
    paddingLeft: "20px",
  },
  diagnosisTitleStyle: {
    paddingBlock: "15px",
  },
  cardLayoutStyle: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
    color: "#828282",
  },
  left: {
    flex: 0.4,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowIndication: {
    display: "flex",
    flexDirection: "row",
    marginRight: theme.spacing(0.5),
  },
  rowMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  right: {
    flex: 0.55,
    display: "flex",
    flexDirection: "column",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },

  marginRight: {
    marginRight: theme.spacing(0.5),
  },
  generic: {
    marginRight: theme.spacing(1),
  },
  presentation: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(3),
  },
  indications: {
    display: "flex",
    flexDirection: "row",
  },
  divList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: theme.spacing(3),
  },
  prescriptionList: {
    flex: 0.4,
  },
  indicationsList: {
    flex: 0.5,
  },
  textComponent: {
    display: "flex",
    flexDirection: "column",
  },
  itemText: {
    marginTop: theme.spacing(3),
  },
  textArea: {
    height: theme.spacing(5),
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    width: "97%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  cancel: {
    fontSize: "15px",
    lineHeight: "20px",
    textTransform: "unset",
    marginTop: theme.spacing(0.5),
  },
  save: {
    fontSize: "15px",
    lineHeight: "20px",
    textTransform: "unset",
    textDecorationLine: "underline",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
  },
  text: {
    width: "100%",
  },
  img: {
    display: "flex",
    flexDirection: "column",
  },
  signature: {
    display: "flex",
    flexDirection: "row",
  },
  dimension: {
    marginTop: 35,
  },
});

interface Props {
  handleShow: () => void;
  handleAddRecipe: (recipe: Schemas.PrescriptionRequest) => void;
  handleHistoryPrescriptions: () => void;
  loading: boolean;
  professional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  allergies: Schemas.CustomerAllergies;
  onPatientCellClicked: () => void;
  onPrintClicked: () => void;
  onHistoryClicked: () => void;
  onMailClicked: () => void;
  loadingPdf?: boolean;
  loadingSendingEmail: boolean;
  sendingCell: boolean;
  prescription: Schemas.PrescriptionResponse;
  showMode: boolean;
  handleOnEdit: () => void;
  showDiagnoses?: boolean;
  showCancelButton?: boolean;
  currentPrescription: Schemas.PrescriptionResponse;
  currentProfessionalSpecialties: string[];
  currentProfessionalHeathCenter: Schemas.ProfessionalHealthCenterResponse;
}

const RecipeForm = ({
  open,
  handleShow,
  handleAddRecipe,
  handleHistoryPrescriptions,
  loading,
  allergies,
  professional,
  customer,
  onPatientCellClicked,
  onPrintClicked,
  onHistoryClicked,
  onMailClicked,
  loadingPdf = false,
  loadingSendingEmail,
  prescription,
  showMode,
  handleOnEdit,
  sendingCell,
  showDiagnoses = true,
  showCancelButton = true,
  currentPrescription,
  currentProfessionalSpecialties,
  currentProfessionalHeathCenter,
}: Props & DialogProps) => {
  const classes = useStyles();
  const { addLastAlerts } = useAddLastAlerts();

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      recipes: {
        diagnoses: prescription.diagnoses || [],
        items: prescription.items || [],
        recommendations: prescription.recommendations || [],
        warningSignals: prescription.warningSignals || [],
      } as Schemas.PrescriptionRequest,
    },
    enableReinitialize: true,
    onSubmit: (val) => {
      if (!val.recipes.diagnoses?.length) {
        addLastAlerts({
          message: STRINGS.error.NO_DIAGNOSIS,
          severity: "error",
          name: "",
        });
        return;
      }
      if (!val.recipes.items?.length) {
        addLastAlerts({
          message: STRINGS.error.NO_PILLS,
          severity: "error",
          name: "",
        });
        return;
      }
      handleAddRecipe(val.recipes);
    },
  });

  const handleWarningSignalChange = useCallback(
    (value: any) => {
      setFieldValue("recipes.warningSignals[0]", value, true);
    },
    [setFieldValue],
  );

  const handleIndicationsChange = useCallback(
    (value: any) => {
      setFieldValue("recipes.recommendations[0]", value, true);
    },
    [setFieldValue],
  );

  const handleAddDiagnoses = useCallback(
    (diagnose: Schemas.Diagnose) => {
      const diagnosisList = values.recipes.diagnoses
        ? [...values.recipes.diagnoses]
        : [];
      if (diagnose) {
        diagnosisList.push({
          code: diagnose.code || "",
          definitive: diagnose.definitive,
          description: diagnose.description,
          notes: diagnose.notes,
        });
        setFieldValue("recipes.diagnoses", diagnosisList);
      }
    },
    [setFieldValue, values.recipes.diagnoses],
  );

  const handleDeleteDiagnosis = useCallback(
    (index: number) => {
      const newDiagnosisList = [...(values.recipes.diagnoses || [])];
      newDiagnosisList?.splice(index, 1);
      setFieldValue("recipes.diagnoses", newDiagnosisList);
    },
    [setFieldValue, values.recipes?.diagnoses],
  );

  const handleOnChangeDiagnosesType = useCallback(
    (index: number, value: string) => {
      const definitive = value === "Definitivo";
      setFieldValue(`recipes.diagnoses[${index}].definitive`, definitive);
    },
    [setFieldValue],
  );

  const handleOnNotesChange = useCallback(
    (index: number, value: string) => {
      setFieldValue(`recipes.diagnoses[${index}].notes`, value);
    },
    [setFieldValue],
  );

  const handleEditForm = useCallback(
    (prescription: Schemas.PrescriptionRequest) => {
      setFieldValue("recipes.diagnoses", prescription.diagnoses, true);
      setFieldValue("recipes.items", prescription.items, true);
      setFieldValue(
        "recipes.recommendations",
        prescription.recommendations,
        true,
      );
      setFieldValue(
        "recipes.warningSignals",
        prescription.warningSignals,
        true,
      );
      handleOnEdit();
    },
    [handleOnEdit, setFieldValue],
  );

  return (
    <>
      {open && (
        <LabeledDialog
          open={open}
          handleShow={handleShow}
          actionPanel={
            <ActionPanelRecipe
              handleHistoryPrescriptions={handleHistoryPrescriptions}
              historyToolTipLabel={STRINGS.generals.HISTORY}
              handleClose={handleShow}
            />
          }
          label={STRINGS.buttonGrid.RECIPES}>
          <form onSubmit={handleSubmit}>
            {showDiagnoses && (
              <DiagnosisPanelContainer
                diagnosisList={values.recipes.diagnoses}
                onAddDiagnosis={handleAddDiagnoses}
                onDeleteDiagnosis={handleDeleteDiagnosis}
                onChangeDiagnosisType={handleOnChangeDiagnosesType}
                onChangeNotes={handleOnNotesChange}
              />
            )}
            <PrescriptionIndicationsForm
              items={values.recipes.items || []}
              setFieldValue={setFieldValue}
            />
            <div>
              <div className={classes.textComponent}>
                <div className={classes.itemText}>
                  <Typography id="request-value" className={classes.title}>
                    {STRINGS.recipe.RECOMMENDATIONS}
                  </Typography>
                  <Editor
                    minEditorHeight={100}
                    htmlValue={
                      values.recipes.recommendations &&
                      values.recipes.recommendations.length
                        ? values.recipes.recommendations[0]
                        : ""
                    }
                    onHtmlValueChange={handleIndicationsChange}
                  />
                </div>
                <div className={classes.itemText}>
                  <Typography id="request-value" className={classes.title}>
                    {STRINGS.recipe.ALARM}
                  </Typography>
                  <Editor
                    minEditorHeight={100}
                    htmlValue={
                      values.recipes.warningSignals &&
                      values.recipes.warningSignals.length
                        ? values.recipes.warningSignals[0]
                        : ""
                    }
                    onHtmlValueChange={handleWarningSignalChange}
                  />
                </div>
              </div>
            </div>
            <div className={classes.button}>
              {showCancelButton && (
                <div className={classes.cancel}>
                  <Button
                    color="primary"
                    className={classes.cancel}
                    onClick={handleShow}>
                    {STRINGS.allergies.CANCEL}
                  </Button>
                </div>
              )}

              <div className={classes.save}>
                <LoadingWrapper loading={loading}>
                  <Button
                    type="submit"
                    color="primary"
                    className={classes.save}>
                    {STRINGS.generals.FINISH}
                  </Button>
                </LoadingWrapper>
              </div>
            </div>
          </form>
        </LabeledDialog>
      )}
      {showMode && (
        <LabeledDialog
          label="Receta"
          open={showMode}
          actionPanel={
            <ViewModeActionPanel
              onHistoryClicked={onHistoryClicked}
              onMailClicked={onMailClicked}
              sendingEmail={loadingSendingEmail}
              onPatientCellClicked={onPatientCellClicked}
              onPrintClicked={onPrintClicked}
              loadingPdf={loadingPdf}
              sendingCell={sendingCell}
              handleClose={handleShow}
            />
          }
          handleShow={handleShow}>
          <PrescriptionsShowModeContainer
            allergies={allergies}
            professional={professional}
            customer={customer}
            prescription={currentPrescription}
            currentProfessionalSpecialties={currentProfessionalSpecialties}
            currentProfessionalHeathCenter={currentProfessionalHeathCenter}
            handleOnEdit={handleEditForm}
          />
        </LabeledDialog>
      )}
    </>
  );
};

export default RecipeForm;
