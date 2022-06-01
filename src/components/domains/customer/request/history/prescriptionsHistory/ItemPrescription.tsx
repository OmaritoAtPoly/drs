/* eslint-disable no-nested-ternary */
import React from "react";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { writtenNumberToLetter } from "../../../../../../utils/utils";
import STRINGS from "../../../../../../utils/strings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      border: 0,
      alignItems: "center",
    },
    divList: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start",
      marginTop: theme.spacing(1),
      alignItems: "center",
    },
    prescriptionList: {
      display: "flex",
      flexDirection: "column",
    },
  }),
);

interface Props {
  index: number;
  prescription: Schemas.PrescriptionItemRequest;
}

const ItemPrescription = ({ index, prescription }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.cont}>
      <div className={classes.divList}>
        <div className={classes.prescriptionList}>
          {prescription?.genericMedicine ? (
            <Typography>
              {`${index}-${
                (prescription.genericMedicine &&
                  `${prescription.genericMedicine}, `) ||
                ""
              }
              ${
                (prescription.medicine && `(${prescription.medicine}), `) || ""
              } 
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
                (prescription.presentation &&
                  `${prescription.presentation}, `) ||
                ""
              }
              ${
                (prescription.quantity &&
                  `# ${prescription.quantity} (${writtenNumberToLetter(
                    prescription.quantity,
                  )})`) ||
                ""
              }
              `}
            </Typography>
          ) : (
            <Typography>
              {`${index}-${prescription.medicine}, ${
                prescription.presentation
              }, ${prescription.concentration}, ${writtenNumberToLetter(
                prescription.quantity,
              )}, ${prescription.via}`}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPrescription;
