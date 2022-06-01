/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";
import RequestPanel from "./RequestPanel";

interface Props {
  loadingCategories: boolean;
  categoryResults?: Schemas.CategoryExamData[];
  requestList?:
    | Schemas.ImageRequestItemRequest[]
    | Schemas.LaboratoryRequestItemRequest[];
  onAddRequest: (value: Schemas.CategoryExamData) => void;
  onDeleteRequest: (code: string) => void;
  onChangeRequestNotes: (index: number, notes: string) => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  showTitle?: boolean;
  handleOnRequestQuantityChange?: (index: number, quantity: string) => void;
  readOnly?: boolean;
}

export default function RequestPanelContainer({
  loadingCategories,
  requestList = [],
  categoryResults = [],
  onAddRequest,
  onDeleteRequest,
  onChangeRequestNotes,
  onDebounceSearch,
  showTitle,
  handleOnRequestQuantityChange,
  readOnly = false,
}: Props) {
  const handleOnAddItem = useCallback(
    (request: Schemas.CategoryExamData) => {
      onAddRequest(request);
    },
    [onAddRequest],
  );
  const handleOnDeleteItem = useCallback(
    (code: string) => {
      onDeleteRequest(code);
    },
    [onDeleteRequest],
  );

  return (
    <RequestPanel
      handleAddItem={handleOnAddItem}
      handleDeleteItem={handleOnDeleteItem}
      requestList={requestList}
      onChangeNotes={onChangeRequestNotes}
      searchResult={categoryResults}
      loadingCategories={loadingCategories}
      onDebounceSearch={onDebounceSearch}
      showTitle={showTitle}
      handleOnRequestQuantityChange={handleOnRequestQuantityChange}
      readOnly={readOnly}
    />
  );
}
