/* eslint-disable no-nested-ternary */
import React, { useCallback } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Icon from "../../../Icon/Icon";
import CheckBox from "../../../CheckBox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    space: {
      marginTop: theme.spacing(2),
    },
    title: {
      fontSize: "15px",
      lineHeight: "20px",
      color: " #323232",
      width: "100%",
    },
    checkBox: {
      marginTop: -theme.spacing(1.5),
    },
    icon: {
      width: 10,
      height: 10,
      marginTop: -theme.spacing(2.8),
      marginRight: theme.spacing(2),
    },
  }),
);

export type VaccineValue = {
  vaccine: string;
  checked: boolean;
};

interface Props {
  onDelete: (vaccine: string) => void;
  vaccine: VaccineValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // setFieldValue: (field: string, value: any) => void;
  // field: string;
  onChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

const ItemNewVaccination = ({ onDelete, vaccine, onChange }: Props) => {
  const classes = useStyles();

  const handleOnDelete = useCallback(() => {
    onDelete(vaccine.vaccine);
  }, [onDelete, vaccine.vaccine]);

  return (
    <div className={classes.cont}>
      <div>
        <IconButton onClick={handleOnDelete}>
          <Icon className={classes.icon} name="delete" width={15} height={15} />
        </IconButton>
      </div>
      <Typography className={classes.title}>{vaccine.vaccine}</Typography>
      <div className={classes.checkBox}>
        <CheckBox
          checked={vaccine.checked}
          onChange={onChange}
          name="checked"
        />
      </div>
    </div>
  );
};

export default ItemNewVaccination;
