import React from "react";
import PatientAvatarPanel from "../../../../components/domains/customer/profile/info/PatientAvatarPanel";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import { defaultCustomerData } from "../../../../utils/defaultData";

interface Props {
  handleShowInfo: () => void;
  showInfo?: boolean;
  patientId?: string;
}

const PatientAvatarPanelContainer = ({
  handleShowInfo,
  showInfo = false,
  patientId = "",
}: Props) => {
  const { currentPatient, loading } = usePatientCacheSelector({
    patientId,
  });

  return (
    <PatientAvatarPanel
      customer={currentPatient || defaultCustomerData}
      loading={loading}
      handleShowInfo={handleShowInfo}
      showInfo={showInfo}
    />
  );
};

export default PatientAvatarPanelContainer;
