import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useMemo } from "react";
import { age, fullName } from "../../../../../utils/user";
import Avatar from "../../../../Avatar";
import BadgedButton from "../../../../buttons/BadgedButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      borderRadius: "50%",
      background: "linear-gradient(#25CEDE, #7ED957)",
    },
    avatarContainer: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
    },
    subtitle: {
      color: "#828282",
      fontSize: "16px",
    },
    info: {
      display: "flex",
      alignItems: "center",
    },
    large: {
      width: "100px",
      height: "100px",
    },
  }),
);

interface Props {
  customer: Schemas.CustomerData;
  loading?: boolean;
  handleShowInfo: () => void;
  showInfo: boolean;
}

const PatientAvatarPanel = ({
  customer,
  loading,
  handleShowInfo,
  showInfo,
}: Props) => {
  const classes = useStyles();

  const name = useMemo(() => fullName(customer), [customer]);

  const customerAge = useMemo(() => {
    if (
      !customer.birthdateDay ||
      !customer.birthdateMonth ||
      !customer.birthdateYear
    ) {
      return "";
    }
    const theAge = age(customer);
    return `${theAge.years} años, ${theAge.months} meses `;
  }, [customer]);

  return (
    <div className={classes.container}>
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
      <div className={classes.info}>
        <div>
          <Typography className={classes.title}>{name}</Typography>
          {customerAge && (
            <Typography className={classes.subtitle}>{customerAge}</Typography>
          )}
        </div>
        <BadgedButton
          iconName={showInfo ? "backArrow" : "next"}
          onClick={handleShowInfo}
        />
      </div>
    </div>
  );
};

export default PatientAvatarPanel;
