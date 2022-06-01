/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createStyles,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import React, { ChangeEvent, useCallback, useState } from "react";
import shortid from "shortid";
import { orderStateOptions } from "../../../../utils/defaultData";
import STRINGS from "../../../../utils/strings";
import { fullName } from "../../../../utils/user";
import BadgedButton from "../../../buttons/BadgedButton";
import PopoverButton from "../../../buttons/PopOverButton";
import DatePicker from "../../../inputs/DatePicker";
import Autocomplete from "../../../inputs/Search/Autocomplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      width: "100%",
      height: "100%",
    },
    popOverContainer: {
      padding: "10px",
    },
    search: {
      minWidth: 250,
      marginRight: 3,
    },
    row: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    date: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #D6E3F3",
      paddingLeft: "10px",
      borderRadius: 5,
      minWidth: 250,
      height: 40,
    },
    inputDate: {
      display: "flex",
      flexDirection: "row",
      minWidth: 257,
      alignItems: "center",
    },
    filter: {
      marginLeft: theme.spacing(1),
    },
    inputForm: {
      margin: "10px",
    },
    inputContainer: { width: "100%" },
    inputFormContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px",
    },
    textInput: {
      width: "100%",
    },
  }),
);

interface Props {
  selectedFromDate: Date;
  selectedToDate: Date;

  loadingSearch?: boolean;
  customersOptions?: Schemas.CustomerData[];
  state: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentMethods: any[];
  paymentMethod: string;
  handleFromDateChange?: ((date?: Date | undefined) => void) | undefined;
  handleToDateChange?: ((date?: Date | undefined) => void) | undefined;
  onDebounceSearch?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleOnCustomerSelected: (customer: Schemas.CustomerData) => void;
  setOrderState: (state: string) => void;
  setPaymentMethod: (state: string) => void;
}

const CustomerOrderFilters = ({
  selectedFromDate,
  selectedToDate,
  loadingSearch,
  customersOptions,
  state,
  paymentMethods,
  paymentMethod,
  handleFromDateChange,
  handleToDateChange,
  onDebounceSearch,
  handleOnCustomerSelected,
  setOrderState,
  setPaymentMethod,
}: Props) => {
  const classes = useStyles();

  const handleOnStateChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setOrderState(event.target.value);
    },
    [setOrderState],
  );

  const handlePaymentMethodChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPaymentMethod(event.target.value);
    },
    [setPaymentMethod],
  );

  const renderPopOverComponent = useCallback(
    (handleCloseCallBack: () => void) => (
      <div className={classes.popOverContainer}>
        <div className={classes.inputForm}>
          <Typography>{STRINGS.order.FROM_FILTER}</Typography>
          <DatePicker
            date={selectedFromDate}
            handleDateChange={handleFromDateChange}
            disableToolbar
            variant="inline"
            autoOk
            className={classes.date}
            InputProps={{
              disableUnderline: true,
              className: classes.inputDate,
            }}
          />
        </div>
        <div className={classes.inputForm}>
          <Typography>{STRINGS.order.TO_FILTER}</Typography>
          <DatePicker
            date={selectedToDate}
            handleDateChange={handleToDateChange}
            disableToolbar
            autoOk
            variant="inline"
            className={classes.date}
            InputProps={{
              disableUnderline: true,
              className: classes.inputDate,
            }}
          />
        </div>
        <div className={classes.inputFormContainer}>
          <div className={classes.inputContainer}>
            <TextField
              id="payment-method"
              placeholder={STRINGS.order.FILTER_BY_WAY_PAY}
              select
              variant="outlined"
              size="small"
              margin="dense"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className={classes.textInput}
              label={STRINGS.order.FILTER_BY_WAY_PAY}>
              {paymentMethods.map((payment) => (
                <MenuItem key={shortid()} value={payment.value}>
                  <Typography>{payment.label}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </div>
          {paymentMethod !== "" && (
            <BadgedButton
              circular
              iconName="delete"
              iconHeight={15}
              iconWidth={15}
              onClick={() => {
                setPaymentMethod("");
              }}
            />
          )}
        </div>
        <div className={classes.inputFormContainer}>
          <div className={classes.inputContainer}>
            <TextField
              id="state"
              className={classes.textInput}
              placeholder={STRINGS.order.FILTER_BY_STATE}
              select
              variant="outlined"
              size="small"
              margin="dense"
              value={state}
              onChange={handleOnStateChange}
              label={STRINGS.order.FILTER_BY_STATE}>
              {orderStateOptions.map((orderState) => (
                <MenuItem key={shortid()} value={orderState.value}>
                  <Typography>{orderState.label}</Typography>
                </MenuItem>
              ))}
            </TextField>
          </div>
          {state !== "" && (
            <BadgedButton
              circular
              iconHeight={15}
              iconWidth={15}
              iconName="delete"
              onClick={() => {
                setOrderState("");
              }}
            />
          )}
        </div>
      </div>
    ),
    [
      classes.date,
      classes.inputContainer,
      classes.inputDate,
      classes.inputForm,
      classes.inputFormContainer,
      classes.popOverContainer,
      classes.textInput,
      handleFromDateChange,
      handleOnStateChange,
      handlePaymentMethodChange,
      handleToDateChange,
      paymentMethod,
      paymentMethods,
      selectedFromDate,
      selectedToDate,
      setOrderState,
      setPaymentMethod,
      state,
    ],
  );

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.filter}>
          <Autocomplete
            classes={{ root: classes.search }}
            loading={loadingSearch}
            options={customersOptions}
            getOptionLabel={(option: Schemas.CustomerData) => fullName(option)}
            freeSolo
            onChange={handleOnCustomerSelected}
            inputProps={{
              placeholder: STRINGS.generals.FIND_PATIENT_BY_NAME,
            }}
            onDebounce={onDebounceSearch}
          />
        </div>
        <PopoverButton
          iconName="filter"
          renderContent={renderPopOverComponent}
        />
      </div>
    </div>
  );
};

export default CustomerOrderFilters;
