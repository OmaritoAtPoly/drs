import {
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useMemo } from "react";
import { age, fullName } from "../../../../../utils/user";
import Avatar from "../../../../Avatar";
import Icon from "../../../../Icon/Icon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      width: "50%",
    },
    avatar: {
      borderRadius: "50%",
      background: "linear-gradient(#25CEDE, #7ED957)",
    },
    avatarContainer: {
      marginRight: theme.spacing(1),
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
    subtitle: {
      color: "#828282",
      fontSize: "16px",
      marginRight: theme.spacing(1),
    },
    info: {
      display: "flex",
    },
    large: {
      width: "100px",
      height: "100px",
    },
    rowInfo: {
      display: "flex",
    },
    iconButton: {
      width: "35px",
      height: "35px",
    },
  }),
);

interface Props {
  customer: Schemas.CustomerData;
  loading?: boolean;
  handleShowInfo: () => void;
  open: boolean;
}

const PatientAvatarRowPanel = ({
  customer,
  loading,
  handleShowInfo,
  open,
}: Props) => {
  const classes = useStyles();

  const name = useMemo(() => fullName(customer), [customer]);

  const customerAge = useMemo(() => {
    const theAge = age(customer);
    return `${theAge.years} años, ${theAge.months} meses `;
  }, [customer]);

  return (
    <div className={classes.container}>
      <Hidden smDown>
        <div className={classes.avatarContainer}>
          {loading ? (
            <Skeleton variant="circle" width={100} height={100} />
          ) : (
            <div className={classes.avatar}>
              <Avatar
                className={classes.large}
                src={customer.avatarUrl}
                loading={loading}
              />
            </div>
          )}
        </div>
      </Hidden>
      <div className={classes.info}>
        <div>
          <div className={classes.rowInfo}>
            <Typography className={classes.title}>{name}</Typography>
            <Hidden smDown>
              <IconButton
                className={classes.iconButton}
                onClick={handleShowInfo}>
                <Icon name="downArrow" />
              </IconButton>
            </Hidden>
          </div>
          <Hidden smDown>
            <div className={classes.rowInfo}>
              <Typography className={classes.subtitle}>
                {customerAge}
              </Typography>
              {open && (
                <Typography className={classes.subtitle}>
                  {customer.health?.bloodType || ""}
                </Typography>
              )}
            </div>
            {open && (
              <div className={classes.rowInfo}>
                <Typography className={classes.subtitle}>
                  {customer.legalID || ""}
                </Typography>
                <Typography className={classes.subtitle}>
                  {customer.email || ""}
                </Typography>
              </div>
            )}
          </Hidden>
        </div>
      </div>
    </div>
  );
};

export default PatientAvatarRowPanel;
