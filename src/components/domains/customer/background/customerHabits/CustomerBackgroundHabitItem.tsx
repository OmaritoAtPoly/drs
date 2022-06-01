import React, { useMemo } from "react";
import STRINGS from "../../../../../utils/strings";
import BackgroundEditModeTextItem from "../BackgroundEditModeTextItem";
import BackgroundEditSelectorModeTextItem from "../BackgroundEditSelectorModeTextItem";
import BackgroundShowModeItem from "../BackgroundShowModeItem";

interface Props {
  index: number;
  selectorFieldName: string;
  inputFieldName: string;
  inputPlaceholder: string;
  editMode?: boolean;
  habits: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  habitItem: Schemas.CustomerHabitData | any;
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  enabled: boolean;
}

export default function CustomerBackgroundHabitItem({
  index,
  selectorFieldName,
  inputFieldName,
  inputPlaceholder,
  editMode = false,
  habitItem,
  habits,
  handleRemove,
  setFieldValue,
  enabled,
}: Props) {
  const item = useMemo(
    () => ({
      title: habitItem.habit || "",
      items: habitItem.notes || "",
    }),
    [habitItem.notes, habitItem.habit],
  );

  // eslint-disable-next-line no-confusing-arrow
  const renderItem = () =>
    habitItem.free ? (
      <BackgroundEditModeTextItem
        index={index}
        inputFieldNameFirst={selectorFieldName}
        inputFieldNameSecond={inputFieldName}
        handleRemove={handleRemove}
        inputPlaceHolder={inputPlaceholder}
        enabled={enabled}
      />
    ) : (
      <BackgroundEditSelectorModeTextItem
        index={index}
        selectorFieldName={selectorFieldName}
        inputFieldName={inputFieldName}
        handleRemove={handleRemove}
        setFieldValue={setFieldValue}
        inputPlaceHolder={inputPlaceholder}
        selectorPlaceHolder={STRINGS.background.HABITS}
        options={habits}
        enabled={enabled}
      />
    );

  return editMode ? (
    renderItem()
  ) : (
    <BackgroundShowModeItem item={item} showBullet={false} />
  );
}
