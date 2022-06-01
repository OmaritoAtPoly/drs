/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import HospitalCenterItem from "./HospitalCenterItem";

interface Props {
  hospitals: Schemas.ProfessionalHospitalRequest[];
  onDelete: (hospitals: string) => void;
}

const styles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
      alignSelf: "center",
    },
  },
  noRoom: {
    display: "flex",
    justifyContent: "center",
  },
});

const HospitalCenterList = ({ hospitals, onDelete }: Props) => {
  const classes = styles();

  const noEmptyHospitals = useMemo(
    () => hospitals.filter((a) => a.name !== ""),
    [hospitals],
  );

  return (
    <div className={classes.root}>
      {noEmptyHospitals.map((hospital: any) => {
        const key = Math.random();
        return (
          <HospitalCenterItem
            key={key}
            hospital={`${hospital.name || hospital.address}${
              hospital.notes ? ` / ${hospital.notes}` : ""
            }`}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default HospitalCenterList;
