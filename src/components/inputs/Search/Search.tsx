/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-curly-newline */
import { TextField, TextFieldProps } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React from "react";
// eslint-disable-next-line import/no-cycle
import NoOptionMatchItem from "./NoOptionMatchItem";

export type ItemType = {
  inputValue?: string;
  label: string;
  value: string;
};

interface Props {
  items: ItemType[];
  defaultAction?: boolean;
  renderOption?: JSX.Element;
  renderInput?: JSX.Element;
  onPickedOption?: (option: ItemType) => void;
  className?: string;
  inputProps?: TextFieldProps;
  label?: string;
}

const filter = createFilterOptions<ItemType>();

export default function Search({
  items,
  renderInput = undefined,
  onPickedOption,
  className,
  inputProps,
  label = "Buscar",
}: Props) {
  return (
    <Autocomplete
      id="autocomplete-search"
      className={className}
      onChange={(event, newValue) => {
        if (newValue && onPickedOption) {
          if (typeof newValue === "string") {
            onPickedOption({
              label: newValue,
              value: newValue,
            });
          } else onPickedOption(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            label: params.inputValue,
            value: params.inputValue,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      options={items as ItemType[]}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.label;
      }}
      renderOption={(option) => {
        if (option.inputValue) {
          return <NoOptionMatchItem item={option} />;
        }
        return <div>{option.label}</div>;
      }}
      renderInput={(params) =>
        renderInput || (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            margin="dense"
            {...inputProps}
            inputProps={{ ...params.inputProps }}
          />
        )
      }
    />
  );
}
