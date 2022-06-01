import React, { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import ButtonGrid from "../../components/buttons/ButtonGrid";
import LoadingWrapper from "../../components/LoadingWrapper";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useCurrentCertificateToEditCacheSelector } from "../../modules/customer/certificates/cacheSelector";
import { useCustomerActionCacheSelector } from "../../modules/customer/customerActionCacheSelector";
import { useCurrentInterconsultationToEditCacheSelector } from "../../modules/customer/interconsult/madeInterConsultationCacheSelector";
import useCurrentProcedureToEditCacheSelector from "../../modules/customer/procedures/cacheSelector";
import { usePatientCacheSelector } from "../../modules/customer/profile/cacheSelector";
import { useCurrentReportToEditCacheSelector } from "../../modules/customer/report/cacheSelector";
import { useResultsCacheSelector } from "../../modules/customer/result/cacheSelector";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import useHandlerError from "../../modules/utils/error/handleError";
import { buttonActions } from "../../utils/buttonGrid/buttonGrid";
import renderComponent from "../../utils/buttonGrid/renderComponent";
import { REQUEST_DATA_TYPE } from "../../utils/enums";
import STRINGS from "../../utils/strings";

const PatientActionContainer = () => {
  const {
    name,
    open,
    setActionPanelName: setName,
    handleOpenActionPanel: setOpen,
  } = useCustomerActionCacheSelector();
  const { currentPatient, loading: loadingPatient } = usePatientCacheSelector(
    {},
  );
  const { push } = useHistory();
  const { handlerError } = useHandlerError();
  const { totalItems, loading: loadingItem } = useResultsCacheSelector({
    seen: false,
    staleTime: 0,
  });

  const {
    saveCurrentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditCacheSelector();

  const {
    saveCurrentCertificateToEdit,
  } = useCurrentCertificateToEditCacheSelector();

  const { saveCurrentReportToEdit } = useCurrentReportToEditCacheSelector();
  const {
    saveCurrentProcedureToEdit,
  } = useCurrentProcedureToEditCacheSelector();

  const handleShow = useCallback(() => {
    setOpen(!open);
    setName("");
  }, [open, setName, setOpen]);
  const { isAssistant } = useProfileCacheSelector();

  const handleSetName = useCallback(
    (dialogName: string) => {
      switch (dialogName) {
        case STRINGS.buttonGrid.RX_REQUESTS:
          queryCache.setQueryData([ReactQueryKeys["default-history-order"]], {
            value: REQUEST_DATA_TYPE.REQUESTS.IMAGE,
          });
          break;
        case STRINGS.buttonGrid.LAB_REQUESTS:
          queryCache.setQueryData([ReactQueryKeys["default-history-order"]], {
            value: REQUEST_DATA_TYPE.REQUESTS.LAB,
          });
          break;
        default:
          break;
      }
      setName(dialogName);
    },
    [setName],
  );

  const handleDialogName = useCallback(
    (dialogName) => {
      if (dialogName === STRINGS.generals.EDIT) {
        if (currentPatient && currentPatient.canEdit) {
          push(`/edit-patient/${currentPatient.legalID}`, {
            from: "background",
          });
        } else {
          handlerError({
            message: STRINGS.error.YOU_CANT_EDIT_USER,
            treatedError: true,
            name: "",
          });
        }
      } else {
        saveCurrentProcedureToEdit(undefined);
        saveCurrentCertificateToEdit(undefined);
        saveCurrentInterconsultationToEdit(undefined);
        saveCurrentReportToEdit(undefined);
        handleSetName(dialogName);
        setOpen(true);
      }
    },
    [
      currentPatient,
      handleSetName,
      handlerError,
      push,
      saveCurrentInterconsultationToEdit,
      saveCurrentCertificateToEdit,
      saveCurrentProcedureToEdit,
      saveCurrentReportToEdit,
      setOpen,
    ],
  );

  const buttonActionsWithNotificationUpdated = useMemo(() => {
    const newActionButton = [...buttonActions];
    newActionButton[5].notificationNumber = totalItems;
    return newActionButton;
  }, [totalItems]);

  return loadingItem || loadingPatient ? (
    <LoadingWrapper loading={loadingItem || loadingPatient}>
      <div />
    </LoadingWrapper>
  ) : (
    <div>
      <ButtonGrid
        actionButton={buttonActionsWithNotificationUpdated}
        handleDialogName={isAssistant() ? () => {} : handleDialogName}
        isAssistant={isAssistant}
        disabled={loadingItem || loadingPatient}
      />
      {renderComponent({
        name: name || "",
        open: open || false,
        handleShow,
        handleDialogName,
      })}
    </div>
  );
};

export default PatientActionContainer;
