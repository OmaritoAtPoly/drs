/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createStyles,
  Link,
  FormControl,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import useHandlerError from "../../../../../modules/utils/error/handleError";
import theme from "../../../../../styles/theme";
import { defaultCustomerData } from "../../../../../utils/defaultData";
import STRINGS from "../../../../../utils/strings";
import { fullName } from "../../../../../utils/user";
import {
  getTranslatedOrderPayWay,
  getTranslatedOrderState,
} from "../../../../../utils/utils";
import BadgedButton from "../../../../buttons/BadgedButton";
import Icon from "../../../../Icon/Icon";
import OrderDetail from "../orderDetail/OrderDetail";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    row: {
      display: "flex",
      width: "100%",
    },
    accordionSummary: {
      padding: 0,
      paddingRight: "16px",
    },
    shortColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80px",
      padding: 2,
    },
    largeColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      minWidth: "200px",
      padding: 2,
    },
    flex: { display: "flex" },
    center: { alignSelf: "center" },
    centerItems: { alignItems: "center", justifyContent: "center" },
    icon: {
      transform: "rotate(90deg)",
    },
    text: {
      fontWeight: "normal",
      color: theme.palette.text.primary,
    },
  }),
);

interface Props {
  orderNumber: number;
  customer?: Schemas.CustomerData;
  order: Schemas.AppointmentOrderData;
  handleEditOrder: (
    order: Schemas.AppointmentOrderData,
    customerCode: string,
  ) => void;
  handleDeleteOrder: (
    order: Schemas.AppointmentOrderData,
    customerId: string,
  ) => void;
  deleteOrder?: boolean;
  handleSavePaymentOrder: (
    order: Schemas.AppointmentOrderData,
    customerId: string,
  ) => void;
  handleInvoiceOrder: (code: string) => void;
}

export default function OrderRow({
  orderNumber,
  customer = defaultCustomerData,
  order,
  handleEditOrder,
  handleDeleteOrder,
  deleteOrder,
  handleSavePaymentOrder,
  handleInvoiceOrder,
}: Props) {
  const { handlerError } = useHandlerError();
  const classes = useStyles();

  const handleEdit = useCallback(() => {
    order.state === "PENDENT" || order.state === "IN_PROGRESS"
      ? handleEditOrder(order, customer.legalID)
      : handlerError(STRINGS.order.DISABLED_ODER);
  }, [customer.legalID, handleEditOrder, handlerError, order]);

  const handleSavePayment = useCallback(() => {
    order.state === "PENDENT" || order.state === "IN_PROGRESS"
      ? handleSavePaymentOrder(order, customer.legalID)
      : handlerError(STRINGS.order.DISABLED_ODER);
  }, [customer.legalID, handleSavePaymentOrder, handlerError, order]);

  const handleOnDeleteOrder = useCallback(() => {
    handleDeleteOrder(order, customer.legalID);
  }, [customer.legalID, handleDeleteOrder, order]);

  const handleOnInvoiceOrder = useCallback(() => {
    handleInvoiceOrder(order.code || "");
  }, [handleInvoiceOrder, order.code]);

  return (
    <Accordion>
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={
          <Icon className={classes.icon} width={15} height={15} name="arrow" />
        }>
        <div className={classes.row}>
          <div
            className={`${classes.shortColumn} ${classes.flex} ${classes.centerItems}`}>
            <Typography className={classes.text} variant="body2">
              {`${orderNumber}`}
            </Typography>
          </div>
          <div
            className={`${classes.shortColumn} ${classes.flex} ${classes.centerItems}`}>
            <Typography className={classes.text} variant="body2">
              {`${order.createdAt?.dateDay || "-"}/${
                order.createdAt?.dateMonth || "-"
              }/${order.createdAt?.dateYear || "-"}`}
            </Typography>
          </div>
          <div
            className={`${classes.largeColumn} ${classes.flex} ${classes.centerItems}`}>
            <Typography className={classes.text} variant="body2">
              {fullName(customer)}
            </Typography>
          </div>
          <div
            className={`${classes.largeColumn} ${classes.flex} ${classes.centerItems}`}>
            <Typography className={classes.text} variant="body2">
              {getTranslatedOrderState(order.state || "")}
            </Typography>
          </div>
          <div
            className={`${classes.largeColumn} ${classes.flex} ${classes.centerItems}`}>
            <Typography className={classes.text} variant="body2">
              {order.invoiceCode}
            </Typography>
            <Typography className={classes.text} variant="body2">
              {order.invoiceNumber}
            </Typography>
            <Link href={order.invoiceUrl} target="_blank">
              {order.invoiceUrl || "-"}
            </Link>
          </div>

          <div
            className={`${classes.largeColumn} ${classes.flex} ${classes.centerItems}`}>
            <Typography className={classes.text} variant="body2">
              {order.payments &&
                order.payments[0] &&
                getTranslatedOrderPayWay(
                  order.payments[0].paymentMethod || "-",
                )}
            </Typography>
          </div>
          <div>
            {(order.state === "PENDENT" || order.state === "IN_PROGRESS") && (
              <FormControl
                onClick={(event: any) => event.stopPropagation()}
                onFocus={(event: any) => event.stopPropagation()}>
                <BadgedButton
                  iconName="edit"
                  circular
                  iconWidth={10}
                  iconHeight={10}
                  onClick={handleEdit}
                />
              </FormControl>
            )}
            {order.state === "PENDENT" && (
              <FormControl
                onClick={(event: any) => event.stopPropagation()}
                onFocus={(event: any) => event.stopPropagation()}>
                <BadgedButton
                  iconName="trash"
                  fill={theme.palette.error.dark}
                  circular
                  iconWidth={10}
                  iconHeight={10}
                  onClick={handleOnDeleteOrder}
                  loading={deleteOrder}
                />
              </FormControl>
            )}
            {order.state !== "INVOICED" &&
              order.state !== "CANCELED" &&
              order.state !== "PAID" && (
                <FormControl
                  onClick={(event: any) => event.stopPropagation()}
                  onFocus={(event: any) => event.stopPropagation()}>
                  <BadgedButton
                    iconName="money"
                    circular
                    iconWidth={10}
                    iconHeight={10}
                    onClick={handleSavePayment}
                  />
                </FormControl>
              )}
            {order.state !== "INVOICED" && order.state !== "CANCELED" && (
              <FormControl
                onClick={(event: any) => event.stopPropagation()}
                onFocus={(event: any) => event.stopPropagation()}>
                <BadgedButton
                  iconName="invoice"
                  circular
                  iconWidth={10}
                  iconHeight={10}
                  onClick={handleOnInvoiceOrder}
                />
              </FormControl>
            )}
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <OrderDetail order={order} />
      </AccordionDetails>
    </Accordion>
  );
}
