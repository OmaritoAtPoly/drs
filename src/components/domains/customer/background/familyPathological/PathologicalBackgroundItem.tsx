import React from "react";
import PathologicalBackgroundEditModeItem from "./PathologicalBackgroundEditModeItem";
import PathologicalBackgroundShowModeItem from "./PathologicalBackgroundShowModeItem";

interface Props {
  editMode?: boolean;
  fieldName: string;
  index: number;
  familyParents: string[];
  handleAddPathology: (index: number, pathology: string) => void;
  handleRemovePathology: (parentIndex: number, childIndex: number) => void;
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  pathologicalItem: Schemas.CustomerFamilyPathologiesData;
  enabled: boolean;
}

export default function PathologicalBackgroundItem({
  editMode = false,
  pathologicalItem,
  familyParents,
  fieldName,
  index,
  setFieldValue,
  handleAddPathology,
  handleRemove,
  handleRemovePathology,
  enabled,
}: Props) {
  return editMode ? (
    <PathologicalBackgroundEditModeItem
      pathologicalItem={pathologicalItem}
      fieldName={fieldName}
      familyParents={familyParents}
      index={index}
      setFieldValue={setFieldValue}
      handleAddPathology={handleAddPathology}
      handleRemove={handleRemove}
      handleRemovePathology={handleRemovePathology}
      enabled={enabled}
    />
  ) : (
    <PathologicalBackgroundShowModeItem pathologicalItem={pathologicalItem} />
  );
}
