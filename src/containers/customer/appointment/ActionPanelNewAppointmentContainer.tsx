import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import ActionPanelNewAppointment from "../../../components/domains/customer/appointment/ActionPanelNewAppointment";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useAppointmentCompleteMutation } from "../../../modules/customer/appointment/mutation";
import { useCurrentAppointmentQuery } from "../../../modules/customer/appointment/query";
import { useCurrentCertificateToEditCacheSelector } from "../../../modules/customer/certificates/cacheSelector";
import { useCurrentReportToEditCacheSelector } from "../../../modules/customer/report/cacheSelector";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { defaultAppointmentData } from "../../../utils/defaultData";

export default function ActionPanelNewAppointmentContainer() {
  const { push } = useHistory();
  const { appointmentId, id } = useParams<{
    appointmentId: string;
    id: string;
  }>();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      [ReactQueryKeys["professional-current-appointment-key"]],
      {
        exact: true,
        refetchActive: true,
        refetchInactive: true,
      },
    );
    queryCache.invalidateQueries([ReactQueryKeys["patient-appointment-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    push(`/patient/${id}`);
  }, [id, push]);

  const { mutate, loading: loadingComplete } = useAppointmentCompleteMutation({
    showError: true,
    onSuccess,
  });
  const { data, loading } = useCurrentAppointmentQuery({
    showError: true,
    code: appointmentId,
    enabled: appointmentId,
  });

  const finishAppointment = useCallback(() => {
    mutate({ code: appointmentId });
  }, [appointmentId, mutate]);

  const {
    saveCurrentCertificateToEdit,
  } = useCurrentCertificateToEditCacheSelector();

  const { saveCurrentReportToEdit } = useCurrentReportToEditCacheSelector();

  const handleShow = useCallback(() => {
    setOpen(!open);
    setName("");
  }, [open]);
  const { isAssistant } = useProfileCacheSelector();

  const handleDialogName = useCallback(
    (dialogName) => {
      saveCurrentCertificateToEdit(undefined);
      saveCurrentReportToEdit(undefined);
      setName(dialogName);
      setOpen(true);
    },
    [saveCurrentCertificateToEdit, saveCurrentReportToEdit],
  );

  return (
    <ActionPanelNewAppointment
      appointment={data || defaultAppointmentData}
      loading={loading || loadingComplete}
      finishAppointment={finishAppointment}
      handleDialogName={isAssistant() ? () => {} : handleDialogName}
      handleShow={handleShow}
      isAssistant={isAssistant}
      open={open}
      name={name}
    />
  );
}
