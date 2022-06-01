import { makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import SpecialtiesItem from "./SpecialtiesItem";

interface Props {
  specialties: Schemas.SpecialtyResponse[];
  onDelete: (specialty: string) => void;
}

const styles = makeStyles({
  root: {
    paddingTop: "15px",
  },
  titleStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
});

const SpecialtiesList = ({ specialties, onDelete }: Props) => {
  const classes = styles();
  const noEmptySpecialties = useMemo(
    () => specialties.filter((a) => a !== ""),
    [specialties],
  );

  return (
    <div className={classes.root}>
      <Typography className={classes.titleStyle}>
        {STRINGS.signUp.SPECIALTIES}
      </Typography>
      {noEmptySpecialties.map((specialty) => {
        const key = Math.random();
        return (
          <SpecialtiesItem
            specialty={specialty.name || ""}
            key={key}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default SpecialtiesList;
