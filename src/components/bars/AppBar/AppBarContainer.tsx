/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useSignUpCacheSelector from "../../../modules/auth/signUp/cacheSelector";
import { useNewAppointmentMutation } from "../../../modules/customer/appointment/mutation";
import { useCustomersCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useUpdateCurrentHealthCenterMutation } from "../../../modules/profile/mutation";
import useHandlerError from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";
import AppBar from "./AppBar";

export default function AppBarContainer() {
  const { location } = useHistory();
  const { push } = useHistory();
  const { handlerError } = useHandlerError();
  const { gendersData: gendersOptions } = useSignUpCacheSelector();

  const {
    currentProfessional,
    currentProfessionalHeathCenter,
    hasActiveSubscription,
    loadingCurrentCustomer,
    isAssistant,
  } = useProfileCacheSelector();

  const showSearch = useMemo(() => location.pathname !== "/patients/", [
    location.pathname,
  ]);

  const {
    items,
    loading,
    setSearch,
    isFetchingMore,
  } = useCustomersCacheSelector({});

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [setSearch],
  );

  const onSuccess = useCallback(
    (
      data: Schemas.AppointmentData,
      { customerLegalID }: Schemas.AppointmentProfessionalRequest,
    ) => {
      queryCache.setQueryData(
        ReactQueryKeys["professional-last-new-appointment-key"],
        data,
      );
      queryCache.invalidateQueries([ReactQueryKeys["professional-me"]], {
        exact: true,
      });
      push(`/patient/${customerLegalID}/new-consult/${data.code}`);
    },
    [push],
  );

  const { mutate } = useNewAppointmentMutation({ showError: true, onSuccess });

  const handleAdd = useCallback(
    (customer: Schemas.CustomerData) => (reason: string[]) => {
      mutate({
        reason,
        customerLegalID: customer.legalID,
      });
    },
    [mutate],
  );

  const onClick = useCallback(
    (customer: Schemas.CustomerData) => () => {
      push(`/patient/${customer.legalID}`);
    },
    [push],
  );

  const handleEdit = useCallback(
    (customer: Schemas.CustomerData) => () => {
      if (customer.canEdit) {
        push(`/edit-patient/${customer.legalID}`);
      } else {
        handlerError({
          message: STRINGS.error.YOU_CANT_EDIT_USER,
          treatedError: true,
          name: "",
        });
      }
    },
    [handlerError, push],
  );

  const onSuccessCurrentHeathCenter = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["user-me-professional"], {
      exact: true,
    });
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
      exact: true,
    });
  }, []);

  const {
    mutate: mutateCurrentHeathCenter,
    loading: loadingCurrentHeathCenter,
  } = useUpdateCurrentHealthCenterMutation({
    showError: true,
    onSuccess: onSuccessCurrentHeathCenter,
  });

  const updateCurrentHealthCenter = useCallback(
    (healthCenter?: Schemas.ProfessionalHealthCenterResponse) => {
      if (!healthCenter) return;
      mutateCurrentHeathCenter({ code: healthCenter.code || "" });
    },
    [mutateCurrentHeathCenter],
  );

  return (
    <AppBar
      customersOptions={items || []}
      onDebounceSearch={onDebounceSearch}
      currentProfessional={currentProfessional}
      loading={loadingCurrentCustomer}
      loadingSearch={loading || !!isFetchingMore}
      showSearch={showSearch && hasActiveSubscription}
      handleEdit={handleEdit}
      onClick={onClick}
      handleAdd={handleAdd}
      isAssistant={isAssistant}
      currentProfessionalHeathCenter={currentProfessionalHeathCenter}
      loadingCurrentHeathCenter={
        loadingCurrentHeathCenter || loadingCurrentCustomer
      }
      updateCurrentHealthCenter={updateCurrentHealthCenter}
      gendersOptions={gendersOptions || []}
    />
  );
}
