import { Card, CardProps, makeStyles, WithWidthProps } from "@material-ui/core";
import React from "react";
import theme from "../../styles/theme";

const useStyles = makeStyles({
  // TODO: Add this color to the theme
  root: {
    borderColor: "#D6E3F3",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    display: "flex",
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});
interface Props {
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}
const CardLayout = ({
  children,
  onClick,
  className,
  selected,
}: CardProps & WithWidthProps & Props) => {
  const classes = useStyles();

  return (
    <Card
      className={`${classes.root} ${className} ${
        selected ? classes.selected : ""
      }`}
      onClick={onClick}>
      {children}
    </Card>
  );
};

export default CardLayout;
