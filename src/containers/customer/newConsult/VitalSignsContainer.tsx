/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import VitalSigns from "../../../components/domains/customer/newConsult/VitalSigns";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import { useAppointmentUpdateRecordMutation } from "../../../modules/customer/appointment/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { defaultRecord } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

interface Props {
  appointmentId?: string;
  readOnly?: boolean;
}

const VitalSignsContainer = ({ appointmentId, readOnly }: Props) => {
  const { appointmentId: appointmentIdParam } = useParams<{
    appointmentId: string;
  }>();
  const {
    data,
    loading: loadingData,
  } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });
  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      [
        ReactQueryKeys["professional-last-new-appointment-record-key"],
        { code: appointmentId || appointmentIdParam },
      ],
      {
        exact: true,
        refetchActive: true,
        refetchInactive: true,
      },
    );
    addLastAlerts({
      message: STRINGS.appointment.SAVED_VITAL_SIGNS,
      severity: "success",
      name: "",
    });
  }, [appointmentId, appointmentIdParam, addLastAlerts]);

  const { mutate, loading } = useAppointmentUpdateRecordMutation({
    showError: true,
    onSuccess,
  });

  const onSubmit = useCallback(
    (values: Schemas.AppointmentRecordRequest | Schemas.CustomerHealth) => {
      mutate({
        ...data,
        heartRate: values.heartRate,
        respiratoryFrequency: values.respiratoryFrequency,
        systolicBloodPressure: values.systolicBloodPressure,
        diastolicBloodPressure: values.diastolicBloodPressure,
        oxygenSaturation: values.oxygenSaturation,
        temperature: values.temperature,
        weight: (values as any).weight,
        height: (values as any).height,
        code: appointmentId || appointmentIdParam,
      });
    },
    [appointmentId, appointmentIdParam, data, mutate],
  );
  return (
    <VitalSigns
      readOnly={readOnly}
      data={data || defaultRecord}
      loadingData={loadingData}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
export default VitalSignsContainer;
