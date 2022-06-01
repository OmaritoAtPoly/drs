import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import { MapData } from "../../../../../../utils/types";
import AutocompleteMapDialog from "../../../../../maps/AutocompleteMapDialog";
import HospitalCenterList from "./HospitalCenterList";

interface Props {
  newHospitals: Schemas.ProfessionalHospitalRequest[];
  setFieldValue: (
    field: string,
    value: Schemas.ProfessionalHospitalRequest[],
  ) => void;
}
const styles = makeStyles({
  firstNameInput: {
    marginInline: "10px",
    paddingBottom: "10px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  citySelect: {
    paddingBottom: "15px",
  },
  labelStyle: {
    color: theme.palette.primary.main,
  },
  buttonStyle: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
    marginTop: 2,
    height: 40,
  },
});

export default function HospitalCenter({ newHospitals, setFieldValue }: Props) {
  const classes = styles();
  const [hospitalOpen, setHospitalOpen] = useState(false);

  const handleHospitalMap = useCallback(() => {
    setHospitalOpen(!hospitalOpen);
  }, [hospitalOpen]);

  const handleChangeHospitals = useCallback(
    (value?: Schemas.ProfessionalHospitalRequest) => {
      setFieldValue(
        "hospitals",
        value ? [...newHospitals, value] : newHospitals,
      );
    },
    [setFieldValue, newHospitals],
  );

  const onSaveHospitals = useCallback(
    (data: MapData) => {
      const newHealthCenter = {
        ...data,
        latitude: data.markerPosition.lat,
        longitude: data.markerPosition.lng,
      } as Schemas.ProfessionalHospitalRequest;
      handleChangeHospitals(newHealthCenter);
      handleHospitalMap();
    },
    [handleChangeHospitals, handleHospitalMap],
  );

  const onPressDelete = useCallback(
    (value: string) => {
      const valueRemaining = newHospitals.filter((a) => a.name !== value);
      setFieldValue("hospitals", valueRemaining);
    },
    [newHospitals, setFieldValue],
  );

  return (
    <div className={classes.container}>
      <div className={classes.formGroup}>
        <Typography className={classes.labelStyle}>
          {STRINGS.signUp.WORKING_MEDICAL_CENTERS}
        </Typography>
        <HospitalCenterList hospitals={newHospitals} onDelete={onPressDelete} />
        <Button
          className={classes.buttonStyle}
          onClick={handleHospitalMap}
          variant="outlined">
          {STRINGS.signUp.ADD_HOSPITALS}
        </Button>
        <AutocompleteMapDialog
          label={STRINGS.signUp.ADD_HOSPITALS}
          open={hospitalOpen}
          handleShow={handleHospitalMap}
          onSave={onSaveHospitals}
        />
      </div>
    </div>
  );
}
