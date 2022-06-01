/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import PatientAppointment from "../../../components/domains/customer/appointment/PatientAppointment";
import {
  useAppointmentsCacheSelector,
  useCurrentAppointmentDetailsCacheSelector,
} from "../../../modules/customer/appointment/cacheSelector";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";

interface Props {
  showOnlyHistory?: boolean;
  hideTitle?: boolean;
  onClickIncomingItem: (
    patientId: string,
    codeAppointment: string,
  ) => () => void;
  onClickHistoryItem: (
    patientId: string,
    codeAppointment: string,
  ) => () => void;
  selectedAppointmentId?: string;
}

const PatientAppointmentContainer = ({
  showOnlyHistory,
  hideTitle,
  onClickIncomingItem,
  onClickHistoryItem,
  selectedAppointmentId,
}: Props) => {
  const {
    saveCurrentAppointmentDetails,
  } = useCurrentAppointmentDetailsCacheSelector();
  const {
    items: incomingAppointments,
    loading: incomingLoading,
    isFetchingMore: incomingLoadingMore,
    fetchMore: incomingFetchMore,
    canFetchMore: incomingCanFetchMore,
  } = useAppointmentsCacheSelector({
    states: ["IN_PROGRESS", "PENDENT", "PAID"],
  });

  const {
    loading: historyLoading,
    isFetchingMore: historyLoadingMore,
    items: historyAppointments,
    fetchMore: historyFetchMore,
    canFetchMore: historyCanFetchMore,
  } = useAppointmentsCacheSelector({
    states: ["COMPLETED"],
  });

  const { isAssistant } = useProfileCacheSelector();
  useEffect(() => {
    // TODO refactor this code
    // saveCurrentAppointmentDetails({
    //   appointmentId:
    //     historyAppointments && historyAppointments.length
    //       ? historyAppointments[0].code
    //       : undefined,
    // });
  }, []);

  return (
    <PatientAppointment
      selectedAppointmentId={selectedAppointmentId}
      hideTitle={hideTitle}
      onClickIncomingItem={onClickIncomingItem}
      incomingAppointments={incomingAppointments}
      incomingLoading={incomingLoading || !!incomingLoadingMore}
      fetchMoreIncoming={incomingFetchMore}
      hasNextPageIncoming={incomingCanFetchMore}
      historyAppointments={historyAppointments}
      onClickHistoryItem={!isAssistant() ? onClickHistoryItem : () => () => { }}
      historyLoading={historyLoading || !!historyLoadingMore}
      fetchMoreHistory={historyFetchMore}
      hasNextPageHistory={historyCanFetchMore}
      showOnlyHistory={showOnlyHistory}
    />
  );
};

export default PatientAppointmentContainer;
