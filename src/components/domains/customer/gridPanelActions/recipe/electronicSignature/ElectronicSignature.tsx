import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../../utils/strings";
import BadgedButton from "../../../../../buttons/BadgedButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleStyle: {
      color: theme.palette.primary.main,
      paddingBlock: theme.spacing(2),
      fontSize: theme.spacing(2),
    },
    expireAt: {
      paddingLeft: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    changeSignatureStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }),
);
interface Props {
  currentProfessional?: Schemas.ProfessionalData;
  handleShowAddForm: () => void;
}

const ElectronicSignature = ({ currentProfessional, handleShowAddForm }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.titleStyle}>{STRINGS.generals.E_SIGNATURE}</Typography>
      <span className={classes.expireAt} id="expire-at">
        {
          currentProfessional?.electronicSignExpires ?
            <Typography>
              {`${STRINGS.generals.SIGNATURE_EXPIRE}
                ${currentProfessional.electronicSignExpires.dateDay}/${currentProfessional.electronicSignExpires.dateMonth}/${currentProfessional.electronicSignExpires.dateYear} `}
            </Typography>
            : <Typography>{STRINGS.generals.ADD_E_SIGNATURE}</Typography>
        }
        <span id="change-sign-button" className={classes.changeSignatureStyle}>
          <Typography>{STRINGS.generals.CHANGE_E_SIGNATURE}</Typography>
          <BadgedButton iconName="add" onClick={handleShowAddForm} />
        </span>
      </span>
    </div>
  );
};

export default ElectronicSignature;
