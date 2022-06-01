import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import useSignUpCacheSelector from "../../../../modules/auth/signUp/cacheSelector";
import { useNewAppointmentMutation } from "../../../../modules/customer/appointment/mutation";
import { useDeleteCustomerMutation } from "../../../../modules/customer/signUp/mutation";
import useHandlerError, {
  useAddLastAlerts,
} from "../../../../modules/utils/error/handleError";
import STRINGS from "../../../../utils/strings";
import ConfirmModal from "../../../modals/ConfirmModal";
import CustomerSimpleRow from "./CustomerSimpleRow";

interface Props {
  customer: Schemas.CustomerData;
}

const CustomerSimpleRowContainer = ({ customer }: Props) => {
  const { push } = useHistory();
  const { handlerError } = useHandlerError();
  const [
    openedDeleteConfirmationModal,
    setOpenDeleteConfirmationModal,
  ] = useState<boolean>(false);
  const { gendersData: gendersOptions } = useSignUpCacheSelector();
  const { addLastAlerts } = useAddLastAlerts();

  const handleOpenDeleteCustomerModal = useCallback(() => {
    setOpenDeleteConfirmationModal(!openedDeleteConfirmationModal);
  }, [openedDeleteConfirmationModal]);

  const onSuccess = useCallback(
    (data: Schemas.AppointmentData) => {
      queryCache.setQueryData(
        ReactQueryKeys["professional-last-new-appointment-key"],
        data,
      );
      queryCache.invalidateQueries([ReactQueryKeys["professional-me"]], {
        exact: true,
      });
      push(`/patient/${customer.legalID}/new-consult/${data.code}`);
    },
    [customer.legalID, push],
  );

  const { mutate } = useNewAppointmentMutation({ showError: true, onSuccess });

  const onDeleteSuccess = useCallback(() => {
    addLastAlerts({
      name: "",
      message: STRINGS.generals.CUSTOMER_DELETE_SUCCESS,
      severity: "success",
    });
    queryCache.invalidateQueries(ReactQueryKeys.patients);
    handleOpenDeleteCustomerModal();
  }, [addLastAlerts, handleOpenDeleteCustomerModal]);

  const {
    mutate: deleteCustomerMutate,
    loading: deletingCustomer,
  } = useDeleteCustomerMutation({
    showError: true,
    onSuccess: onDeleteSuccess,
  });

  const handleConfirmDeleteCustomer = useCallback(() => {
    deleteCustomerMutate({ code: customer.legalID });
  }, [customer.legalID, deleteCustomerMutate]);

  const handleAdd = useCallback(
    (reason: string[]) => {
      mutate({
        reason,
        customerLegalID: customer.legalID,
      });
    },
    [customer.legalID, mutate],
  );

  const onClick = useCallback(() => {
    push(`/patient/${customer.legalID}`);
  }, [customer.legalID, push]);

  const handleEdit = useCallback(() => {
    if (customer.canEdit) {
      push(`/edit-patient/${customer.legalID}`);
    } else {
      handlerError({
        message: STRINGS.error.YOU_CANT_EDIT_USER,
        treatedError: true,
        name: "",
      });
    }
  }, [customer.canEdit, customer.legalID, handlerError, push]);

  return (
    <>
      <CustomerSimpleRow
        id={customer.legalID}
        customer={customer}
        handleEdit={handleEdit}
        handleDelete={handleOpenDeleteCustomerModal}
        onBegin={handleAdd}
        onClick={onClick}
        gendersOptions={gendersOptions || []}
      />
      <ConfirmModal
        open={openedDeleteConfirmationModal}
        loadingOnConfirm={deletingCustomer}
        title={STRINGS.generals.ALERT}
        info={STRINGS.generals.CONFIRM_DELETE_CUSTOMER}
        confirmButtonText={STRINGS.generals.CONFIRM}
        handleShow={handleOpenDeleteCustomerModal}
        onConfirm={handleConfirmDeleteCustomer}
      />
    </>
  );
};

export default CustomerSimpleRowContainer;
