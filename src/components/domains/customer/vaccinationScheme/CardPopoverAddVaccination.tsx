/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React from "react";
import { FormikErrors } from "formik";
import { Button, IconButton, TextareaAutosize } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IconNames } from "../../../Icon/IconNames";
import Icon from "../../../Icon/Icon";
import CheckBox from "../../../CheckBox";
import CardLayout from "../../../cards/CardLayout";
import STRINGS from "../../../../utils/strings";
// import ItemNewVaccination from "./ItemNewVaccination";
import VaccineCreatorList from "./VaccineCreatorList";
import { VaccineValue } from "./ItemNewVaccination";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
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
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: 20,
      height: 20,
    },
    icon: {
      marginBottom: theme.spacing(1),
    },
    textArea: {
      height: theme.spacing(5),
      overflow: "hidden",
      border: "1px solid gray",
      borderRadius: theme.spacing(1),
      padding: theme.spacing(1),
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    cancel: {
      fontSize: "15px",
      lineHeight: "20px",
      textTransform: "unset",
    },
    save: {
      textDecorationLine: "underline",
      fontSize: "15px",
      lineHeight: "20px",
      textTransform: "unset",
    },
    newVaccine: {
      marginTop: theme.spacing(1),
    },
  }),
);

interface Props {
  icon: IconNames;
  iconWidth?: number;
  iconHeight?: number;
  fill?: string;
  checked: boolean;
  // setFieldValue: (field: string, value: any) => void;
  handleNewVaccine: () => void;
  // onSubmit: (
  //   values: {
  //     vaccines: VaccineValue[];
  //     newVaccines: VaccineValue | undefined;
  //   },
  //   formikHelpers: FormikHelpers<{
  //     vaccines: VaccineValue[];
  //     newVaccines: VaccineValue | undefined;
  //   }>,
  // ) => void | Promise<any>;
  onClickCancel: () => void;
  // onClickAdd: () => void;
  // fieldName: string;
  // setFieldValue: (fieldName: string, value: string) => void;
  vaccines: VaccineValue[];
  newVaccines?: VaccineValue;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          vaccines: VaccineValue[];
          newVaccines: VaccineValue | undefined;
        }>
      >;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

const CardPopoverAddVaccination = ({
  icon,
  iconWidth = 15,
  iconHeight = 15,
  fill,
  handleNewVaccine,
  onClickCancel,
  vaccines,
  newVaccines,
  setFieldValue,
  handleChange,
  handleSubmit,
}: // onSubmit,
Props) => {
  const classes = useStyles();

  return (
    <CardLayout>
      <form onSubmit={handleSubmit}>
        <div className={classes.row}>
          <div className={classes.icon}>
            <IconButton onClick={handleNewVaccine}>
              <Icon
                name={icon}
                width={iconWidth}
                height={iconHeight}
                fill={fill}
              />
            </IconButton>
          </div>
          <TextareaAutosize
            name="newVaccines.vaccine"
            value={newVaccines?.vaccine || ""}
            className={classes.textArea}
            rowsMax={10}
            placeholder="Escribe aquí"
            onChange={handleChange}
          />
          <CheckBox
            checked={newVaccines?.checked || false}
            onChange={handleChange}
            // handleChange={() => {}}
            className={classes.checkBox}
            name="newVaccines.checked"
          />
        </div>
        <div className={classes.newVaccine}>
          <VaccineCreatorList
            fieldName="vaccines"
            setFieldValue={setFieldValue}
            vaccines={vaccines}
          />
        </div>
        <div className={classes.button}>
          <Button
            color="primary"
            className={classes.cancel}
            onClick={onClickCancel}>
            {STRINGS.allergies.CANCEL}
          </Button>
          <Button type="submit" color="primary" className={classes.save}>
            {STRINGS.allergies.SAVE}
          </Button>
        </div>
      </form>
    </CardLayout>
  );
};

export default CardPopoverAddVaccination;
