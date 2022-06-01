import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import Search, { ItemType } from "../../../inputs/Search/Search";

interface Props {
  onPickedOption: (pickedOption: ItemType) => void;
}

export default function MedicationCatalogSearch({ onPickedOption }: Props) {
  const handleOnPickedOption = useCallback(
    (pickedOption: ItemType) => {
      onPickedOption(pickedOption);
    },
    [onPickedOption],
  );

  return (
    <Search
      items={[]}
      onPickedOption={handleOnPickedOption}
      label={STRINGS.generals.SEARCH_MEDICINE}
    />
  );
}
