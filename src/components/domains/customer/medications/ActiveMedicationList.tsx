import { List, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ActiveMedicationItemContainer from "../../../../containers/customer/medications/ActiveMedicationItemContainer";
import STRINGS from "../../../../utils/strings";

const styles = makeStyles((theme) => ({
  listContainer: {
    height: "320px",
    overflow: "auto",
  },
  listContent: {
    marginBottom: theme.spacing(2),
  },
  emptyMedication: {
    height: "350px",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  typography: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

interface Props {
  medicationList: Schemas.CustomerMedicationData[];
}

export default function ActiveMedicationList({ medicationList }: Props) {
  const classes = styles();

  return medicationList.length <= 0 ? (
    <div className={classes.emptyMedication}>
      <Typography className={classes.typography}>
        {STRINGS.background.DONT_SHOW_MEDICATION}
      </Typography>
    </div>
  ) : (
    <div className={classes.listContainer}>
      <List className={classes.listContent}>
        {medicationList.map((medication, index: number) => (
          <ActiveMedicationItemContainer
            index={index}
            fieldName="medicationList"
            editMode={false}
            medication={medication}
          />
        ))}
      </List>
    </div>
  );
}
