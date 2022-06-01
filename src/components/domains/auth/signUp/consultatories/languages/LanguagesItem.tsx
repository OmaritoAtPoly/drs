import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import BadgedButton from "../../../../../buttons/BadgedButton";

interface Props {
  language: string;
  onDelete: (language: string) => void;
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
});

const LanguagesItem = ({ language, onDelete }: Props) => {
  const classes = styles();

  const handleOnDelete = useCallback(() => {
    if (language) onDelete(language);
  }, [language, onDelete]);

  return (
    <div className={classes.container}>
      <Typography>{`${language}`}</Typography>
      <BadgedButton
        containerStyle={classes.badgedButtonStyle}
        iconWidth={15}
        iconName="trash"
        fill={theme.palette.error.main}
        onClick={handleOnDelete}
      />
    </div>
  );
};

export default LanguagesItem;
