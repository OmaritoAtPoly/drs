import React, { useCallback, useMemo } from "react";
import BackgroundShowModeItem from "../BackgroundShowModeItem";
import GynecologyDateLabeledEditModeItem from "./GynecologyDateLabeledEditModeItem";
import GynecologyLabeledEditModeItem from "./GynecologyLabeledEditModeItem";
import GynecologyLabeledTextAreaEditModeItem from "./GynecologyLabeledTextAreaEditModeItem";

interface Props {
  inputFieldName: string;
  inputPlaceholder: string;
  label: string;
  value: string | Schemas.DateObject;
  editMode?: boolean;
  inputTypeRender?: string;
  inputType: string;
  itemLabel?: string;
}

export default function GynecologyBackgroundItem({
  inputFieldName,
  inputPlaceholder,
  inputTypeRender = "TEXT",
  editMode = false,
  label,
  value,
  inputType,
  itemLabel = "",
}: Props) {
  const getValue = useCallback(() => {
    if (value instanceof Object) {
      return value && value.dateYear && value.dateYear > 1990
        ? `${value.dateDay}/${value.dateMonth}/${value.dateYear}`
        : "-";
    }
    if (value !== "0") {
      return value;
    }
    return "-";
  }, [value]);

  const item = useMemo(() => {
    const itemValue = getValue();
    return {
      title: label,
      items: itemValue,
      itemLabel: itemValue === "-" ? "" : itemLabel,
    };
  }, [getValue, itemLabel, label]);

  const renderEditableItem = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () => {
      if (inputTypeRender === "DATE") {
        return (
          <GynecologyDateLabeledEditModeItem
            inputFieldName={inputFieldName}
            label={label}
          />
        );
      }
      if (inputTypeRender === "TEXT_AREA") {
        return (
          <GynecologyLabeledTextAreaEditModeItem
            inputFieldName={inputFieldName}
            label={label}
            placeHolder={inputPlaceholder}
            inputType={inputType}
          />
        );
      }
      return (
        <GynecologyLabeledEditModeItem
          inputFieldName={inputFieldName}
          label={label}
          placeHolder={inputPlaceholder}
          inputType={inputType}
        />
      );
    },
    [inputFieldName, inputPlaceholder, inputType, inputTypeRender, label],
  );

  const renderShowModeItem = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      !value || item.items === "-" || value === 0 ? (
        <div />
      ) : (
        <BackgroundShowModeItem item={item} />
      ),
    [item, value],
  );
  return editMode ? renderEditableItem() : renderShowModeItem();
}
