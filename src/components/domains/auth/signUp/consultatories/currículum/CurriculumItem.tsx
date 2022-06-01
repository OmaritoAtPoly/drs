import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import BadgedButton from "../../../../../buttons/BadgedButton";

interface Props {
  curriculum: string;
  onDelete: (curriculum: string) => void;
}
const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  badgedButtonStyle: {
    height: "30px",
    display: "flex",
    justifyContent: "center",
  },
  titleStyle: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "30px",
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: "bold",
  },
  itemsStyle: {
    maxWidth: "20em",
  },
});

const CurriculumItem = ({ curriculum, onDelete }: Props) => {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    onDelete(curriculum);
  }, [curriculum, onDelete]);

  return (
    <div className={classes.container}>
      <Typography className={classes.itemsStyle}>{`${curriculum}`}</Typography>
      <BadgedButton
        containerStyle={classes.badgedButtonStyle}
        iconWidth={12}
        iconHeight={12}
        iconName="trash"
        fill={theme.palette.error.main}
        onClick={handleOnDelete}
      />
    </div>
  );
};

export default CurriculumItem;
