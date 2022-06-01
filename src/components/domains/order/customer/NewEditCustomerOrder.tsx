import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import PrimaryButton from "../../../buttons/PrimaryButton";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import OrderPanel from "../OrderPanel";

const useStyles = makeStyles((theme) =>
  createStyles({
    actionSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
      width: "100%",
    },
  }),
);

interface Props {
  open: boolean;
  addingProduct: boolean;
  editingOrder: boolean;
  loadingServices: boolean;
  order: Schemas.AppointmentOrderData;
  products: Schemas.ProfessionalProductData[];
  handleShow: () => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleAddProductToOrder: (value: Schemas.ProfessionalProductData) => void;
  handleCreateNewService: () => void;
  handleDeleteService: (service: Schemas.ProfessionalProductData) => void;
  handleEditOrder: (request: Schemas.AppointmentOrderRequest) => void;
}

export default function NewEditCustomerOrderDialog({
  open,
  addingProduct,
  editingOrder,
  loadingServices,
  order,
  products,
  handleShow,
  handleAddProductToOrder,
  onDebounceSearch,
  handleCreateNewService,
  handleDeleteService,
  handleEditOrder,
}: Props) {
  const classes = useStyles();

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
      label={STRINGS.order.NEW_ORDER}
      handleShow={handleShow}
      actionPanel={actionPanel()}>
      <>
        <OrderPanel
          loadingServices={loadingServices}
          editingOrder={editingOrder}
          searchResult={products}
          loadingProducts={addingProduct}
          order={order}
          handleEditOrder={handleEditOrder}
          handleDeleteService={handleDeleteService}
          handleCreateNewService={handleCreateNewService}
          onDebounceSearch={onDebounceSearch}
          handleAddItem={handleAddProductToOrder}
        />
        <div className={classes.actionSection}>
          <PrimaryButton
            variant="contained"
            onClick={handleShow}
            label={STRINGS.generals.TO_END}
          />
        </div>
      </>
    </LabeledDialog>
  );
}
