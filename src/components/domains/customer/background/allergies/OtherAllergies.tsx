import { makeStyles, Typography, List } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import theme from "../../../../../styles/theme";

const useStyles = makeStyles({
  allergies: {
    fontWeight: "bold",
    color: "red",
  },
  container: {
    paddingLeft: "30px",
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
  bullet: {
    backgroundColor: "red",
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    marginRight: theme.spacing(2),
  },
  otherAllergiesLabel: {
    fontSize: "15px",
    color: "red",
  },
  noAllergiesLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginRight: "30px",
  },
});

interface Props {
  otherAllergies: string[];
}

const OtherAllergies = ({ otherAllergies }: Props) => {
  const classes = useStyles();

  return (
    <div>
      {otherAllergies && otherAllergies.length ? (
        <div className={classes.container}>
          <Typography className={classes.allergies}>
            {STRINGS.allergies.OTHER_ALLERGIES}
          </Typography>

          {otherAllergies.map((a) => {
            const key = Math.random();
            return (
              <List key={key} className={classes.listContainer}>
                <div className={classes.itemContainer}>
                  <div className={classes.bullet} />
                  <Typography className={classes.otherAllergiesLabel}>
                    {a}
                  </Typography>
                </div>
              </List>
            );
          })}
        </div>
      ) : (
        <Typography className={classes.noAllergiesLabel}>
          {" "}
        </Typography>
      )}
    </div>
  );
};

export default OtherAllergies;
