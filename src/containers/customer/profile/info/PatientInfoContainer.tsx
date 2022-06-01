import React from "react";
import PatientInfo from "../../../../components/domains/customer/profile/info/PatientInfo";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import { useOperationDataCacheSelector } from "../../../../modules/operationData/cacheSelector";
import { defaultCustomerData } from "../../../../utils/defaultData";

interface Props {
  patientId?: string;
}

const PatientInfoContainer = ({ patientId = "" }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentPatient, loading } = usePatientCacheSelector({
    patientId,
  });
  const { maritalStatuses, bloodTypes } = useOperationDataCacheSelector();
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <PatientInfo
      customer={currentPatient || defaultCustomerData}
      maritalStatuses={maritalStatuses || { "": "" }}
      bloodTypes={bloodTypes}
    />
  );
};

export default PatientInfoContainer;
