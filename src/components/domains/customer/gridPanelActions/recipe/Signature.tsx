/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import Avatar from "../../../../Avatar";
import PrimaryButton from "../../../../buttons/PrimaryButton";
import LoadingWrapper from "../../../../LoadingWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    dimensionStyle: {
      display: "flex",
      justifyContent: "space-between",
      width: "70%",
      marginTop: theme.spacing(2),
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
    showAndSelectSignatureStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    switchButtonStyle: {
      display: "flex",
      alignItems: "center",
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
  image?: string;
  onChangeImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSendDigitalSignature: () => void;
  digitalSignUrl?: string;
  mutationLoading?: boolean;
  agreeToShowSignature?: boolean;
  enablingSignature?: boolean;
  handleEnableProfessionalSignature: () => void;
}

const Signature = ({
  ref,
  image,
  onChangeImage,
  onClick,
  handleSendDigitalSignature,
  digitalSignUrl,
  mutationLoading,
  agreeToShowSignature,
  enablingSignature = false,
  handleEnableProfessionalSignature,
}: Props) => {
  const classes = useStyles();

  return (
    <div>
      <span className={classes.dimensionStyle}>
        <Typography className={classes.titleStyle}>{STRINGS.generals.DR_SIGNATURE}</Typography>
        <Typography className={classes.titleStyle}>{STRINGS.generals.RECOMMENDED_SIZE}</Typography>
      </span>
      <span className={classes.wrapper} id="signature-logo">
        <span id="select-digital0sign-file" className={classes.showAndSelectSignatureStyle}>
          <input
            ref={ref}
            name="apiImage"
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
              <span id="select-button" className={classes.inputStyle}>
                <CardMedia
                  image={image}
                  className={classes.avatarStyle}
                  component="img"
                  classes={{ media: classes.objImageFit }}
                  alt={STRINGS.generals.LOGO} />
                <Typography>{STRINGS.generals.CHOOSE_FILE}</Typography>
              </span>
            </IconButton>
          </label>
        </span>
        <PrimaryButton label={STRINGS.generals.UPDATE} onClick={handleSendDigitalSignature} variant="contained" color="primary" />
        <Avatar
          src={digitalSignUrl}
          loading={mutationLoading}
          alt={STRINGS.generals.DIGITAL_SIGNATURE}
          className={classes.avatarStyle}
          variant="square"
          imgProps={{
            style: {
              objectFit: "fill",
            },
          }}
        />
      </span>
      <LoadingWrapper loading={enablingSignature}>
        <span className={classes.switchButtonStyle}>
          <Switch
            checked={agreeToShowSignature}
            onChange={handleEnableProfessionalSignature}
            color="primary"
          />
          <Typography>{STRINGS.generals.SHOW_SIGNATURE_ON_DOCS}</Typography>
        </span>
      </LoadingWrapper>
    </div>
  );
};

export default Signature;
