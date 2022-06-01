import React from "react";
import GynecologyTestItemEditMode from "./GynecologyTestItemEditMode";
import GynecologyTestItemShowMode from "./GynecologyTestItemShowMode";

interface Props {
  test: Schemas.DateTestsData;
  editMode?: boolean;
  index: number;
  label: string;
  inputFieldLabel: string;
  inputFieldTextArea: string;
  inputFieldDate: string;
  inputPlaceHolder: string;
  handleRemove: (index: number) => void;
}

export default function GynecologyBackgroundTestItem({
  test,
  editMode = false,
  index,
  label,
  inputFieldLabel,
  inputFieldTextArea,
  inputFieldDate,
  inputPlaceHolder,
  handleRemove,
}: Props) {
  return editMode ? (
    <GynecologyTestItemEditMode
      index={index}
      handleRemove={handleRemove}
      label={label}
      inputFieldDate={inputFieldDate}
      inputFieldLabel={inputFieldLabel}
      inputFieldTextArea={inputFieldTextArea}
      inputPlaceHolder={inputPlaceHolder}
    />
  ) : (
    <GynecologyTestItemShowMode test={test} />
  );
}
