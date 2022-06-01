/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import shortid from "shortid";
import * as yup from "yup";
import RequestHistoryContainer from "../../../../../containers/customer/requests/history/RequestHistoryContainer";
import { useImageCategoryCacheSelector } from "../../../../../modules/customer/request/imageCategoryCacheSelector";
import { useLabCategoryCacheSelector } from "../../../../../modules/customer/request/labCategoryCacheSelector";
import { REQUEST_DATA_TYPE } from "../../../../../utils/enums";
import STRINGS from "../../../../../utils/strings";
import PrimaryButton from "../../../../buttons/PrimaryButton";
import TitleCard from "../../../../cards/TitleCard";
import Editor from "../../../../inputs/Editor";
import PrescriptionIndicationsForm from "../../gridPanelActions/recipe/PrescriptionIndicationsForm";
import PrescriptionsDialog from "../../request/history/prescriptionsHistory/PrescriptionsDialog";
import ImageOrderPanel from "../ImageOrderPanel";
import LaboratoryOrderPanel from "../LaboratoryOrderPanel";
import ActionPanel from "./ActionPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: " #323232",
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: "bold",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: "#828282",
    },
    cardStyle: {
      marginLeft: theme.spacing(0.4),
    },
    bodyCardStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      border: "2px solid #5E17EB",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
    process: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    textComponent: {
      display: "flex",
      flexDirection: "column",
    },
    itemText: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    treatment: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    indications: {
      marginLeft: theme.spacing(2),
    },
    panel: {
      marginTop: theme.spacing(2),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1.5),
    },
    hidden: {
      display: "none",
    },
  }),
);

const validationSchema = yup.object().shape({
  quantity: yup
    .number()
    .typeError(STRINGS.error.ONLY_NUMBERS)
    .required(STRINGS.error.FIELD_REQUIRED),
  hoursFrequency: yup
    .number()
    .typeError(STRINGS.error.ONLY_NUMBERS)
    .required(STRINGS.error.FIELD_REQUIRED),
  duration: yup.number().typeError(STRINGS.error.ONLY_NUMBERS),
  via: yup.string().required(STRINGS.error.FIELD_REQUIRED),
  doseMg: yup
    .number()
    .typeError(STRINGS.error.ONLY_NUMBERS)
    .required(STRINGS.error.FIELD_REQUIRED),
});

interface Props {
  readOnly?: boolean;
  data: Schemas.AppointmentRecordResponse;
  handlePatientCellClicked?: (option: string) => void;
  sendingCell?: boolean;
  onHistoryClicked: (option: string) => void;
  openedHistory?: boolean;
  openedHistoryPrescription?: boolean;
  handlePrescriptionHistory: () => void;
  handlePrintClicked?: (option: string) => void;
  loadingPdf?: boolean;
  handleMailClicked?: (option: string) => void;
  sendingEmail?: boolean;
  handleAddLabRequest: (labRequest: Schemas.LaboratoryRequestRequest) => void;
  loadingAddLab?: boolean;
  lastLaboratoriesRequest?: Schemas.LaboratoryRequestResponse;
  lastImageRequest: Schemas.ImageRequestResponse | undefined;
  handleAddImageRequest: (imageRequest: Schemas.ImageRequestRequest) => void;
  loadingAddImage?: boolean;
  onCloseHistory: () => void;
  lastPrescriptionRequest?: Schemas.PrescriptionResponse;
  handleAddRecipe: (recipe: Schemas.PrescriptionRequest) => void;
  loadingAddRecipe?: boolean;
}

