import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import STRINGS from "../../../../../utils/strings";
import {
  bloodTypesMemo,
  contactPhone,
  getCityName,
  mainAddress,
  mainPhonesOrDefault,
  maritalStatusesMemo,
} from "../../../../../utils/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    label: {
      display: "block ruby",
      color: "#828282",
      textAlign: "end",
      fontSize: "14px",
      lineHeight: "19px",
    },
    data: {
      color: "#323232",
      marginLeft: theme.spacing(3),
      fontSize: "14px",
      lineHeight: "19px",
    },
    text: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    labelDiv: {
      width: "30%",
      textAlign: "end",
      flexWrap: "wrap",
    },
    dataDiv: {
      display: "flex",
      width: "65%",
      flexWrap: "wrap",
    },
  }),
);

interface Props {
  customer: Schemas.CustomerData;
  maritalStatuses: { [name: string]: string };
  bloodTypes?: { [name: string]: string };
}

const PatientInfo = ({ customer, maritalStatuses, bloodTypes }: Props) => {
  const classes = useStyles();
  const emergencyPhone = useMemo(() => {
    const phone = contactPhone(customer);
    return phone ? `(${phone.prefix}) ${phone.number}` : "-";
  }, [customer]);

  const fullAddress = useMemo(() => {
    const address = mainAddress("HOME", customer);
    return address
      ? `(HOME) ${address.address} ${address.notes ? `/ ${address.notes}` : ""}`
      : "-";
  }, [customer]);

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.SEX}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {customer.gender || "-"}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.TYPE_BLOOD}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {bloodTypesMemo(customer, bloodTypes) || "-"}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.ID}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {customer.legalID || "-"}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.EMAIL}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {customer.email || "-"}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.CELL}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {mainPhonesOrDefault("MOBILE", customer)}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.PHONE}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {mainPhonesOrDefault("HOME", customer)}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.RECORD}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {customer.professionalRecordID || customer.legalID || "-"}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.CITY}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {getCityName(customer)}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.ADDRESS}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>{fullAddress}</Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.MEDICAL_INSURANCE}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          {customer.insurances && customer.insurances?.length !== 0 && (
            <Typography className={classes.data}>
              {`${customer.insurances[0].code}, ${customer.insurances[0].name}`}
            </Typography>
          )}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.EMERGENCY}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>{emergencyPhone}</Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.MARITAL_STATUS}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {maritalStatusesMemo(customer, maritalStatuses)}
          </Typography>
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.labelDiv}>
          <Typography className={classes.label}>
            {STRINGS.patientInfo.OCCUPATION}
          </Typography>
        </div>
        <div className={classes.dataDiv}>
          <Typography className={classes.data}>
            {customer.profession || "-"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
