import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import PhysicalExam from "../../../components/domains/customer/newConsult/PhysicalExam";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import { useAppointmentUpdateRecordMutation } from "../../../modules/customer/appointment/mutation";
import { useAppointmentOperationDataCacheSelector } from "../../../modules/operationData/cacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { defaultRecord } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

interface Props {
  appointmentId?: string;
  readOnly?: boolean;
}

export default function PhysicalExamContainer({
  appointmentId,
  readOnly,
}: Props) {
  const { appointmentId: appointmentIdParam } = useParams<{
    appointmentId: string;
  }>();
  const {
    data: appointmentOperationData,
  } = useAppointmentOperationDataCacheSelector();
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
      message: STRINGS.appointment.SAVED_BODY_TEST,
      severity: "success",
      name: "",
    });
  }, [appointmentId, appointmentIdParam, addLastAlerts]);

  const { mutate, loading } = useAppointmentUpdateRecordMutation({
    showError: true,
    onSuccess,
  });
  const onSubmit = useCallback(
    (values: Schemas.AppointmentRecordResponse) => {
      mutate({
        ...data,
        physicalExam: values.physicalExam,
        physicalExamBySystem: values.physicalExamBySystem,
        physicalExamByBody: values.physicalExamByBody,
        code: appointmentId || appointmentIdParam,
      });
    },
    [appointmentId, appointmentIdParam, data, mutate],
  );

  return (
    <PhysicalExam
      readOnly={readOnly}
      appointmentOperationData={appointmentOperationData}
      data={data || defaultRecord}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
}
