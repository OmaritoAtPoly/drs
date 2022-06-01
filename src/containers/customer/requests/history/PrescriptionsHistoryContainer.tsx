import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { queryCache } from "react-query";
import { showFile } from "../../../../utils/document";
import {
  usePrescriptionsPdfMutation,
  useSendPrescriptionsMutation,
} from "../../../../modules/customer/request/history/mutation";
import LabeledDialog from "../../../../components/dialogs/LabeledDialog";
import RequestHistoryItemActionPanel from "../../../../components/domains/customer/request/history/RequestHistoryItemActionPanel";
import PrescriptionsItemPrintMode from "../../../../components/domains/customer/request/history/prescriptionsHistory/PrescriptionsItemPrintMode";
import RequestItemHistory from "../../../../components/domains/customer/request/history/RequestItem";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import { fullName } from "../../../../utils/user";
import STRINGS from "../../../../utils/strings";
import { useAddLastAlerts } from "../../../../modules/utils/error/handleError";

// eslint-disable-next-line import/no-cycle
// import RecipeContainer from "../../newRecipe/RecipeContainer";
import RecipeForm from "../../../../components/domains/customer/gridPanelActions/recipe/RecipeForm";
import {
  defaultPrescriptionsItem,
  defaultProfessionalData,
} from "../../../../utils/defaultData";
import useProfileCacheSelector from "../../../../modules/profile/cacheSelector";
import {
  useEditCustomerPrescriptionMutation,
  useNewRecipeMutation,
} from "../../../../modules/customer/newRecipe/mutation";
import { useSaveCurrentPrescriptionCacheSelector } from "../../../../modules/customer/request/history/prescriptionsHistoryCacheSelector";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { useCustomerCurrentPrescriptionQuery } from "../../../../modules/customer/request/history/query";

interface Props {
  professional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  prescription: Schemas.PrescriptionResponse;
  allergies: Schemas.CustomerAllergies;
  currentProfessionalSpecialties: string[];
  currentProfessionalHeathCenter: Schemas.ProfessionalHealthCenterResponse;
  deleteRequest: (code: string) => void;
  loadingDelete?: boolean;
  showDiagnoses?: boolean;
  showCancelButton?: boolean;
  handleShow: () => void;
}

