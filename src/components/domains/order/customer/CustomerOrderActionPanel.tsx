/* eslint-disable react/no-unused-prop-types */
import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import CustomerOrderFiltersContainer from "../../../../containers/order/customer/CustomerOrderFiltersContainer";
import STRINGS from "../../../../utils/strings";
import LabeledButton from "../../../buttons/LabeledButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    contend: {
      display: "flex",
      flexDirection: "column",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    leftCol: {
      width: "80%",
      alignItems: "center",
    },
    rightCol: {
      width: "20%",
    },
    labelStyle: {
      textTransform: "uppercase",
    },
    result: {
      marginLeft: theme.spacing(6),
    },
  }),
);

interface Props {
  disabledAction: boolean;
  state: string;
  from: string;
  to: string;
  paymentMethod: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setOrderState: (state: string) => void;
  setPaymentMethod: (state: string) => void;
  handleOnNewOrder: () => void;
  handleOnCustomerSelected: (customer: Schemas.CustomerData) => void;
}

export default function CustomerOrderActionPanel({
  disabledAction,
  state,
  from,
  to,
  paymentMethod,
  setFrom,
  setTo,
  setOrderState,
  setPaymentMethod,
  handleOnNewOrder,
  handleOnCustomerSelected,
}: Props) {
  const classes = useStyles();

  return (
    <div className={classes.contend}>
      <div className={classes.container}>
        <div className={classes.leftCol}>
          <CustomerOrderFiltersContainer
            state={state}
            from={from}
            to={to}
            paymentMethod={paymentMethod}
            setFrom={setFrom}
            setTo={setTo}
            setOrderState={setOrderState}
            handleOnCustomerSelected={handleOnCustomerSelected}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
        <div className={classes.rightCol}>
          <LabeledButton
            buttonLabel={STRINGS.order.NEW_ORDER}
            iconName="add"
            onClick={handleOnNewOrder}
            labelStyle={classes.labelStyle}
            disable={disabledAction}
          />
        </div>
      </div>
    </div>
  );
}
