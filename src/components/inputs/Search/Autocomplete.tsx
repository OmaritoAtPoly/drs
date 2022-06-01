/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CircularProgress,
  createStyles,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { FilterOptionsState } from "@material-ui/lab";
import AutocompleteMaterial, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { debounce as debounceLodash } from "lodash";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import STRINGS from "../../../utils/strings";
import Icon from "../../Icon/Icon";
import { IconNames } from "../../Icon/IconNames";

const styles = makeStyles((theme) =>
  createStyles({
    formContainer: {
      width: "100%",
    },
    searchIconButton: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      display: "flex",
    },
  }),
);

export default function Autocomplete({
  options,
  renderInput,
  iconName = "magnifier",
  iconHeight = 15,
  iconWidth = 15,
  onIconClick,
  onChange = () => {},
  inputProps,
  loading,
  onDebounce,
  notIcon = false,
  renderInitialOption,
  renderOption,
  getOptionLabel,
  filterOptions,
  ...rest
}: Omit<
  Partial<AutocompleteProps<any, boolean, boolean, boolean>>,
  "onChange"
> & {
  notIcon?: boolean;
  iconName?: IconNames;
  iconWidth?: number;
  onIconClick?: () => void;
  iconHeight?: number;
  onChange?: (value: any) => void;
  loading?: boolean;
  onDebounce?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  inputProps?: TextFieldProps;
  renderInitialOption?: () => React.ReactNode;
}) {
  const classes = styles();
  const onChangeCallback = useCallback(
    (_: any, newValue: any) => {
      onChange(newValue);
    },
    [onChange],
  );

  const onDebounceCallBack = useMemo(
    () =>
      debounceLodash(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onDebounce && onDebounce(event);
        },
        500,
      ),
    [onDebounce],
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      inputProps && inputProps.onChange && inputProps?.onChange(event);
      onDebounceCallBack(event);
    },
    [inputProps, onDebounceCallBack],
  );

  const renderInputDefault = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <div className={classes.formContainer}>
        <TextField
          {...params}
          margin="normal"
          variant="outlined"
          {...inputProps}
          onChange={onInputChange}
          autoComplete="off"
          InputProps={{
            autoFocus:
              inputProps?.autoFocus !== undefined
                ? inputProps?.autoFocus
                : true,
            autoComplete:
              inputProps?.autoComplete !== undefined
                ? inputProps?.autoComplete
                : "off",
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {loading && <CircularProgress size={15} />}
                {!loading && !notIcon && (
                  <IconButton
                    onClick={onIconClick}
                    className={classes.searchIconButton}>
                    <Icon
                      name={iconName}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
    ),
    [
      classes.formContainer,
      classes.searchIconButton,
      iconHeight,
      iconName,
      iconWidth,
      inputProps,
      loading,
      notIcon,
      onInputChange,
      onIconClick,
    ],
  );

  const renderOptionLocal = useCallback(
    (
      option: any,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state: AutocompleteRenderOptionState,
    ) => {
      if (option && renderInitialOption && option.initialOption) {
        return renderInitialOption();
      }
      if (renderOption) {
        return renderOption(option, state);
      }
      return <li>{getOptionLabel ? getOptionLabel(option) : ""}</li>;
    },
    [getOptionLabel, renderInitialOption, renderOption],
  );

  const filterOptionsCalBack = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      options: any[],
      state: FilterOptionsState<any>,
    ) => {
      const defaultFilterOptions = createFilterOptions();
      const filtered = filterOptions
        ? filterOptions(options, state)
        : defaultFilterOptions(options, state);
      if (renderInitialOption) {
        return [{ initialOption: true }, ...filtered];
      }
      return filtered;
    },
    [filterOptions, renderInitialOption],
  );

  const dynamicProps: any = renderInitialOption
    ? {
        renderOption: renderOptionLocal,
        filterOptions: filterOptionsCalBack,
      }
    : { renderOption };

  return (
    <AutocompleteMaterial
      size="small"
      freeSolo
      {...rest}
      onChange={onChangeCallback}
      options={options || []}
      getOptionLabel={getOptionLabel}
      renderInput={renderInput || renderInputDefault}
      disabledItemsFocusable
      {...dynamicProps}
      noOptionsText={STRINGS.generals.WHITE_TEXT_TO_FIND_RESULT}
      onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          if (rest.freeSolo || rest.freeSolo === undefined) {
            e.preventDefault();
            onChangeCallback && onChangeCallback(e, (e.target as any).value);
          }
        }
      }}
    />
  );
}
