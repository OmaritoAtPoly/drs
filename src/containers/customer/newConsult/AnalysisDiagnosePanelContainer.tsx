import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import AnalysisDiagnosePanel from "../../../components/domains/customer/newConsult/AnalysisDiagnosePanel";
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

const AnalysisDiagnosePanelContainer = ({ appointmentId, readOnly }: Props) => {
  const { appointmentId: appointmentIdParam } = useParams<{
    appointmentId: string;
  }>();
  const { data } = useProfessionalLastAppointmentRecordCacheSelector({
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
      message: STRINGS.appointment.SAVED_ANALYSIS_DIAGNOSIS,
      severity: "success",
      name: "",
    });
  }, [appointmentId, appointmentIdParam, addLastAlerts]);

  const { mutate, loading } = useAppointmentUpdateRecordMutation({
    showError: true,
    onSuccess,
  });

  const onSubmit = useCallback(
    (values: Schemas.AppointmentRecordRequest) => {
      mutate({
        ...data,
        diagnoses: values.diagnoses,
        analysis: values.analysis,
        code: appointmentId || appointmentIdParam,
      });
    },
    [appointmentId, appointmentIdParam, data, mutate],
  );

  return (
    <AnalysisDiagnosePanel
      readOnly={readOnly}
      data={data || defaultRecord}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
export default AnalysisDiagnosePanelContainer;
