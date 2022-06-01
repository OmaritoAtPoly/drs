/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  createStyles,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import shortid from "shortid";
import { useOperationDataCacheSelector } from "../../../../modules/operationData/cacheSelector";
import { convertFileToBase64 } from "../../../../utils/file";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import Icon from "../../../Icon/Icon";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {},
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    fileRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    input: {
      display: "none",
    },
    formInput: {
      margin: theme.spacing(1),
      maxWidth: "45%",
      alignItems: "center",
    },
    fileSelectorStyle: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    uploadInputStyle: {
      width: "100%",
      marginInline: theme.spacing(2),
    },
  }),
);

interface Props {
  initialValues: Schemas.PaymentFileRequest;
  handleRegisterOrderPayment: (value: Schemas.PaymentFileRequest) => void;
  loadingRegistering: boolean;
}

export default function SaveOrderPaymentForm({
  initialValues,
  handleRegisterOrderPayment,
  loadingRegistering,
}: Props) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleRegisterOrderPayment(values);
    },
  });

  const { values, setFieldValue } = formik;
  const { paymentMethods } = useOperationDataCacheSelector();

  const handleOnImportService = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      setFieldValue("base64", base64);
      setFieldValue("name", `${file?.name}`);
    },
    [setFieldValue],
  );

  return (
    <FormikProvider value={formik}>
      <Form className={classes.container}>
        <div>
          <div className={classes.row} id="register-payment-container">
            <Field name="amount">
              {({ field }: FieldProps) => (
                <TextField
                  variant="outlined"
                  size="small"
                  margin="dense"
                  placeholder={STRINGS.order.AMOUNT}
                  label={STRINGS.order.AMOUNT}
                  type="number"
                  {...field}
                />
              )}
            </Field>
            <div className={classes.fileSelectorStyle}>
              <Field name="paymentMethod">
                {({ field }: FieldProps) => (
                  <TextField
                    className={classes.uploadInputStyle}
                    id="paymentMethod"
                    placeholder={STRINGS.order.FILTER_BY_WAY_PAY}
                    select
                    variant="outlined"
                    size="small"
                    margin="dense"
                    label={STRINGS.order.FILTER_BY_WAY_PAY}
                    {...field}>
                    {paymentMethods.map((payment) => (
                      <MenuItem key={shortid()} value={payment.value}>
                        <Typography>{payment.label}</Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
            </div>
          </div>
          <div className={classes.fileRow}>
            <input
              className={classes.input}
              id="button-file"
              multiple
              type="file"
              onChange={handleOnImportService}
            />
            <label htmlFor="button-file">
              <IconButton color="primary" component="span">
                <Icon name="uploadIcon" />
              </IconButton>
            </label>
            <Typography>{values.name}</Typography>
          </div>
          <PrimaryButton
            label={STRINGS.generals.CONFIRM}
            variant="contained"
            type="submit"
            loading={loadingRegistering}
            disabled={loadingRegistering}
          />
        </div>
      </Form>
    </FormikProvider>
  );
}
