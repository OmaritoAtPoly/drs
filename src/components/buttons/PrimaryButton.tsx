import {
  Button,
  ButtonProps,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useMemo } from "react";
import theme from "../../styles/theme";
import Icon from "../Icon/Icon";
import { IconNames } from "../Icon/IconNames";
import LoadingWrapper from "../LoadingWrapper";

const styles = makeStyles(() => ({
  container: {
    borderRadius: theme.spacing(1),
  },
  icon: { display: "flex" },
  label: {
    fontWeight: "bold",
    fontSize: "12px",
  },
}));

interface Props {
  containerStyle?: string;
  labelClassName?: string;
  iconName?: IconNames;
  iconColor?: string;
  label: string;
  loading?: boolean;
  link?: string;
  linkInNewTab?: boolean;
}

export type PrimaryButtonProps = Props & ButtonProps;

export default function PrimaryButton({
  iconName,
  iconColor = theme.palette.primary.main,
  label,
  loading,
  containerStyle = "",
  labelClassName = "",
  link,
  linkInNewTab = false,
  ...props
}: PrimaryButtonProps) {
  const classes = styles();

  const content = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      link ? (
        <Link
          style={{ textDecoration: "none" }}
          className={`${classes.label} ${labelClassName}`}
          target={linkInNewTab ? "_blank" : ""}
          href={link}>
          {label}
        </Link>
      ) : (
        label
      ),
    [classes.label, label, labelClassName, link, linkInNewTab],
  );

  return (
    <LoadingWrapper loading={loading} classNameContainer={containerStyle}>
      <Button
        className={classes.container}
        color="primary"
        startIcon={
          iconName && (
            <Icon className={classes.icon} name={iconName} fill={iconColor} />
          )
        }
        {...props}>
        <Typography className={`${classes.label} ${labelClassName}`}>
          {content}
        </Typography>
      </Button>
    </LoadingWrapper>
  );
}
