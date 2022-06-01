import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useBackgroundPatientCacheSelector } from "../../../../../../modules/customer/background/cacheSelector";
import { useDeletePrescriptionsHistoryMutation } from "../../../../../../modules/customer/newRecipe/mutation";
import { usePatientCacheSelector } from "../../../../../../modules/customer/profile/cacheSelector";
import { usePrescriptionsQuery } from "../../../../../../modules/customer/request/history/query";
import useProfileCacheSelector from "../../../../../../modules/profile/cacheSelector";
import { DEFAULT_PAGE_SIZE } from "../../../../../../utils/constants";
import {
  defaultAllergies,
  defaultCustomerData,
  defaultHealthCenterData,
  defaultPrescriptions,
  defaultProfessionalData,
} from "../../../../../../utils/defaultData";
import PrescriptionsRequestHistoryPanel from "./PrescriptionsRequestHistoryPanel";

interface Props {
  handleShow: () => void;
}

export default function PrescriptionsContainer({ handleShow }: Props) {
  const { id, appointmentId } = useParams<{
    id: string;
    appointmentId: string;
  }>();
  const { data, refetch, loading } = usePrescriptionsQuery({
    code: id,
    appointment: appointmentId,
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    showError: true,
  });

  const {
    currentProfessional,
    currentProfessionalSpecialties,
    currentProfessionalHeathCenter,
  } = useProfileCacheSelector();

  const { currentPatient } = usePatientCacheSelector({});

  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const {
    mutate,
    loading: loadingDelete,
  } = useDeletePrescriptionsHistoryMutation({
    onSuccess,
  });
  const { allergies } = useBackgroundPatientCacheSelector();
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteRequest = useCallback(
    (requestCode: string) => {
      mutate({
        code: id,
        requestCode,
      });
    },
    [id, mutate],
  );

  return (
    <PrescriptionsRequestHistoryPanel
      loadingPrescriptionsRequestHistory={loading}
      historicalPrescriptions={data || defaultPrescriptions}
      allergies={allergies || defaultAllergies}
      deleteRequest={handleDeleteRequest}
      loadingDelete={loadingDelete}
      professional={currentProfessional || defaultProfessionalData}
      customer={currentPatient || defaultCustomerData}
      currentProfessionalSpecialties={currentProfessionalSpecialties || []}
      currentProfessionalHeathCenter={
        currentProfessionalHeathCenter || defaultHealthCenterData
      }
      handleShow={handleShow}
    />
  );
}
