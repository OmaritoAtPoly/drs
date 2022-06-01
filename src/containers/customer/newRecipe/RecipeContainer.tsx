import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import RecipeForm from "../../../components/domains/customer/gridPanelActions/recipe/RecipeForm";
import PrescriptionsDialog from "../../../components/domains/customer/request/history/prescriptionsHistory/PrescriptionsDialog";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useBackgroundPatientCacheSelector } from "../../../modules/customer/background/cacheSelector";
import {
  useEditCustomerPrescriptionMutation,
  useNewRecipeMutation,
} from "../../../modules/customer/newRecipe/mutation";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import {
  usePrescriptionsPdfMutation,
  useSendPrescriptionsMutation,
} from "../../../modules/customer/request/history/mutation";
import { useSaveCurrentPrescriptionCacheSelector } from "../../../modules/customer/request/history/prescriptionsHistoryCacheSelector";
import { useCustomerCurrentPrescriptionQuery } from "../../../modules/customer/request/history/query";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import {
  defaultCustomerData,
  defaultHealthCenterData,
  defaultPrescriptionsItem,
  defaultProfessionalData,
} from "../../../utils/defaultData";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  handleShow: () => void;
  open: boolean;
  showDiagnoses?: boolean;
  showCancelButton?: boolean;
}

export default function RecipeContainer({
  handleShow,
  open,
  showDiagnoses,
  showCancelButton,
}: Props) {
  const { id: code, appointmentId } = useParams<{
    id: string;
    appointmentId: string;
  }>();
  const { currentPatient } = usePatientCacheSelector({});
  const [openedHistory, setOpenHistory] = useState<boolean>(false);
  const { addLastAlerts } = useAddLastAlerts();
  const { saveCurrentPrescription } = useSaveCurrentPrescriptionCacheSelector();
  const { data: currentPrescription } = useCustomerCurrentPrescriptionQuery({
    showError: true,
  });
  const { allergies } = useBackgroundPatientCacheSelector();
  const [showMode, setShowMode] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(open);

  const handleOnCloseViewMode = useCallback(() => {
    setShowMode(!showMode);
  }, [showMode]);

  const onSuccess = useCallback(
    (data: Schemas.PrescriptionResponse) => {
      saveCurrentPrescription(data);
      handleOnCloseViewMode();
      queryCache.invalidateQueries(
        ReactQueryKeys["customer-prescriptions-key"],
      );
    },
    [saveCurrentPrescription, handleOnCloseViewMode],
  );
  const handleOnSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
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

  const handleOnMailClicked = useCallback(() => {
    currentPrescription &&
      currentPrescription?.code &&
      sendPrescriptionByEmail({
        code,
        requestCode: currentPrescription.code,
        sendToCustomer: false,
        sendByEmail: true,
        sendToProfessional: false,
      });
  }, [code, currentPrescription, sendPrescriptionByEmail]);

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
    mutate: sendPrescriptionByCell,
    loading: loadingByCell,
  } = useSendPrescriptionsMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });

  const {
    currentProfessional,
    currentProfessionalSpecialties,
    currentProfessionalHeathCenter,
  } = useProfileCacheSelector();

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);
  const handleOpenHistory = useCallback(() => {
    saveCurrentPrescription(undefined);
    setOpenHistory(!openedHistory);
    setOpenForm(!openForm);
  }, [openedHistory, saveCurrentPrescription, setOpenForm, openForm]);

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

  const handleOnPatientCellClicked = useCallback(() => {
    currentPrescription &&
      currentPrescription?.code &&
      sendPrescriptionByCell({
        code,
        requestCode: currentPrescription.code,
        sendToCustomer: true,
        sendByEmail: false,
        sendToProfessional: false,
      });
  }, [code, currentPrescription, sendPrescriptionByCell]);

  const handleShowForm = useCallback(() => {
    saveCurrentPrescription(undefined);
    setOpenHistory(false);
    setShowMode(false);
    setOpenForm(!openForm);
  }, [openForm, saveCurrentPrescription]);

  const {
    loading: loadingPrescriptionPdf,
    mutate: mutatePrescriptionPdf,
  } = usePrescriptionsPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnPrintClicked = useCallback(() => {
    mutatePrescriptionPdf({
      code: currentPatient?.legalID || "",
      requestCode: currentPrescription?.code || "",
    });
  }, [
    currentPatient?.legalID,
    currentPrescription?.code,
    mutatePrescriptionPdf,
  ]);
  const handleOnEdit = useCallback(() => {
    setShowMode(false);
  }, []);

  return (
    <>
      {openForm && (
        <RecipeForm
          showDiagnoses={showDiagnoses}
          showCancelButton={showCancelButton}
          open={open}
          handleAddRecipe={handleAddRecipe}
          handleShow={handleShow}
          handleHistoryPrescriptions={handleOpenHistory}
          loadingSendingEmail={loadingSendingEmail}
          onHistoryClicked={handleOpenHistory}
          onMailClicked={handleOnMailClicked}
          onPatientCellClicked={handleOnPatientCellClicked}
          onPrintClicked={handleOnPrintClicked}
          prescription={defaultPrescriptionsItem}
          loading={loading || editingPrescription}
          allergies={allergies || {}}
          professional={currentProfessional || defaultProfessionalData}
          customer={currentPatient || defaultCustomerData}
          showMode={showMode}
          handleOnEdit={handleOnEdit}
          loadingPdf={loadingPrescriptionPdf}
          sendingCell={loadingByCell}
          currentPrescription={currentPrescription || defaultPrescriptionsItem}
          currentProfessionalSpecialties={currentProfessionalSpecialties || []}
          currentProfessionalHeathCenter={
            currentProfessionalHeathCenter || defaultHealthCenterData
          }
        />
      )}
      {openedHistory && (
        <PrescriptionsDialog
          open={openedHistory}
          handleShow={handleShow}
          onAddClicked={handleShowForm}
        />
      )}
    </>
  );
}
