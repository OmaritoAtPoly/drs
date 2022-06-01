import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import AddCardDialog from "./AddCardDialog";

interface Props {
  loading: boolean;
  onAddCard: (card: Schemas.PaymentCardData) => void;
}

export default function PaymentezForm({ loading, onAddCard }: Props) {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(true); // TODO this will be false by default;

  const handleShow = useCallback(() => {
    setOpen(!open);
    history.goBack();
  }, [history, open]);

  return (
    <AddCardDialog
      open={open}
      label="Agregar nueva tarjeta"
      handleShow={handleShow}
      onAddCard={onAddCard}
      loading={loading}
    />
  );
}
