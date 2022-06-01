/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Geocode from "react-geocode";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useAddLastAlerts } from "../../modules/utils/error/handleError";
import { GOOGLE_MAPS_API } from "../../utils/constants";
import { getArea, getCity, getCountry, getProvince } from "../../utils/maps";
import STRINGS from "../../utils/strings";
import { MapData } from "../../utils/types";
import BadgedButton from "../buttons/BadgedButton";
import PrimaryButton from "../buttons/PrimaryButton";
import LabeledDialog from "../dialogs/LabeledDialog";
import Map from "./Map";

Geocode.setApiKey(GOOGLE_MAPS_API);
Geocode.enableDebug();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 80,
      height: "85%",
      minHeight: 200,
      maxWidth: 2000,
      width: "80%",
      [theme.breakpoints.up("sm")]: {
        height: "85%",
        minHeight: 400,
      },
    },
    rowInput: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      width: "48%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      color: "#828282",
    },
    icon: {
      boxShadow: "none",
    },
    containerAutocomplete: {
      display: "flex",
      flexDirection: "row",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.grey[400],
      marginTop: 4,
      height: 40,
      marginBottom: 6,
    },
    title: {
      fontSize: "0.8rem",
      fontWeight: "bold",
      marginTop: 0,
    },
    notesContainer: {
      width: 400,
    },
    notes: {
      marginTop: 4,
      width: "100%",
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    full: {
      width: "100%",
    },
    prefix: {
      maxWidth: 80,
      marginRight: 2,
    },
  }),
);

interface Props {
  mapData?: MapData;
  zoom?: number;
  label: string;
  open?: boolean;
  handleShow: () => void;
  onSave?: (data: MapData) => void;
}

const AutocompleteMapDialog = ({
  label,
  mapData = {
    nameNotes: "",
    address: "",
    area: "",
    city: "",
    code: "",
    country: "",
    name: "",
    mapPosition: {
      lat: -0.1806532,
      lng: -78.4678382,
    },
    markerPosition: {
      lat: -0.1806532,
      lng: -78.4678382,
    },
    province: "Pichincha",
  },
  zoom,
  open = false,
  handleShow,
  onSave = () => {},
}: Props) => {
  const classes = useStyles();
  const [data, setData] = useState<MapData>(mapData);
  const [renderAutocomplete, setRenderAutocomplete] = useState<number>(0);
  const [value, setValue] = useState(null);
  const { addLastAlerts } = useAddLastAlerts();

  useEffect(() => {
    let idTimeOut: NodeJS.Timeout;
    if (open && renderAutocomplete <= 2) {
      idTimeOut = setTimeout(() => {
        setRenderAutocomplete(
          renderAutocomplete === 2
            ? renderAutocomplete
            : renderAutocomplete + 1,
        );
      }, 500);
    }
    return () => {
      clearTimeout(idTimeOut);
    };
  }, [open, renderAutocomplete]);

  const onPlaceSelected = useCallback(
    async (place) => {
      setValue(place);
      const geocode = await geocodeByPlaceId(place.value.place_id);
      const newLat = geocode[0].geometry.location.lat();
      const newLng = geocode[0].geometry.location.lng();
      const response = await Geocode.fromLatLng(`${newLat}`, `${newLng}`);
      const addressArray = response.results[0].address_components;
      const address = response.results[0].formatted_address;
      const newMapData = {
        name: place.label,
        address,
        nameNotes: `${address} / ${data.notes}`,
        notes: data.notes || "",
        area: getArea(addressArray),
        city: getCity(addressArray),
        country: getCountry(addressArray),
        code: response.results[0].place_id,
        province: getProvince(addressArray),
        markerPosition: {
          lat: newLat,
          lng: newLng,
        },
        mapPosition: {
          lat: newLat,
          lng: newLng,
        },
      };
      setData(newMapData);
    },
    [data.notes],
  );

  const onSaveCallBack = useCallback(() => {
    if (data.code) {
      onSave(data);
    } else {
      addLastAlerts({
        message: STRINGS.error.CHOOSE_LOCATION,
        severity: "error",
        name: "",
      });
    }
  }, [addLastAlerts, data, onSave]);

  const onDragend = useCallback(
    (newData: MapData) => {
      setData({
        ...newData,
        nameNotes: `${newData.name} / ${data.notes}`,
        notes: data.notes || "",
      });
    },
    [data.notes],
  );

  const renderActionPanel = useCallback(
    () => (
      <PrimaryButton
        className={classes.button}
        label={STRINGS.generals.SAVE}
        onClick={onSaveCallBack}
      />
    ),
    [classes.button, onSaveCallBack],
  );

  const onChange = useCallback(
    (name: string) => (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
      const newData = {
        ...data,
        [name]: event.target.value,
      };
      if (name === "notes") {
        newData.nameNotes = `${data.name} / ${data.notes}`;
      }
      setData(newData);
    },
    [data],
  );

  return (
    <LabeledDialog
      open={open}
      label={label}
      handleShow={handleShow}
      rootClassName={classes.container}
      actionPanel={renderActionPanel()}>
      <div className={`${classes.formGroup} ${classes.full}`}>
        <TextField
          className={classes.title}
          type="text"
          name="name"
          placeholder={STRINGS.signupCustomer.NAME}
          value={data.name}
          onChange={onChange("name")}
          variant="outlined"
          margin="dense"
        />
        <TextField
          className={classes.title}
          type="text"
          name="address"
          placeholder={STRINGS.patientInfo.ADDRESS}
          value={data.address}
          onChange={onChange("address")}
          variant="outlined"
          margin="dense"
        />
        <span>
          <TextField
            className={`${classes.title} ${classes.prefix}`}
            type="text"
            name="prefix"
            placeholder={STRINGS.signupCustomer.DEFAULT_PREFIX}
            value={data.prefix}
            onChange={onChange("prefix")}
            variant="outlined"
            margin="dense"
          />
          <TextField
            className={classes.title}
            type="text"
            name="phone"
            placeholder={STRINGS.signupCustomer.PHONE}
            value={data.phone}
            onChange={onChange("phone")}
            variant="outlined"
            margin="dense"
          />
        </span>
      </div>
      <div className={classes.rowInput}>
        <div className={classes.formGroup}>
          <TextField
            className={classes.notes}
            type="text"
            name="notes"
            placeholder={STRINGS.signupCustomer.ADDRESS_NOTES}
            value={data.notes}
            onChange={onChange("notes")}
            variant="outlined"
            margin="dense"
          />
        </div>
        <div className={classes.formGroup}>
          <div
            id="containerGoogleAutocomplete"
            className={classes.containerAutocomplete}>
            <BadgedButton
              containerStyle={classes.icon}
              iconName="magnifier"
              iconWidth={13}
              iconHeight={13}
            />
            {renderAutocomplete % 2 === 0 && (
              <GooglePlacesAutocomplete
                apiKey={GOOGLE_MAPS_API}
                selectProps={{
                  value,
                  onChange: onPlaceSelected,
                  className: classes.full,
                  hideSelectedOptions: true,
                  noOptionsMessage: () => "",
                  placeholder: STRINGS.generals.SEARCH,
                  styles: {
                    control: (styles: any) => ({
                      ...styles,
                      borderColor: "white",
                      borderWidth: 0,
                    }),
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
      {renderAutocomplete % 2 === 0 && (
        <Map
          mapData={data}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onDragend={onDragend as any}
          style={{ minHeight: 400, minWith: 400 }}
          zoom={zoom || 15}
        />
      )}
    </LabeledDialog>
  );
};
export default AutocompleteMapDialog;
