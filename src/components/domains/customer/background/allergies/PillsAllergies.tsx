import { List, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";

const useStyles = makeStyles({
  container: {
    paddingInline: "20px",
  },
  allergies: {
    fontWeight: "bold",
    color: "red",
  },
  withIcon: {
    justifyContent: "space-between",
    color: "black",
    display: "flex",
    alignItems: "center",
    padding: "2px",
  },
  bullet: {
    backgroundColor: "red",
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    marginRight: theme.spacing(2),
  },
  iconBullet: {
    backgroundColor: "black",
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    marginRight: theme.spacing(1),
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "2px",
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  medicineLabel: {
    fontSize: "15px",
    color: "red",
  },
  withIconMedicineLabel: {
    fontSize: "15px",
    color: "black",
  },
  noAllergiesLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginRight: "30px",
  },
});

interface Props {
  pillAllergies: Schemas.CustomerAllergyData[];
  withTrash?: boolean;
  handleDeleteAllergy?: (code: string | undefined) => void;
}
const PillsAllergies = ({
  pillAllergies,
  handleDeleteAllergy = () => { },
  withTrash = false,
}: Props) => {
  const classes = useStyles();
  return (
    <div>
      {pillAllergies.length !== 0 &&
      <div className={classes.container}>
        {withTrash ||
        <Typography className={classes.allergies}>
          {STRINGS.allergies.PILLS_OR_PRODUCTS}
        </Typography>}
        {pillAllergies && pillAllergies.map((a) => {
            const key = Math.random();
            return (
              <div>
                {(a !== "" && a.medicine) &&
                  <List key={key} className={withTrash ? classes.withIcon : classes.listContainer}>
                    <div className={classes.itemContainer}>
                      <div className={withTrash ? classes.iconBullet : classes.bullet} />
                      <Typography
                        className={withTrash
                          ? classes.withIconMedicineLabel
                          : classes.medicineLabel}>
                        {a.medicine}
                      </Typography>
                    </div>
                    {withTrash && <BadgedButton
                      iconWidth={15}
                      onClick={() => handleDeleteAllergy(a.code)}
                      iconName="trash"
                      fill={theme.palette.error.dark}
                    />}
                  </List>}
              </div>
            );
          })}
      </div>}
    </div>
  );
};

export default PillsAllergies;
