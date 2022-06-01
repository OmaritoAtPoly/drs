import {
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import useProfileCacheSelector from "../../../../modules/profile/cacheSelector";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import LoadingWrapper from "../../../LoadingWrapper";

const styles = makeStyles({
  root: {
    marginBlock: theme.spacing(3),
  },
  inline: {
    display: "inline",
    fontSize: theme.spacing(2),
  },
  titleStyle: {
    color: theme.palette.primary.main,
    paddingBlock: theme.spacing(2),
    fontSize: theme.spacing(2),
  },
  urlStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonLinkStyle: {
    display: "flex",
    alignItems: "center",
  },
  noUrlStyle: {
    color: theme.palette.primary.main,
  },
});

interface Props {
  handleUrl: (url: string) => void;
  loading: boolean;
  preventDefault: (e: React.SyntheticEvent) => void;
}

const signupSchema = Yup.object().shape({
  url: Yup.string().required(STRINGS.recovery.NEEDED_MAIL),
});

export default function HealthCenterUrl({
  handleUrl,
  loading,
  preventDefault,
}: Props) {
  const { currentProfessional } = useProfileCacheSelector();

  const classes = styles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      handleUrl(values.url);
    },
  });

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Typography className={classes.titleStyle}>
          {STRINGS.generals.DR_WEB_URL}
        </Typography>
        <div className={classes.urlStyle} id="url-wrapper">
          <TextField
            type="text"
            id="url"
            error={!!(errors.url && touched.url)}
            name="url"
            label={errors.url && touched.url ? STRINGS.error.ERROR : STRINGS.generals.DR_SHORT_URL}
            helperText={errors.url && touched.url ? errors.url : ""}
            placeholder={STRINGS.generals.DR_SHORT_URL}
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
          />
          <LoadingWrapper loading={loading}>
            <PrimaryButton
              color="primary"
              type="submit"
              label={STRINGS.generals.UPDATE}
              variant="contained"
            />
          </LoadingWrapper>
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary">
            {!currentProfessional?.url ? (
              <Typography className={classes.noUrlStyle}>
                {STRINGS.generals.ADD_URL}
              </Typography>
            ) : (
              <Link
                href={currentProfessional?.url || ""}
                onClick={preventDefault}
                target="_blank">
                {currentProfessional?.url}
              </Link>
              )}
          </Typography>
        </div>
      </form>
    </div>
  );
}
