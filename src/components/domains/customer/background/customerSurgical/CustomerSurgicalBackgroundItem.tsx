import React from "react";
import BackgroundEditDateModeTextItem from "../BackgroundEditDateModeTextItem";
import SurgicalShowModeItem from "./SurgicalShowModeItem";

interface Props {
  index: number;
  selectorFieldName: string;
  inputFieldNotes: string;
  inputFieldName: string;
  inputPlaceholder: string;
  editMode?: boolean;
  surgicalItem: Schemas.CustomerSurgicalItem;
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  enabled: boolean;
}

export default function CustomerSurgicalBackgroundItem({
  index,
  selectorFieldName,
  inputFieldNotes,
  inputFieldName,
  inputPlaceholder,
  editMode = false,
  surgicalItem,
  handleRemove,
  setFieldValue,
  enabled,
}: Props) {
  return editMode ? (
    <BackgroundEditDateModeTextItem
      index={index}
      selectorFieldName={selectorFieldName}
      inputFieldNotes={inputFieldNotes}
      inputFieldName={inputFieldName}
      handleRemove={handleRemove}
      setFieldValue={setFieldValue}
      inputPlaceHolder={inputPlaceholder}
      dateTime={surgicalItem.dateTime}
      enabled={enabled}
    />
  ) : (
    <SurgicalShowModeItem surgical={surgicalItem} />
  );
}
