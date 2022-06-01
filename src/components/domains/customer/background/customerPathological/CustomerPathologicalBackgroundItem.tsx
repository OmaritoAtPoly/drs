import React, { useMemo } from "react";
import STRINGS from "../../../../../utils/strings";
import BackgroundEditModeTextItem from "../BackgroundEditModeTextItem";
import BackgroundEditSelectorModeTextItem from "../BackgroundEditSelectorModeTextItem";
import BackgroundShowModeItem from "../BackgroundShowModeItem";

interface Props {
  key?: string | number;
  index: number;
  selectorFieldName: string;
  inputFieldName: string;
  inputPlaceholder: string;
  editMode?: boolean;
  pathologiesOptions: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pathologicalItem: Schemas.CustomerPathologyData | any;
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  enabled: boolean;
}

export default function CustomerPathologicalBackgroundItem({
  key,
  index,
  selectorFieldName,
  inputFieldName,
  inputPlaceholder,
  editMode = false,
  pathologicalItem,
  pathologiesOptions,
  handleRemove,
  setFieldValue,
  enabled,
}: Props) {
  const item = useMemo(
    () => ({
      title: pathologicalItem.pathology || "",
      items: pathologicalItem.notes || "",
    }),
    [pathologicalItem.notes, pathologicalItem.pathology],
  );

  // eslint-disable-next-line no-confusing-arrow
  const renderItem = () =>
    pathologicalItem.free ? (
      <BackgroundEditModeTextItem
        key={key}
        index={index}
        inputFieldNameFirst={selectorFieldName}
        inputFieldNameSecond={inputFieldName}
        handleRemove={handleRemove}
        inputPlaceHolder={inputPlaceholder}
        enabled={enabled}
      />
    ) : (
      <BackgroundEditSelectorModeTextItem
        key={key}
        index={index}
        selectorFieldName={selectorFieldName}
        inputFieldName={inputFieldName}
        handleRemove={handleRemove}
        setFieldValue={setFieldValue}
        inputPlaceHolder={inputPlaceholder}
        selectorPlaceHolder={STRINGS.background.PATHOLOGIES}
        options={pathologiesOptions}
        enabled={enabled}
      />
    );

  return editMode ? (
    renderItem()
  ) : (
    <BackgroundShowModeItem key={key} item={item} showBullet={false} />
  );
}
