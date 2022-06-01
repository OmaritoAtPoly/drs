import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import ActiveMedications from "../../../components/domains/customer/medications/ActiveMedications";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerMedicationsMutation } from "../../../modules/customer/background/medications/mutation";
import { useCustomerMedicationsQuery } from "../../../modules/customer/background/medications/query";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";

export default function ActiveMedicationsContainer() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { patientLegalId } = usePatientCacheSelector({});
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const { loading, data } = useCustomerMedicationsQuery({
    code: patientLegalId || "",
    showError: true,
  });

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["customer-medications-key"]);
    handleMode();
  }, [handleMode]);

  const { mutate, loading: updating } = useUpdateCustomerMedicationsMutation({
    onSuccess,
    showError: true,
  });

  const convertStringToArray = useCallback(
    (text: string | string[] | undefined) => {
      if (Array.isArray(text)) {
        return text;
      }
      if (text !== undefined) {
        return text.split(/[\n,]+/);
      }
      return [];
    },
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const prepareDataToInsert = useCallback(
    (medicationList: Schemas.CustomerMedicationData[]) =>
      medicationList.map(
        (medication): Schemas.CustomerMedicationData => ({
          canEdit: medication.canEdit,
          code: medication.code,
          fromDate: medication.fromDate,
          currentIllness:
            medication.currentIllness &&
            convertStringToArray(medication.currentIllness),
          diagnoses:
            medication.diagnoses && convertStringToArray(medication.diagnoses),
          medicine: medication.medicine,
        }),
      ),
    [convertStringToArray],
  );

  const handleOnUpdate = useCallback(
    (medicationList: Schemas.CustomerMedicationData[]) => {
      mutate({
        medications: prepareDataToInsert(medicationList),
        code: patientLegalId || "",
      });
    },
    [mutate, patientLegalId, prepareDataToInsert],
  );

  return (
    <ActiveMedications
      medicationList={data}
      editMode={editMode}
      loading={loading}
      updating={updating}
      handleOnUpdateList={handleOnUpdate}
      handleMode={handleMode}
    />
  );
}
