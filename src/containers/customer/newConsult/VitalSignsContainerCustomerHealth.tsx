/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import VitalSigns from "../../../components/domains/customer/newConsult/VitalSigns";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useEditHealthCustomerMutation } from "../../../modules/customer/signUp/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VitalSignsContainerCustomerHealth = () => {
  const { currentPatient } = usePatientCacheSelector({});
  const { addLastAlerts } = useAddLastAlerts();
  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["current-patient"], {
      exact: false,
    });
    addLastAlerts({
      message: STRINGS.appointment.SAVED_VITAL_SIGNS,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const { mutate, loading } = useEditHealthCustomerMutation({
    showError: true,
    onSuccess,
  });
  const onSubmitCustomerHealth = useCallback(
    (values: Schemas.AppointmentRecordResponse | Schemas.CustomerHealth) => {
      if (!currentPatient) return;
      mutate({
        legalID: currentPatient.legalID,
        ...currentPatient.health,
        heartRate: values.heartRate,
        respiratoryFrequency: values.respiratoryFrequency,
        systolicBloodPressure: values.systolicBloodPressure,
        diastolicBloodPressure: values.diastolicBloodPressure,
        oxygenSaturation: values.oxygenSaturation,
        temperature: values.temperature,
        weightInKilograms: (values as any).weight,
        heightInCentimeters: (values as any).height,
      });
    },
    [currentPatient, mutate],
  );

  return (
    <VitalSigns
      onSubmit={onSubmitCustomerHealth}
      loading={loading}
      data={
        currentPatient?.health
          ? {
              ...currentPatient?.health,
              height: currentPatient.health.heightInCentimeters,
              weight: currentPatient.health.weightInKilograms,
            }
          : {}
      }
    />
  );
};
export default VitalSignsContainerCustomerHealth;