const TreatmentPlan = ({
  readOnly = false,
  data,
  handlePatientCellClicked,
  sendingCell,
  onHistoryClicked,
  openedHistory,
  handlePrintClicked,
  loadingPdf = false,
  handleMailClicked,
  sendingEmail = false,
  handleAddLabRequest,
  loadingAddLab = false,
  lastLaboratoriesRequest,
  lastImageRequest,
  handleAddImageRequest,
  loadingAddImage,
  onCloseHistory,
  lastPrescriptionRequest,
  handleAddRecipe,
  loadingAddRecipe,
  openedHistoryPrescription,
  handlePrescriptionHistory,
}: Props) => {
  const classes = useStyles();
  const {
    examList,
    setSearch,
    loading: loadingCategories,
  } = useLabCategoryCacheSelector("");
  const {
    examList: examListImage,
    setSearch: setSearchImage,
    loading: loadingCategoriesImage,
  } = useImageCategoryCacheSelector("");
  const formik = useFormik({
    initialValues: {
      laboratoryOrder: {
        diagnoses: data.diagnoses || [],
        items: [],
      } as Schemas.LaboratoryRequestRequest,
      imageOrder: {
        diagnoses: data.diagnoses || [],
        items: [],
      } as Schemas.ImageRequestRequest,
      recipes: {
        diagnoses: [],
        items: [],
        recommendations: [],
        warningSignals: [],
      } as Schemas.PrescriptionRequest,
      treatment:
        data.treatmentPlan && data.treatmentPlan.length
          ? data.treatmentPlan[0]
          : "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  const { values, setFieldValue } = formik;

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(event.target.value || "");
    },
    [setSearch],
  );

  const handleAddRequestItem = useCallback(
    (exam: Schemas.CategoryExamData) => {
      const requestList = values.laboratoryOrder.items
        ? [...values.laboratoryOrder.items]
        : [];
      const code = shortid();
      requestList.push({
        code,
        description: exam.name,
        notes: "",
        examCode: exam.code,
        quantity: 1,
      });
      setFieldValue("laboratoryOrder.items", requestList);
    },
    [setFieldValue, values.laboratoryOrder.items],
  );

  const handleOnRequestQuantityChange = useCallback(
    (index: number, value: string) => {
      setFieldValue(`laboratoryOrder.items[${index}].quantity`, value);
    },
    [setFieldValue],
  );

  const handleOnRequestQuantityImageChange = useCallback(
    (index: number, value: string) => {
      setFieldValue(`imageOrder.items[${index}].quantity`, value);
    },
    [setFieldValue],
  );

  const handleAddRequestItemFromModal = useCallback(
    (categories: Schemas.CategoryExamData[]) => {
      const requestList = values.laboratoryOrder.items
        ? [...values.laboratoryOrder.items]
        : [];
      // eslint-disable-next-line array-callback-return
      categories.map((category) => {
        requestList.push({
          code: category.code,
          description: category.name,
          notes: "",
          examCode: category.code,
          quantity: 1,
        });
      });
      setFieldValue("laboratoryOrder.items", requestList);
    },
    [setFieldValue, values.laboratoryOrder.items],
  );
  const handleDeleteRequest = useCallback(
    (code: string) => {
      const requestList = values.laboratoryOrder.items?.filter(
        (item) => code !== item.code,
      );
      setFieldValue("laboratoryOrder.items", requestList);
    },
    [setFieldValue, values.laboratoryOrder.items],
  );
  const handleOnRequestNotesChange = useCallback(
    (index: number, valueItem: string) => {
      setFieldValue(`laboratoryOrder.items[${index}].notes`, valueItem);
    },
    [setFieldValue],
  );
  const onDebounceSearchImage = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearchImage(event.target.value || "");
    },
    [setSearchImage],
  );
  const handleAddRequestItemImage = useCallback(
    (exam: Schemas.CategoryExamData) => {
      const requestList = values.imageOrder.items
        ? [...values.imageOrder.items]
        : [];
      const code = shortid();
      requestList.push({
        code,
        description: exam.name,
        notes: "",
        examCode: exam.code,
        quantity: 1,
      });
      setFieldValue("imageOrder.items", requestList);
    },
    [setFieldValue, values.imageOrder.items],
  );
  const handleDeleteRequestImage = useCallback(
    (code: string) => {
      const requestList = values.imageOrder.items?.filter(
        (item) => code !== item.code,
      );
      setFieldValue("imageOrder.items", requestList);
    },
    [setFieldValue, values.imageOrder.items],
  );
  const handleOnRequestNotesChangeImage = useCallback(
    (index: number, valueItem: string) => {
      setFieldValue(`imageOrder.items[${index}].notes`, valueItem);
    },
    [setFieldValue],
  );

  // TODO: don't show in the first scope
  // const handleTreatment = useCallback(
  //   (value) => {
  //     setFieldValue("treatment", value);
  //   },
  //   [setFieldValue],
  // );

  const handleAddLabRequestCallBack = useCallback(() => {
    handleAddLabRequest(values.laboratoryOrder);
  }, [values.laboratoryOrder, handleAddLabRequest]);

  const handleAddImageRequestCallBack = useCallback(() => {
    handleAddImageRequest(values.imageOrder);
  }, [handleAddImageRequest, values.imageOrder]);

  const handleAddRecipeCallBack = useCallback(() => {
    handleAddRecipe(values.recipes);
  }, [handleAddRecipe, values.recipes]);

  const handleHistoryLabClicked = useCallback(() => {
    onHistoryClicked(REQUEST_DATA_TYPE.REQUESTS.LAB);
  }, [onHistoryClicked]);

  const handleHistoryImageClicked = useCallback(() => {
    onHistoryClicked(REQUEST_DATA_TYPE.REQUESTS.IMAGE);
  }, [onHistoryClicked]);

  const handlePrintLabClicked = useCallback(() => {
    handlePrintClicked && handlePrintClicked(REQUEST_DATA_TYPE.REQUESTS.LAB);
  }, [handlePrintClicked]);

  const handlePrintImageClicked = useCallback(() => {
    handlePrintClicked && handlePrintClicked(REQUEST_DATA_TYPE.REQUESTS.IMAGE);
  }, [handlePrintClicked]);

  const handlePatientLabCellClicked = useCallback(() => {
    handlePatientCellClicked &&
      handlePatientCellClicked(REQUEST_DATA_TYPE.REQUESTS.LAB);
  }, [handlePatientCellClicked]);

  const handlePatientImageCellClicked = useCallback(() => {
    handlePatientCellClicked &&
      handlePatientCellClicked(REQUEST_DATA_TYPE.REQUESTS.IMAGE);
  }, [handlePatientCellClicked]);

  const handleMailLabClicked = useCallback(() => {
    handleMailClicked && handleMailClicked(REQUEST_DATA_TYPE.REQUESTS.LAB);
  }, [handleMailClicked]);

  const handleMailImageClicked = useCallback(() => {
    handleMailClicked && handleMailClicked(REQUEST_DATA_TYPE.REQUESTS.IMAGE);
  }, [handleMailClicked]);

  const handlePatientPrescriptionCellClicked = useCallback(() => {
    handlePatientCellClicked && handlePatientCellClicked("prescription");
  }, [handlePatientCellClicked]);

  const handleMailPrescriptionClicked = useCallback(() => {
    handleMailClicked && handleMailClicked("prescription");
  }, [handleMailClicked]);

  const handlePrintPrescriptionClicked = useCallback(() => {
    handlePrintClicked && handlePrintClicked("prescription");
  }, [handlePrintClicked]);

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

  return (
    <TitleCard
      title={STRINGS.newConsult.TREATMENT_PLAN}
      onClick={() => {}}
      classTitle={classes.cardStyle}>
      <FormikProvider value={formik}>
        <Form>
          <div className={classes.panel}>
            <div className={classes.bodyCardStyle}>
              <Typography className={classes.title}>
                {STRINGS.newConsult.ORDER_LABORATORY}
              </Typography>
              <ActionPanel
                onPatientCellClicked={
                  lastLaboratoriesRequest
                    ? handlePatientLabCellClicked
                    : undefined
                }
                sendingCell={sendingCell || false}
                onHistoryClicked={handleHistoryLabClicked}
                onPrintClicked={
                  lastLaboratoriesRequest ? handlePrintLabClicked : undefined
                }
                loadingPdf={loadingPdf}
                onMailClicked={
                  lastLaboratoriesRequest ? handleMailLabClicked : undefined
                }
                sendingEmail={sendingEmail}
              />
            </div>
            <LaboratoryOrderPanel
              examList={examList}
              onDebounceSearch={onDebounceSearch}
              loadingCategories={loadingCategories}
              laboratoryOrder={values.laboratoryOrder.items}
              handleAddRequestItem={handleAddRequestItem}
              handleAddRequestItemFromModal={handleAddRequestItemFromModal}
              handleDeleteRequest={handleDeleteRequest}
              handleOnRequestNotesChange={handleOnRequestNotesChange}
              readOnly={readOnly}
              handleOnRequestQuantityChange={handleOnRequestQuantityChange}
            />
            <div className={readOnly ? classes.hidden : classes.button}>
              <PrimaryButton
                label={STRINGS.generals.SAVE}
                color="primary"
                variant="text"
                onClick={handleAddLabRequestCallBack}
                loading={loadingAddLab}
              />
            </div>
          </div>
          <div className={classes.panel}>
            <div className={classes.bodyCardStyle}>
              <Typography className={classes.title}>
                {STRINGS.newConsult.ORDER_IMAGEN}
              </Typography>
              <ActionPanel
                onPatientCellClicked={
                  lastImageRequest ? handlePatientImageCellClicked : undefined
                }
                sendingCell={sendingCell || false}
                onHistoryClicked={handleHistoryImageClicked}
                onPrintClicked={
                  lastImageRequest ? handlePrintImageClicked : undefined
                }
                loadingPdf={loadingPdf}
                onMailClicked={
                  lastImageRequest ? handleMailImageClicked : undefined
                }
                sendingEmail={sendingEmail}
              />
            </div>
            <ImageOrderPanel
              examListImage={examListImage}
              handleAddRequestItemImage={handleAddRequestItemImage}
              loadingCategoriesImage={loadingCategoriesImage}
              handleDeleteRequestImage={handleDeleteRequestImage}
              handleOnRequestNotesChangeImage={handleOnRequestNotesChangeImage}
              imageOrder={values.imageOrder.items}
              onDebounceSearchImage={onDebounceSearchImage}
              readOnly={readOnly}
              handleOnRequestQuantityChange={handleOnRequestQuantityImageChange}
            />
            <div className={readOnly ? classes.hidden : classes.button}>
              <PrimaryButton
                label={STRINGS.generals.SAVE}
                color="primary"
                variant="text"
                onClick={handleAddImageRequestCallBack}
                loading={loadingAddImage}
              />
            </div>
          </div>
          <div className={classes.bodyCardStyle}>
            <Typography className={classes.title}>
              {STRINGS.newConsult.RECIPE}
            </Typography>
            <ActionPanel
              onPatientCellClicked={
                lastPrescriptionRequest
                  ? handlePatientPrescriptionCellClicked
                  : undefined
              }
              sendingCell={sendingCell || false}
              onHistoryClicked={handlePrescriptionHistory}
              onPrintClicked={
                lastPrescriptionRequest
                  ? handlePrintPrescriptionClicked
                  : undefined
              }
              loadingPdf={loadingPdf}
              onMailClicked={
                lastPrescriptionRequest
                  ? handleMailPrescriptionClicked
                  : undefined
              }
              sendingEmail={sendingEmail}
            />
          </div>
          <div className={classes.indications}>
            <PrescriptionIndicationsForm
              items={values.recipes.items || []}
              setFieldValue={setFieldValue}
            />
          </div>
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
          {/* {//TODO: don't show in the first scope} */}
          {/* <div className={classes.bodyCardStyle}>
            <Typography className={classes.title}>
              {STRINGS.newConsult.TREATMENT_OF_PLAN}
            </Typography>
          </div>
          <div className={classes.treatment}>
            <FastField name="treatment">
              {() => (
                <Editor
                  minEditorHeight={100}
                  htmlValue={values.treatment}
                  onHtmlValueChange={handleTreatment}
                  readOnly={readOnly}
                />
              )}
            </FastField>
          </div> */}
          <div className={readOnly ? classes.hidden : classes.button}>
            <PrimaryButton
              label={STRINGS.allergies.SAVE}
              color="primary"
              variant="text"
              onClick={handleAddRecipeCallBack}
              loading={loadingAddRecipe}
            />
          </div>
        </Form>
      </FormikProvider>
      <RequestHistoryContainer
        handleShow={onCloseHistory}
        open={openedHistory || false}
        showAddAction={false}
      />
      <PrescriptionsDialog
        open={openedHistoryPrescription || false}
        handleShow={handlePrescriptionHistory}
        onAddClicked={handlePrescriptionHistory}
      />
    </TitleCard>
  );
};
export default TreatmentPlan;
