/* eslint-disable jsx-a11y/label-has-associated-control */
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import Avatar from "../../../Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
);
interface Props {
  ref?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>;
  image?: string;
  onChangeImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
}

const AvatarProfile = ({
  ref,
  image,
  onChangeImage,
  onClick,
  loading,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.avatar}>
      <input
        ref={ref}
        accept="image/*"
        id="icon-button-file"
        type="file"
        hidden
        onChange={onChangeImage}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          className={classes.button}
          onClick={onClick}>
          <Avatar
            src={image}
            className={classes.avatar}
            editMode={!image}
            loading={loading}
          />
        </IconButton>
      </label>
    </div>
  );
};
export default AvatarProfile;
