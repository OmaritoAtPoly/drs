import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import SaveOrderPaymentForm from "./SaveOrderPaymentForm";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleRegisterOrderPayment: (value: Schemas.PaymentFileRequest) => void;
  loadingRegistering: boolean;
}

export default function SaveOrderPaymentDialog({
  open,
  handleShow,
  handleRegisterOrderPayment,
  loadingRegistering,
}: Props) {
  const actionPanel = useCallback(
    () => (
      <BadgedButton
        onClick={handleShow}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
      />
    ),
    [handleShow],
  );

  return (
    <LabeledDialog
      open={open}
      label={STRINGS.order.SAVE_ORDER_PAYMENT}
      handleShow={handleShow}
      actionPanel={actionPanel()}>
      <SaveOrderPaymentForm
        initialValues={{}}
        handleRegisterOrderPayment={handleRegisterOrderPayment}
        loadingRegistering={loadingRegistering}
      />
    </LabeledDialog>
  );
}
