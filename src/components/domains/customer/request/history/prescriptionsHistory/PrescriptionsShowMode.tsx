import React, { useCallback } from "react";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import PrescriptionsItemPrintMode from "./PrescriptionsItemPrintMode";
import LoadingWrapper from "../../../../../LoadingWrapper";
import { useCustomerCurrentPrescriptionQuery } from "../../../../../../modules/customer/request/history/query";
import STRINGS from "../../../../../../utils/strings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: theme.spacing(0.5),
    },
  }),
);
interface Props {
  professional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  prescription: Schemas.PrescriptionResponse;
  allergies: Schemas.CustomerAllergies;
  loadingEdit?: boolean;
  currentProfessionalSpecialties: string[];
  currentProfessionalHeathCenter: Schemas.ProfessionalHealthCenterResponse;
  onEdit: (prescription: Schemas.PrescriptionRequest) => void;
}

export default function PrescriptionsShowMode({
  allergies,
  prescription,
  loadingEdit,
  professional,
  customer,
  currentProfessionalSpecialties,
  currentProfessionalHeathCenter,
  onEdit,
}: Props) {
  const classes = useStyles();

  const { data: currentPrescription } = useCustomerCurrentPrescriptionQuery({
    showError: true,
  });

  const handleOnEdit = useCallback(() => {
    onEdit({
      diagnoses: currentPrescription ? currentPrescription.diagnoses : [],
      items: currentPrescription ? currentPrescription.items : [],
      recommendations: currentPrescription
        ? currentPrescription.recommendations
        : [],
      warningSignals: currentPrescription
        ? currentPrescription.warningSignals
        : [],
    });
  }, [onEdit, currentPrescription]);
  return (
    <div>
      <PrescriptionsItemPrintMode
        prescription={prescription}
        allergies={allergies}
        professional={professional}
        customer={customer}
        currentProfessionalSpecialties={currentProfessionalSpecialties}
        currentProfessionalHeathCenter={currentProfessionalHeathCenter}
      />
      <div className={classes.buttons}>
        <LoadingWrapper loading={loadingEdit}>
          <Button variant="text" color="primary" onClick={handleOnEdit}>
            {STRINGS.generals.EDIT}
          </Button>
        </LoadingWrapper>
      </div>
    </div>
  );
}
