import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import moment from "moment";
import STRINGS from "../../../../utils/strings";
import { elapsedTimeFormat } from "../../../../utils/date";

const styles = makeStyles((theme: Theme) => ({
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  itemIndex: {
    color: "#323232",
  },
  headText: {
    color: "#828282",
    fontSize: "15px",
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
  },
  text: {
    color: "#828282",
    fontSize: "15px",
    marginLeft: theme.spacing(0.5),
  },
}));

interface Props {
  medication: Schemas.CustomerMedicationData;
  index: number;
}

export default function MedicationItem({ index, medication }: Props) {
  const classes = styles();

  const dateDiffInYears = useMemo(() => {
    const diffInMonths = moment().diff(
      moment(
        `${medication.fromDate?.dateDay}/${medication.fromDate?.dateMonth}/${medication.fromDate?.dateYear}`,
        "DD/MM/YYYY",
      ),
      "month",
    );
    return {
      years: Math.trunc(diffInMonths / 12),
      months: diffInMonths % 12,
    };
  }, [
    medication.fromDate?.dateDay,
    medication.fromDate?.dateMonth,
    medication.fromDate?.dateYear,
  ]);

  return (
    <div className={classes.itemContainer}>
      <span>
        <span className={classes.itemIndex}>{`${index + 1}`}</span>
        <span>{` ${medication.medicine}`}</span>
      </span>
      <span>
        <span className={classes.headText}>Dg:</span>
        <span className={classes.text}>{` ${medication.diagnoses}`}</span>
      </span>
      <span>
        <span className={classes.headText}>
          {`${STRINGS.generals.INITIAL_DATE}:`}
        </span>
        <span className={classes.text}>
          <Typography>
            {moment().format(
              elapsedTimeFormat(dateDiffInYears.years, dateDiffInYears.months),
            )}
          </Typography>
        </span>
      </span>
      <span>
        <span className={classes.headText}>EA:</span>
        <span className={classes.text}>{` ${medication.currentIllness}`}</span>
      </span>
    </div>
  );
}
