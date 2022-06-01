import {
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../../../styles/theme";
import Icon from "../../../Icon/Icon";

const styles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
    },
    listContainer: {
      width: "100%",
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    itemContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    itemLabelContainer: {
      display: "flex",
      alignItems: "center",
    },
    itemLabel: {
      fontSize: "12px",
      fontWeight: "bold",
    },
    bullet: {
      width: "10px",
      height: "10px",
      backgroundColor: "black",
      borderRadius: "100%",
      marginRight: theme.spacing(1),
    },
    noAllergiesLabel: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: theme.palette.primary.main,
      marginRight: "30px",
    },
    iconButton: {
      height: "30px",
      width: "30px",
    },
  }),
);

interface Props {
  pillAllergies: string[];
  handleDeleteAllergy?: (pill: string, index: number) => void;
}
const AllergiesPillsPanel = ({
  pillAllergies,
  handleDeleteAllergy = () => {},
}: Props) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      {pillAllergies.length > 0 && (
        <div className={classes.listContainer}>
          {pillAllergies.map((pill, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={classes.itemContainer}>
              <div className={classes.itemLabelContainer}>
                <div className={classes.bullet} />
                <Typography className={classes.itemLabel}>{pill}</Typography>
              </div>
              <IconButton
                aria-label="delete"
                size="small"
                className={classes.iconButton}
                onClick={() => {
                  handleDeleteAllergy(pill, index);
                }}>
                <Icon name="delete" width={15} height={17} />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllergiesPillsPanel;
