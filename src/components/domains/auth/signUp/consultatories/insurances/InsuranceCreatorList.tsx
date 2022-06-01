import { Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import InsuranceCreatorForm from "./InsuranceCreatorForm";
import InsuranceList from "./InsuranceList";

interface Props {
  setFieldValue: (field: string, value: string[]) => void;
  onAddInsurance: (value: string) => void;
  insurances: Schemas.HealthInsuranceData[];
  insuranceValue: string[];
  errors: FormikErrors<Schemas.ProfessionalData>;
}

const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: "16px",
  },
  addPhoneWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  buttonStyle: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
    marginTop: 2,
    height: 40,
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
  },
});

const InsuranceCreatorList = ({
  insuranceValue,
  onAddInsurance,
  insurances,
  setFieldValue,
  errors,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const classes = styles();

  const insuranceNames = useMemo(
    () =>
      insuranceValue.map(
        (v) => insurances.find((f) => f.code === v)?.name || "",
      ),
    [insuranceValue, insurances],
  );

  const handleAddInsurance = useCallback(
    (value: string) => {
      onAddInsurance(value);
      setVisible(!visible);
    },
    [onAddInsurance, visible],
  );

  const onPressDelete = useCallback(
    (name: string) => {
      const insurance = insurances.find((a) => a.name === name);
      if (!insurance) return;
      const valueRemaining = insuranceValue.filter((a) => a !== insurance.code);
      setFieldValue("insurances", valueRemaining);
    },
    [insuranceValue, insurances, setFieldValue],
  );

  return (
    <div className={classes.root}>
      <Dialog
        hideBackdrop // Disable the backdrop color/image
        disableEnforceFocus // Let the user focus on elements outside the dialog
        disableBackdropClick // Remove the backdrop click (just to be sure)
        open={visible}
        onClose={() => setVisible(!visible)}>
        <InsuranceCreatorForm
          insurances={insurances}
          handleSubmitValues={handleAddInsurance}
        />
      </Dialog>
      <div className={classes.addPhoneWrapper}>
        <InsuranceList insurances={insuranceNames} onDelete={onPressDelete} />
        <Button
          className={classes.buttonStyle}
          onClick={() => setVisible(true)}
          variant="outlined">
          {STRINGS.signUp.ADD_INSURANCES}
        </Button>
        {errors.insurances?.length && (
          <Typography className={classes.errorStyle}>
            {STRINGS.error.CHOOSE_INSURANCE}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default InsuranceCreatorList;
