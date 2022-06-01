import { CircularProgress, makeStyles } from "@material-ui/core";
import AvatarMaterial, { AvatarProps } from "@material-ui/core/Avatar";
import React, { useMemo } from "react";
import avatar from "../assert/avatar.jpeg";
import { API_BASIC_URL } from "../utils/constants";
import STRINGS from "../utils/strings";
import Icon from "./Icon/Icon";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  circularProcess: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },
  center: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
});

const Avatar = ({
  loading,
  variant,
  alt,
  src,
  editMode,
  ...rest
}: Partial<Omit<AvatarProps, "src">> & {
  loading?: boolean;
  src?: string;
  editMode?: boolean;
}) => {
  const classes = useStyles();
  const srcMemo = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      // eslint-disable-next-line no-nested-ternary
      src
        ? src.slice(0, 4) === "http" || src.slice(0, 5) === "blob:"
          ? src
          : `${API_BASIC_URL}${src}`
        : avatar,
    [src],
  );

  return (
    <div className={classes.root}>
      {!loading && (
        <AvatarMaterial
          variant={variant || "circular"}
          alt={alt || STRINGS.generals.IMAGE}
          src={srcMemo}
          {...rest}
        />
      )}
      {!loading && editMode && <Icon name="camera" className={classes.center} />}
      {loading && <CircularProgress size={24} className={classes.center} />}
    </div>
  );
};

export default Avatar;
