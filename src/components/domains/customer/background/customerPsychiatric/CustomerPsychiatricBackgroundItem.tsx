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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  psychiatricItem: Schemas.CustomerPsychiatricItem | any;
  psychiatricOptions: string[];
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  enabled: boolean;
}

export default function CustomerPsychiatricBackgroundItem({
  index,
  selectorFieldName,
  inputFieldName,
  inputPlaceholder,
  psychiatricOptions,
  editMode = false,
  psychiatricItem,
  handleRemove,
  setFieldValue,
  enabled,
}: Props) {
  const item = useMemo(
    () => ({
      title: psychiatricItem.disorder || "",
      items: psychiatricItem.notes || "",
    }),
    [psychiatricItem.disorder, psychiatricItem.notes],
  );

  // eslint-disable-next-line no-confusing-arrow
  const renderItem = () =>
    psychiatricItem.free ? (
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
        options={psychiatricOptions}
        selectorPlaceHolder={
          STRINGS.background.PSYCHIATRIC_BACKGROUND_PLACEHOLDER
        }
        enabled={enabled}
      />
    );

  return editMode ? (
    renderItem()
  ) : (
    <BackgroundShowModeItem item={item} showBullet={false} />
  );
}
