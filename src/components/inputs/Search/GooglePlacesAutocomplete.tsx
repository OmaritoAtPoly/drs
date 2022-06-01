/* eslint-disable @typescript-eslint/no-shadow */
import { TextFieldProps } from "@material-ui/core/TextField";
import {
  AutocompleteProps,
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React, { useCallback } from "react";
import PlacesAutocomplete, {
  Suggestion,
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LatLngAddress } from "../../../utils/types";
import { IconNames } from "../../Icon/IconNames";
import Autocomplete from "./Autocomplete";

export default function GooglePlacesAutocomplete({
  renderInput,
  inputProps,
  loading: loadingProp,
  value,
  onChange,
  onSelect = () => {},
  ...rest
}: Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<AutocompleteProps<any, boolean, boolean, boolean>>,
  | "onChange"
  | "options"
  | "getOptionLabel"
  | "filterOptions"
  | "onDebounce"
  | "onSelect"
  | "value"
> & {
  notIcon?: boolean;
  iconName?: IconNames;
  iconWidth?: number;
  onIconClick?: () => void;
  iconHeight?: number;
  value?: string;
  onChange?: (value: string | LatLngAddress) => void;
  onSelect?: (value: LatLngAddress) => void;
  loading?: boolean;
  inputProps?: TextFieldProps;
}) {
  const filterOptionsSimple = createFilterOptions({
    stringify: (option: Suggestion) => `${option.description}`,
  });

  const onSelectCallBack = useCallback(
    async (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const address = (event.target as any).value;
      const geoCodes = await geocodeByAddress(address);
      const latLng = await getLatLng(geoCodes[0]);
      onSelect({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        address: (event.target as any).value,
        latitude: latLng.lat,
        longitude: latLng.lng,
      });
    },
    [onSelect],
  );

  const onChangeCallBack = useCallback(
    async (value?: string | LatLngAddress) => {
      let address = "";
      if (typeof value === "string") {
        address = value;
      } else {
        address = value?.address || "";
      }
      const geoCodes = await geocodeByAddress(address);
      const latLng = await getLatLng(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geoCodes && geoCodes.length ? geoCodes[0] : ({} as any),
      );
      onSelect({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        address,
        latitude: latLng.lat,
        longitude: latLng.lng,
      });
    },
    [onSelect],
  );

  return (
    <PlacesAutocomplete value={value} onChange={onChange}>
      {({ getInputProps, suggestions, loading }) => (
        <Autocomplete
          inputProps={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(getInputProps({}) as any),
          }}
          loading={loading || loadingProp}
          options={[...suggestions] || []}
          getOptionLabel={
            (option: Suggestion) => option.description
            // eslint-disable-next-line react/jsx-curly-newline
          }
          onChange={onChangeCallBack}
          onSelect={onSelectCallBack}
          filterOptions={filterOptionsSimple}
          {...rest}
        />
      )}
    </PlacesAutocomplete>
  );
}
