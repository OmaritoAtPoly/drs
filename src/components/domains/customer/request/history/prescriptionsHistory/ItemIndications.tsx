/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useMemo } from "react";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { writtenNumberToLetter } from "../../../../../../utils/utils";
import STRINGS from "../../../../../../utils/strings";
import { getMonthWeekDaysOfNumber } from "../../../../../../utils/date";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      border: 0,
      alignItems: "center",
    },
    title: {
      fontSize: "15px",
      lineHeight: "20px",
      color: " #323232",
      fontWeight: "bold",
    },
    divList: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start",
      marginTop: theme.spacing(1),
      alignItems: "center",
    },
    indicationList: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    prescription: {
      fontSize: "15px",
      lineHeight: "20px",
    },
  }),
);

interface Props {
  index: number;
  prescription: Schemas.PrescriptionItemRequest;
}

const ItemIndications = ({ index, prescription }: Props) => {
  const classes = useStyles();
  const { currentDays, months, weeks } = getMonthWeekDaysOfNumber(
    prescription.duration || 0,
  );

  const monthString = useMemo(() => {
    if (months <= 0) return "";
    return months === 1 ? STRINGS.recipe.MONTH : STRINGS.recipe.MONTHS;
  }, [months]);

  const weeksString = useMemo(() => {
    if (weeks <= 0) return "";
    return weeks === 1 ? STRINGS.recipe.WEEK : STRINGS.recipe.WEEKS;
  }, [weeks]);

  const dayString = useMemo(() => {
    if (currentDays <= 0) return "";
    return currentDays === 1 ? STRINGS.recipe.DAY : STRINGS.recipe.DAYS;
  }, [currentDays]);

  const temporality = useMemo(() => {
    if (months > 0) return `${months} ${monthString}`;
    if (weeks > 0) return `${weeks} ${weeksString}`;
    return `${currentDays} ${dayString}`;
  }, [dayString, currentDays, monthString, months, weeks, weeksString]);

  const frequency = useMemo(() => {
    const daysFrequency = prescription.hoursFrequency
      ? prescription.hoursFrequency / 24
      : 0;
    if (daysFrequency < 1) {
      return prescription?.hoursFrequency && prescription.hoursFrequency > 1
        ? `${prescription.hoursFrequency} ${STRINGS.recipe.HOURS}`
        : `${prescription.hoursFrequency} ${STRINGS.recipe.HOUR}`;
    }
    if (daysFrequency === 1) {
      return `${daysFrequency} ${STRINGS.recipe.DAY}`;
    }
    return `${daysFrequency} ${STRINGS.recipe.DAYS}`;
  }, [prescription.hoursFrequency]);

  return (
    <div className={classes.cont}>
      <div className={classes.divList}>
        <div className={classes.indicationList}>
          {prescription.notes && (
            <Typography className={classes.prescription}>
              {`
                ${index}-${
                (prescription.genericMedicine &&
                  `${prescription.genericMedicine}, `) ||
                ""
              }
                ${
                  (prescription.concentration &&
                    `${prescription.concentration}, `) ||
                  ""
                }
                ${
                  (prescription.presentation &&
                    `${prescription.presentation}, `) ||
                  ""
                }
                ${(prescription.notes && `${prescription.notes}, `) || ""}
                ${(prescription.via && `${prescription.via}, `) || ""}
              `}
            </Typography>
          )}
          {!prescription.notes && (
            <Typography className={classes.prescription}>
              {`
                ${index}-${prescription.genericMedicine},
                ${
                  (prescription?.concentration &&
                    `${prescription?.concentration}, `) ||
                  ""
                }
                ${
                  (prescription.via &&
                    `${STRINGS.recipe.WAY} ${prescription.via}, `) ||
                  ""
                }
                ${
                  (prescription.doseMg &&
                    `${prescription.doseMg} (${writtenNumberToLetter(
                      prescription.doseMg,
                    )})`) ||
                  ""
                }
                ${
                  (prescription.presentation &&
                    `${prescription.presentation}, `) ||
                  ""
                }
                ${(prescription.hoursFrequency && `cada ${frequency}`) || ""}
                ${(prescription.presentation && ` por ${temporality}`) || ""}
              `}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemIndications;
