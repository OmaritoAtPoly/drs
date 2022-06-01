import React, { useMemo } from "react";
import STRINGS from "../../../../utils/strings";
import { CustomerNutritionItem } from "../../../../utils/types";
import BackgroundEditModeTextItem from "../background/BackgroundEditModeTextItem";
import BackgroundEditSelectorModeTextItem from "../background/BackgroundEditSelectorModeTextItem";
import BackgroundShowModeItem from "../background/BackgroundShowModeItem";

interface Props {
  index: number;
  selectorFieldName: string;
  inputFieldName: string;
  inputPlaceholder: string;
  editMode?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nutritionItem: CustomerNutritionItem | any;
  nutritionItemOptions: string[];
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  enabled: boolean;
}

export default function NutritionItem({
  index,
  selectorFieldName,
  inputFieldName,
  inputPlaceholder,
  editMode = false,
  nutritionItem,
  nutritionItemOptions,
  handleRemove,
  setFieldValue,
  enabled,
}: Props) {
  const item = useMemo(
    () => ({
      title: nutritionItem.name,
      items: nutritionItem.description,
    }),
    [nutritionItem.description, nutritionItem.name],
  );

  // eslint-disable-next-line no-confusing-arrow
  const renderItem = () =>
    nutritionItem.free ? (
      <BackgroundEditModeTextItem
        index={index}
        inputFieldNameFirst={selectorFieldName}
        inputFieldNameSecond={inputFieldName}
        handleRemove={handleRemove}
        inputPlaceHolder={inputPlaceholder}
        inputFieldNameFirstPlaceholder="Dieta"
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
        options={nutritionItemOptions}
        selectorPlaceHolder={STRINGS.nutrition.NUTRITION_HABITS}
        enabled={enabled}
      />
    );

  return editMode ? (
    renderItem()
  ) : (
    <BackgroundShowModeItem item={item} showBullet={false} />
  );
}
