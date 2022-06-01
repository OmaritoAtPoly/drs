import { Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useState } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import { ValueAndLabelType } from "../../../../../../utils/types";
import PhoneCreatorForm from "./PhoneCreatorForm";
import PhoneList from "./PhoneList";

interface Props {
  phones: Schemas.PhoneRequest[];
  setFieldValue: (field: string, value: Schemas.PhoneRequest[]) => void;
  onAddPhone: (value: Schemas.PhoneRequest) => void;
  purePhoneTypes?: ValueAndLabelType[];
  contactPerson: ValueAndLabelType[];
  errors: FormikErrors<{
    phones: { prefix: string; number: string; phoneType: string }[];
  }>;
}

const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  addPhoneWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  buttonStyle: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
    marginTop: 2,
    height: 40,
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
  },
});

const PhoneCreatorList = ({
  onAddPhone,
  phones,
  setFieldValue,
  purePhoneTypes,
  contactPerson,
  errors,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const classes = styles();

  const handleAddPhone = useCallback(
    (value: Schemas.PhoneRequest) => {
      onAddPhone(value);
      setVisible(!visible);
    },
    [onAddPhone, setVisible, visible],
  );

  const onPressDelete = useCallback(
    (value: string) => {
      const valueRemaining = phones.filter((a) => a.number !== value);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      valueRemaining[0] === undefined
        ? setFieldValue("phones", [
            {
              prefix: "",
              number: "",
              phoneType: "",
            },
          ])
        : setFieldValue("phones", valueRemaining);
    },
    [phones, setFieldValue],
  );

  return (
    <div className={classes.root}>
      <Dialog
        hideBackdrop // Disable the backdrop color/image
        disableEnforceFocus // Let the user focus on elements outside the dialog
        disableBackdropClick // Remove the backdrop click (just to be sure)
        open={visible}
        onClose={() => setVisible(!visible)}>
        <PhoneCreatorForm
          contactPerson={contactPerson}
          purePhoneTypes={purePhoneTypes}
          handleSubmitValues={handleAddPhone}
        />
      </Dialog>
      <div className={classes.addPhoneWrapper}>
        <PhoneList phones={phones} onDelete={onPressDelete} />
        <Button
          className={classes.buttonStyle}
          onClick={() => setVisible(true)}
          variant="outlined">
          {STRINGS.signUp.ADD_PHONE}
        </Button>
        {errors.phones?.length && (
          <Typography className={classes.errorStyle}>
            {STRINGS.error.CHOOSE_PHONE}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default PhoneCreatorList;
