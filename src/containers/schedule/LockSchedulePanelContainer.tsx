import React, { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import LockSchedule from "../../components/schedule/appointment/events/LockSchedule";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useLockScheduleMutation } from "../../modules/appointment/mutation";
import { useAddLastAlerts } from "../../modules/utils/error/handleError";
import STRINGS from "../../utils/strings";

interface Props {
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  pickedDate: Date;
  healthCenter: Schemas.ProfessionalHealthCenterResponse;
  handleShow: () => void;
}

export default function LockSchedulePanelContainer({
  loadingProfessional,
  currentProfessional,
  pickedDate,
  healthCenter,
  handleShow,
}: Props) {
  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.appointment.LOCK_SCHEDULE_SUCCESS,
      severity: "success",
      name: "",
    });
    handleShow();
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-schedule-availabilities-key"],
    );
  }, [addLastAlerts, handleShow]);

  const { mutate, loading: lockingSchedule } = useLockScheduleMutation({
    showError: true,
    onSuccess,
  });

  const healthCenterCode = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      healthCenter && healthCenter.code !== "REMOTE"
        ? healthCenter.code
        : undefined,
    [healthCenter],
  );
  const serviceCode = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      healthCenter && healthCenter.code === "REMOTE"
        ? "REMOTE"
        : "FACE_TO_FACE",
    [healthCenter],
  );

  const handleLockSchedule = useCallback(
    (fromDate: Date, fromTime: Date, toDate: Date, toTime: Date) => {
      const from = `${fromDate.getDate()}-${
        fromDate.getMonth() + 1
      }-${fromDate.getFullYear()} ${fromTime.getHours()}:${fromTime.getMinutes()}`;
      const to = `${toDate.getDate()}-${
        toDate.getMonth() + 1
      }-${toDate.getFullYear()} ${toTime.getHours()}:${toTime.getMinutes()}`;
      mutate({
        from,
        to,
        healthCenterCode,
        serviceCode,
      });
    },
    [healthCenterCode, mutate, serviceCode],
  );

  return (
    <LockSchedule
      lockingSchedule={lockingSchedule}
      loadingProfessional={loadingProfessional}
      currentProfessional={currentProfessional}
      pickedDate={pickedDate}
      handleShow={handleShow}
      onLockSchedule={handleLockSchedule}
    />
  );
}
