/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStyles, makeStyles } from "@material-ui/core";
import {
  GoogleApiWrapper,
  IMapProps,
  Map as MapGoogle,
  Marker,
} from "google-maps-react";
import React, { useCallback } from "react";
import Geocode from "react-geocode";
import { GOOGLE_MAPS_API } from "../../utils/constants";
import { getArea, getCity, getCountry, getProvince } from "../../utils/maps";
import { MapData } from "../../utils/types";
import LoadingWrapper from "../LoadingWrapper";

Geocode.setApiKey(GOOGLE_MAPS_API);
Geocode.enableDebug();

interface Props {
  loading?: boolean;
  onDragend?: (mapData: MapData) => void;
  mapData: MapData;
}

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      position: "relative",
    },
  }),
);

const MarkerLocal = Marker as any;

function MapDialogView({
  onDragend = () => {},
  mapData,
  ...rest
}: IMapProps & Props) {
  const onDragendCallBack = useCallback(
    async (t, map, value: { latLng: google.maps.LatLng }) => {
      const { latLng } = value;
      const newLat = latLng.lat();
      const newLng = latLng.lng();
      const response = await Geocode.fromLatLng(`${newLat}`, `${newLng}`);
      const addressArray = response.results[0].address_components;
      const address = response.results[0].formatted_address;
      const code = response.results[0].place_id;
      const name = mapData.code === code ? mapData.name : "";
      const newMapData = {
        ...mapData,
        address,
        name,
        area: getArea(addressArray),
        city: getCity(addressArray),
        country: getCountry(addressArray),
        code: response.results[0].place_id,
        province: getProvince(addressArray),
        markerPosition: {
          lat: newLat,
          lng: newLng,
        },
      };
      onDragend(newMapData);
    },
    [mapData, onDragend],
  );

  return (
    <MapGoogle
      center={mapData.mapPosition}
      initialCenter={mapData.mapPosition}
      {...rest}
      containerStyle={{
        display: "flex",
      }}>
      <MarkerLocal
        onDragend={onDragendCallBack}
        draggable
        position={mapData.markerPosition || mapData.mapPosition}
        label={mapData.address || ""}
      />
    </MapGoogle>
  );
}

const LoadingContainer = () => (
  <LoadingWrapper>
    <></>
  </LoadingWrapper>
);

const GoogleApiWrapperLocal: any = GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API,
  language: "es",
  LoadingContainer,
})(MapDialogView as any);

export default function Map({
  loading,
  mapData,
  ...rest
}: Props & Omit<Partial<IMapProps>, "center">) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.mapContainer}>
        <GoogleApiWrapperLocal mapData={mapData} loading={loading} {...rest} />
      </div>
    </div>
  );
}
