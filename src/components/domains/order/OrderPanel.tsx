import {
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import React, { useCallback, useMemo, useState } from "react";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";
import PrimaryButton from "../../buttons/PrimaryButton";
import Autocomplete from "../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../inputs/Search/NoOptionMatchItem";
import InvoicePanel from "./InvoicePanel";
import ServiceListPanel from "./ServiceListPanel";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      minHeight: "200px",
    },
    col: {
      width: "50%",
      padding: theme.spacing(2),
    },
    invoiceLabel: { fontWeight: "bold", marginRight: theme.spacing(2) },
    form: {
      display: "flex",
      alignItems: "center",
    },
  }),
);

interface Props {
  loadingServices: boolean;
  loadingProducts: boolean;
  editingOrder: boolean;
  searchResult: Schemas.ProfessionalProductData[];
  order: Schemas.AppointmentOrderData;
  handleAddItem: (value: Schemas.ProfessionalProductData) => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleDeleteService: (service: Schemas.ProfessionalProductData) => void;
  handleEditOrder: (request: Schemas.AppointmentOrderRequest) => void;
  handleCreateNewService: () => void;
}

export default function OrderPanel({
  loadingServices,
  loadingProducts,
  editingOrder,
  searchResult,
  order,
  handleAddItem,
  onDebounceSearch,
  handleDeleteService,
  handleEditOrder,
  handleCreateNewService,
}: Props) {
  const classes = useStyles();
  const [newRequestName, setNewRequestName] = useState<string>("");
  const [discount, setDiscount] = useState<string>(`${order.discount}`);
  const { addLastAlerts } = useAddLastAlerts();

  const filterOptions = createFilterOptions({
    stringify: (option: Schemas.ProfessionalProductData) =>
      `${option.name} ${option.code}`,
  });

  const onAddRequest = useCallback(
    (request: Schemas.ProfessionalProductData) => {
      if (request) {
        request.code === undefined
          ? handleCreateNewService()
          : handleAddItem(request);
      }
    },
    [handleAddItem, handleCreateNewService],
  );

  const handleOnChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.ChangeEvent<any>) => {
      setNewRequestName(e.target.value);
      onDebounceSearch(e);
    },
    [onDebounceSearch],
  );

  const handleOnDiscountChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setDiscount(event.target.value);
    },
    [],
  );

  const subtotal = useMemo(() => (order && order.subtotal) || 0, [order]);
  const total = useMemo(() => (order && order.total) || 0, [order]);
  const orderDiscount = useMemo(() => (order && order.discount) || 0, [order]);
  const products = useMemo(() => (order && order.products) || [], [order]);
  const tax12 = useMemo(() => (order && order.tax12) || 0, [order]);
  const subtotalNoTax = useMemo(() => (order && order.subtotalNoTax) || 0, [
    order,
  ]);
  const subtotal12Tax = useMemo(() => (order && order.subtotalTax12) || 0, [
    order,
  ]);

  const handleOnEditOrder = useCallback(() => {
    const parsedDiscount = parseFloat(discount);
    parsedDiscount <= subtotal
      ? handleEditOrder({ discount: parseFloat(discount) })
      : addLastAlerts({
          name: "Error",
          message: STRINGS.error.INVALID_DISCOUNT,
          severity: "error",
        });
  }, [addLastAlerts, discount, handleEditOrder, subtotal]);

  return (
    <div className={classes.container}>
      <div className={classes.col}>
        <Autocomplete
          loading={loadingServices}
          options={searchResult}
          getOptionLabel={
            // eslint-disable-next-line no-confusing-arrow
            (option: Schemas.ProfessionalProductData) =>
              option.code
                ? `( ${option.code || "-"} ) ${option.name || ""} `
                : newRequestName
            // eslint-disable-next-line react/jsx-curly-newline
          }
          filterOptions={filterOptions}
          freeSolo
          autoComplete={false}
          onChange={onAddRequest}
          renderInitialOption={() => (
            <NoOptionMatchItem
              item={{ label: newRequestName, value: newRequestName }}
            />
          )}
          inputProps={{
            autoComplete: "off",
            placeholder: STRINGS.service.ADD_SERVICE_PRODUCT,
          }}
          onDebounce={handleOnChange}
        />
        <ServiceListPanel
          loading={loadingProducts}
          services={products}
          handleDeleteService={handleDeleteService}
        />
        <div>
          <Typography className={classes.invoiceLabel}>
            {STRINGS.order.DISCOUNT}
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              placeholder={STRINGS.order.DISCOUNT}
              label={STRINGS.order.DISCOUNT}
              type="number"
              value={discount}
              onChange={handleOnDiscountChange}
            />
            <PrimaryButton
              onClick={handleOnEditOrder}
              label={STRINGS.generals.SAVE}
              variant="contained"
              loading={editingOrder}
              disabled={editingOrder}
            />
          </div>
        </div>
      </div>
      <div className={classes.col}>
        <InvoicePanel
          total={total}
          discount={orderDiscount}
          tax12={tax12}
          subtotalNoTax={subtotalNoTax}
          subtotal12Tax={subtotal12Tax}
          subtotal={subtotal}
        />
      </div>
    </div>
  );
}
