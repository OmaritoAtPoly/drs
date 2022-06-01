import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import { useCurrentCertificateToEditCacheSelector } from "../../../../modules/customer/certificates/cacheSelector";
import { useCurrentInterconsultationToEditCacheSelector } from "../../../../modules/customer/interconsult/madeInterConsultationCacheSelector";
import useCurrentProcedureToEditCacheSelector from "../../../../modules/customer/procedures/cacheSelector";
import { buttonActionsAppointment } from "../../../../utils/buttonGrid/buttonGridAppointment";
import renderComponent from "../../../../utils/buttonGrid/renderComponent";
import STRINGS from "../../../../utils/strings";
import ButtonGrid from "../../../buttons/ButtonGrid";
import LabeledButton from "../../../buttons/LabeledButton";
import LoadingWrapper from "../../../LoadingWrapper";

interface Props {
  finishAppointment: () => void;
  appointment: Schemas.AppointmentData;
  loading?: boolean;
  handleDialogName: (value: string) => void;
  handleShow: () => void;
  isAssistant: () => boolean;
  name: string;
  open: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginRight: 15,
      width: "50%",
    },
    labelStyle: {
      textTransform: "uppercase",
    },
    widthButton: {
      marginTop: 5,
    },
    buttonActions: {
      maxWidth: 400,
    },
  }),
);

export default function ActionPanelNewAppointment({
  finishAppointment,
  appointment,
  loading,
  handleDialogName,
  isAssistant,
  name,
  open,
  handleShow,
}: Props) {
  const classes = useStyles();

  const {
    saveCurrentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditCacheSelector();

  const {
    saveCurrentProcedureToEdit,
  } = useCurrentProcedureToEditCacheSelector();

  const {
    saveCurrentCertificateToEdit,
  } = useCurrentCertificateToEditCacheSelector();

  const handleDialogNameCallBack = useCallback(
    (dialogName) => {
      saveCurrentProcedureToEdit(undefined);
      saveCurrentCertificateToEdit(undefined);
      saveCurrentInterconsultationToEdit(undefined);
      handleDialogName(dialogName);
    },
    [
      handleDialogName,
      saveCurrentInterconsultationToEdit,
      saveCurrentCertificateToEdit,
      saveCurrentProcedureToEdit,
    ],
  );

  return (
    <div className={classes.container}>
      <div className={classes.widthButton}>
        <LoadingWrapper loading={loading}>
          <LabeledButton
            disable={appointment.state === "COMPLETED"}
            buttonLabel={STRINGS.generals.FINALIZE_APPOINTMENT}
            onClick={finishAppointment}
            labelStyle={classes.labelStyle}
          />
        </LoadingWrapper>
      </div>
      <div className={classes.buttonActions}>
        <ButtonGrid
          actionButton={buttonActionsAppointment}
          handleDialogName={handleDialogName}
          isAssistant={isAssistant}
        />
        {renderComponent({ name, open, handleShow, handleDialogName: handleDialogNameCallBack })}
      </div>
    </div>
  );
}
