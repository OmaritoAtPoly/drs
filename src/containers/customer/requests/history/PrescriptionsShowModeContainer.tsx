import React from "react";
import PrescriptionsShowMode from "../../../../components/domains/customer/request/history/prescriptionsHistory/PrescriptionsShowMode";
import { defaultHealthCenterData } from "../../../../utils/defaultData";

interface Props {
  professional: Schemas.ProfessionalData;
  customer: Schemas.CustomerData;
  prescription: Schemas.PrescriptionResponse;
  allergies: Schemas.CustomerAllergies;
  currentProfessionalSpecialties: string[];
  currentProfessionalHeathCenter: Schemas.ProfessionalHealthCenterResponse;
  handleOnEdit: (prescription: Schemas.PrescriptionRequest) => void;
}

export default function PrescriptionsShowModeContainer({
  allergies,
  prescription,
  professional,
  customer,
  currentProfessionalSpecialties,
  currentProfessionalHeathCenter,
  handleOnEdit,
}: Props) {
  return (
    <PrescriptionsShowMode
      prescription={prescription}
      allergies={allergies}
      professional={professional}
      customer={customer}
      currentProfessionalSpecialties={currentProfessionalSpecialties}
      currentProfessionalHeathCenter={
        currentProfessionalHeathCenter || defaultHealthCenterData
      }
      onEdit={handleOnEdit}
    />
  );
}
