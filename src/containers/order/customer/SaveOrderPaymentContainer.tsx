/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";
import SaveOrderPaymentDialog from "../../../components/domains/order/payment/SaveOrderPaymentDialog";
import { useRegisterOrderPaymentMutation } from "../../../modules/order/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  order?: Schemas.AppointmentOrderData;
  handleShow: () => void;
  refetch: () => void;
  customerId: string;
}

export default function SaveOrderPaymentContainer({
  open,
  order,
  handleShow,
  refetch,
  customerId,
}: Props) {
  const { addLastAlerts } = useAddLastAlerts();
  const onSuccess = useCallback(() => {
    refetch();
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.order.PAID_SUCCESS_ORDER,
    });
    handleShow();
  }, [addLastAlerts, handleShow, refetch]);

  const { mutate, loading } = useRegisterOrderPaymentMutation({
    onSuccess,
    showError: true,
  });

  const handleRegisterOrderPayment = useCallback(
    (value: Schemas.PaymentFileRequest) => {
      value &&
        mutate({
          code: customerId,
          orderCode: order?.code || "",
          amount: value.amount,
          base64: value.base64,
          name: value.name,
          paymentMethod: value.paymentMethod,
        });
    },
    [customerId, mutate, order?.code],
  );

  return (
    <SaveOrderPaymentDialog
      handleShow={handleShow}
      open={open}
      handleRegisterOrderPayment={handleRegisterOrderPayment}
      loadingRegistering={loading}
    />
  );
}
