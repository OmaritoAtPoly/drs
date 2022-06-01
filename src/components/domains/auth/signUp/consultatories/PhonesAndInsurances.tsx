/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useMemo } from "react";
import { ValueAndLabelType } from "../../../../../utils/types";
import InsuranceCreatorList from "./insurances/InsuranceCreatorList";
import PhoneCreatorList from "./phones/PhoneCreatorList";

interface Props {
  phones: Schemas.PhoneRequest[];
  phoneSetFieldValue: (field: string, value: Schemas.PhoneRequest[]) => void;
  phoneFieldName: string;
  purePhoneTypes?: ValueAndLabelType[];
  contactPerson: ValueAndLabelType[];
  setFieldValue: (
    field: string,
    value: string[] | Schemas.PhoneRequest[],
  ) => void;
  insurances: Schemas.HealthInsuranceData[];
  insuranceFieldName: string;
  insuranceValue: string[];
  errors: FormikErrors<{
    phones: { prefix: string; number: string; phoneType: string }[];
  }>;
}
const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

const PhonesAndInsurances = ({
  contactPerson,
  insuranceFieldName,
  insuranceValue,
  insurances,
  phoneFieldName,
  phoneSetFieldValue,
  phones,
  setFieldValue,
  purePhoneTypes,
  errors,
}: Props) => {
  const classes = styles();

  const noEmptyPhones = useMemo(() => phones.filter((a) => a.number !== ""), [
    phones,
  ]);

  const onAddPhone = useCallback(
    (value: Schemas.PhoneRequest) => {
      setFieldValue(phoneFieldName, [...noEmptyPhones, value]);
    },
    [setFieldValue, noEmptyPhones, phoneFieldName],
  );

  const onAddInsurance = useCallback(
    (value: string) => {
      setFieldValue(insuranceFieldName, [...insuranceValue, value]);
    },
    [setFieldValue, insuranceFieldName, insuranceValue],
  );

  return (
    <div className={classes.container} id="phones-insurances-container">
      <PhoneCreatorList
        contactPerson={contactPerson}
        purePhoneTypes={purePhoneTypes}
        onAddPhone={onAddPhone}
        setFieldValue={phoneSetFieldValue}
        phones={phones}
        errors={errors}
      />
      <InsuranceCreatorList
        insuranceValue={insuranceValue}
        onAddInsurance={onAddInsurance}
        setFieldValue={setFieldValue}
        insurances={insurances}
        errors={errors as any}
      />
    </div>
  );
};

export default PhonesAndInsurances;
