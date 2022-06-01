import React, { useCallback, useState } from "react";
import PatientAvatarRowPanel from "../../../../components/domains/customer/profile/info/PatientAvatarRowPanel";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import { defaultCustomerData } from "../../../../utils/defaultData";

const PatientAvatarRowPanelContainer = () => {
  const { currentPatient, loading } = usePatientCacheSelector({});
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const handleShowInfo = useCallback(() => {
    setOpenInfo(!openInfo);
  }, [openInfo]);

  return (
    <PatientAvatarRowPanel
      customer={currentPatient || defaultCustomerData}
      loading={loading}
      handleShowInfo={handleShowInfo}
      open={openInfo}
    />
  );
};

export default PatientAvatarRowPanelContainer;
