/* eslint-disable no-nested-ternary */
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import shortid from "shortid";
import ItemNewVaccination, { VaccineValue } from "./ItemNewVaccination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    space: {
      marginTop: theme.spacing(2),
    },
    title: {
      fontSize: "15px",
      lineHeight: "20px",
      color: " #323232",
      width: "100%",
    },
    checkBox: {
      marginTop: -theme.spacing(1.5),
    },
    icon: {
      width: 10,
      height: 10,
      marginTop: -theme.spacing(2.8),
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  vaccines: VaccineValue[];
  onDelete: (vaccine: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
}

const VaccinationList = ({ vaccines, onDelete, setFieldValue }: Props) => {
  const classes = useStyles();

  return (
    <>
      {vaccines.length === 0 ? (
        <Typography className={classes.title} />
      ) : (
        vaccines.map((vaccine: VaccineValue) => (
          <ItemNewVaccination
            key={shortid()}
            vaccine={vaccine}
            onChange={() => setFieldValue("checked", !vaccine.checked)}
            onDelete={onDelete}
          />
        ))
      )}
    </>
  );
};

export default VaccinationList;
