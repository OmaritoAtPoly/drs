/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import Avatar from "../../../../Avatar";
import PrimaryButton from "../../../../buttons/PrimaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBlock: theme.spacing(6),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBlock: theme.spacing(2),
    },
    avatarStyle: {
      width: "600px",
      height: "200px",
    },
    titleStyle: {
      color: theme.palette.primary.main,
      paddingBlock: theme.spacing(2),
      fontSize: theme.spacing(2),
    },
    inputStyle: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      paddingBlock: theme.spacing(2),
    },
    dimensionStyle: {
      display: "flex",
      justifyContent: "space-between",
      width: "70%",
    },
    imageContainerStyle: {
      width: "600px",
      height: "200px",
      display: "flex",
      justifyContent: "center",
    },
    objImageFit: {
      objectFit: "fill",
    },
  }),
);
interface Props {
  ref?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>;
  image: string;
  onChangeImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSendDigitalLogo: () => void;
  mutationLoading?: boolean;
  logoUrl?: string;
}

const Logo = ({
  ref,
  image,
  onChangeImage,
  onClick,
  handleSendDigitalLogo,
  mutationLoading,
  logoUrl,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.dimensionStyle}>
        <Typography className={classes.titleStyle}>
          {STRINGS.generals.DR_LOGO}
        </Typography>
        <Typography className={classes.titleStyle}>
          {STRINGS.generals.RECOMMENDED_SIZE}
        </Typography>
      </span>
      <span className={classes.wrapper} id="comp-wrapper">
        <input
          ref={ref}
          accept="image/*"
          id="icon-button-file-logo"
          type="file"
          hidden
          onChange={onChangeImage}
        />
        <label htmlFor="icon-button-file-logo">
          <IconButton
            id="icon=wrapper"
            color="primary"
            aria-label="upload picture"
            component="span"
            className={classes.button}
            onClick={onClick}>
            <span id="logo-select-button" className={classes.inputStyle}>
              <CardMedia
                className={classes.imageContainerStyle}
                image={image}
                component="img"
                classes={{ media: classes.objImageFit }}
                alt={STRINGS.generals.LOGO}
              />
              <Typography>{STRINGS.generals.CHOOSE_FILE}</Typography>
            </span>
          </IconButton>
        </label>
        <PrimaryButton
          label={STRINGS.generals.UPDATE}
          onClick={handleSendDigitalLogo}
          variant="contained"
          color="primary"
        />
        <Avatar
          src={logoUrl}
          loading={mutationLoading}
          alt={STRINGS.generals.LOGO}
          className={classes.avatarStyle}
          imgProps={{
            style: {
              objectFit: "fill",
            },
          }}
          variant="square"
        />
      </span>
    </div>
  );
};

export default Logo;