export default function PrescriptionsHistoryContainer({
  deleteRequest,
  allergies,
  prescription,
  loadingDelete,
  professional,
  customer,
  currentProfessionalSpecialties,
  currentProfessionalHeathCenter,
  showDiagnoses,
  showCancelButton,
  handleShow,
}: Props) {
  const { id: code, appointmentId } = useParams<{
    id: string;
    appointmentId: string;
  }>();
  // const { id: code } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const { currentPatient } = usePatientCacheSelector({});
  const [currentToDelete, setCurrentToDelete] = useState<string | undefined>();
  const { addLastAlerts } = useAddLastAlerts();
  const [openEdit, setOpenEdit] = useState(false);
  const [historyItems, setStoryItems] = useState(true);
  const { saveCurrentPrescription } = useSaveCurrentPrescriptionCacheSelector();

  const handleShowEdit = useCallback(() => {
    setOpenEdit(!openEdit);
    saveCurrentPrescription(prescription);
    queryCache.invalidateQueries(ReactQueryKeys["customer-prescriptions-key"]);
  }, [openEdit, prescription, saveCurrentPrescription]);
  const [showMode, setShowMode] = useState<boolean>(false);
  const { currentProfessional } = useProfileCacheSelector();
  const { data: currentPrescription } = useCustomerCurrentPrescriptionQuery({
    showError: true,
  });

  const handleDeleteItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (code: string) => {
      setCurrentToDelete(code);
      deleteRequest(code);
    },
    [deleteRequest],
  );

  const onRequestClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const handleOnHistoryClicked = useCallback(() => {
    setStoryItems(true);
    setOpen(false);
  }, []);

  const onSuccess = useCallback(
    (data: Schemas.PrescriptionResponse) => {
      saveCurrentPrescription(data);
      setShowMode(true);
      queryCache.invalidateQueries(
        ReactQueryKeys["customer-prescriptions-key"],
      );
    },
    [saveCurrentPrescription],
  );
  const {
    mutate: mutateEditPrescription,
    loading: editingPrescription,
  } = useEditCustomerPrescriptionMutation({
    onSuccess,
    showError: true,
  });

  const { mutate: mutateCreatePrescription, loading } = useNewRecipeMutation({
    onSuccess,
    showError: true,
  });

  const {
    loading: loadingPrescriptionsPdf,
    mutate: mutatePrescriptionsPdf,
  } = usePrescriptionsPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);
  const {
    mutate: sendPrescriptionByCell,
    loading: sendingPrescriptionByCell,
  } = useSendPrescriptionsMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });

  const handleOnPrintClicked = useCallback(() => {
    mutatePrescriptionsPdf({
      code,
      requestCode: prescription.code || "",
    });
  }, [code, mutatePrescriptionsPdf, prescription.code]);

  const handleOnPatientCellClicked = useCallback(() => {
    sendPrescriptionByCell({
      code,
      requestCode: prescription.code || "",
      sendToCustomer: true,
      sendByEmail: false,
      sendToProfessional: false,
    });
  }, [code, prescription.code, sendPrescriptionByCell]);

  const handleOnSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);
  const {
    mutate: sendPrescriptionByEmail,
    loading: loadingSendingEmail,
  } = useSendPrescriptionsMutation({
    showError: true,
    onSuccess: handleOnSendByEmailSuccess,
  });
  // const handleEditCurrentPrescriptions = useCallback(() => {}, []);
  const handleOnMailClicked = useCallback(() => {
    sendPrescriptionByEmail({
      code,
      requestCode: prescription.code || "",
      sendToCustomer: false,
      sendByEmail: true,
      sendToProfessional: false,
    });
    // eslint-disable-next-line nonblock-statement-body-position
  }, [code, prescription.code, sendPrescriptionByEmail]);

  const handleAddRecipe = useCallback(
    (recipe: Schemas.PrescriptionRequest) => {
      currentPrescription && currentPrescription.code
        ? mutateEditPrescription({
            code,
            requestCode: currentPrescription.code,
            ...recipe,
          })
        : mutateCreatePrescription({
            code,
            ...recipe,
            appointment: appointmentId,
          });
    },
    [
      appointmentId,
      code,
      currentPrescription,
      mutateCreatePrescription,
      mutateEditPrescription,
    ],
  );

  const handleOpenHistory = useCallback(() => {
    setOpenEdit(!openEdit);
  }, [openEdit]);

  const handleOnEdit = useCallback(() => {
    setShowMode(false);
  }, []);

  return (
    <>
      {open && (
        <LabeledDialog
          label="Receta"
          open={open}
          actionPanel={
            <RequestHistoryItemActionPanel
              loadingPdf={loadingPrescriptionsPdf}
              sendingCell={sendingPrescriptionByCell}
              onPrintClicked={handleOnPrintClicked}
              onPatientCellClicked={handleOnPatientCellClicked}
              onHistoryClicked={handleOnHistoryClicked}
              onMailClicked={handleOnMailClicked}
              sendingEmail={loadingSendingEmail}
              handleClose={handleShow}
            />
          }
          handleShow={handleShow}>
          <PrescriptionsItemPrintMode
            prescription={prescription}
            allergies={allergies}
            professional={professional}
            customer={customer}
            currentProfessionalSpecialties={currentProfessionalSpecialties}
            currentProfessionalHeathCenter={currentProfessionalHeathCenter}
          />
        </LabeledDialog>
      )}
      {historyItems && (
        <RequestItemHistory
          key={prescription.code}
          code={prescription.code || ""}
          date={`${prescription.createdAt?.dateDay}/${prescription.createdAt?.dateMonth}/${prescription.createdAt?.dateYear}`}
          deleteRequest={handleDeleteItem}
          onPrint={handleOnPrintClicked}
          loadingDelete={currentToDelete === prescription.code && loadingDelete}
          onRequestClick={onRequestClick}
          time={moment(
            `${prescription.createdAt?.timeHour}:${prescription.createdAt?.timeMinute}`,
            "hh:mm",
          ).format("hh:mm A")}
          diagnosis={
            prescription.diagnoses?.map((d) => d.description || "") || []
          }
          patientName={fullName(currentPatient)}
          // TODO:ADD handleDuplicateRequest
          handlePatientCellClicked={handleOnPatientCellClicked}
          loadingSendingCell={sendingPrescriptionByCell}
          loadingSendingByEmail={loadingSendingEmail}
          handleMailClicked={handleOnMailClicked}
          loadingPrint={loadingPrescriptionsPdf}
          handleEditRequestClick={handleShowEdit}
        />
      )}
      {openEdit && (
        <RecipeForm
          showDiagnoses={showDiagnoses}
          showCancelButton={showCancelButton}
          open={openEdit}
          handleAddRecipe={handleAddRecipe}
          handleShow={handleShow}
          handleHistoryPrescriptions={handleOpenHistory}
          loadingSendingEmail={loadingSendingEmail}
          onHistoryClicked={handleOpenHistory}
          onMailClicked={handleOnMailClicked}
          onPatientCellClicked={handleOnPatientCellClicked}
          onPrintClicked={handleOnPrintClicked}
          prescription={prescription}
          loading={editingPrescription || loading} // {loading || editingPrescription}
          allergies={allergies || {}}
          professional={currentProfessional || defaultProfessionalData}
          showMode={showMode}
          handleOnEdit={handleOnEdit}
          loadingPdf={loadingPrescriptionsPdf}
          sendingCell={sendingPrescriptionByCell}
          currentPrescription={currentPrescription || defaultPrescriptionsItem}
          currentProfessionalHeathCenter={currentProfessionalHeathCenter}
          currentProfessionalSpecialties={currentProfessionalSpecialties}
          customer={customer}
        />
      )}
    </>
  );
}
