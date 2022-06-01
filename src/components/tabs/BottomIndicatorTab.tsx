import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import React from "react";
import { HashLink } from "react-router-hash-link";

interface StyledTabProps {
  label: string;
  to: string;
  scrollWidthOffset?: number;
}

const scrollWidthOffsetFn = (el: HTMLElement, scrollWidthOffset?: number) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = scrollWidthOffset || 0;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      marginRight: theme.spacing(4),
    },
  }),
);

const BottomIndicatorTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      textDecoration: "none",
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover": {
        color: theme.palette.primary.main,
        opacity: 1,
      },
      "&$selected": {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: theme.palette.primary.main,
      },
    },
    selected: {
      textDecoration: "none",
    },
  }),
)(({ to, scrollWidthOffset, ...rest }: StyledTabProps) => {
  const classes = useStyles();
  return (
    <HashLink
      className={classes.link}
      to={to}
      scroll={(el: HTMLElement) => scrollWidthOffsetFn(el, scrollWidthOffset)}>
      <Tab disableRipple {...rest} />
    </HashLink>
  );
});

export default BottomIndicatorTab;
