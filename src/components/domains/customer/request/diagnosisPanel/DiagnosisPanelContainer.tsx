/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import { useCustomerDiagnosesQuery } from "../../../../../modules/customer/request/query";
import { ItemType } from "../../../../inputs/Search/Search";
import DiagnosisPanel from "./DiagnosisPanel";

interface Props {
  diagnosisList?: Schemas.Diagnose[];
  onAddDiagnosis: (value: Schemas.Diagnose) => void;
  onDeleteDiagnosis: (index: number) => void;
  onChangeDiagnosisType: (index: number, type: string) => void;
  onChangeNotes: (index: number, notes: string) => void;
  titleStyle?: string;
  readOnly?: boolean;
  classNameContainer?: string;
  withDefinitiveDiagnosis?: boolean;
  withComment?: boolean;
  autoFocus?: boolean;
}

export default function DiagnosisPanelContainer({
  onAddDiagnosis,
  onDeleteDiagnosis,
  onChangeDiagnosisType,
  onChangeNotes,
  diagnosisList = [],
  titleStyle = "",
  readOnly = false,
  classNameContainer = "",
  withDefinitiveDiagnosis = true,
  withComment = true,
  autoFocus,
}: Props) {
  const [search, setSearch] = useState<string>("");

  const { data, loading: loadingDiagnoses } = useCustomerDiagnosesQuery({
    showError: true,
    enabled: search,
    search,
  });

  const handleOnAddDiagnosis = useCallback(
    (diagnosis: Schemas.Diagnose) => {
      onAddDiagnosis(diagnosis);
    },
    [onAddDiagnosis],
  );

  const handleOnDeleteDiagnosis = useCallback(
    (index: number) => {
      onDeleteDiagnosis(index);
    },
    [onDeleteDiagnosis],
  );

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(event.target.value || "");
    },
    [setSearch],
  );

  return (
    <DiagnosisPanel
      searchResult={data || []}
      handleAddDiagnosisItem={handleOnAddDiagnosis}
      handleDeleteDiagnosisItem={handleOnDeleteDiagnosis}
      onChangeDiagnosisType={onChangeDiagnosisType}
      loadingDiagnoses={loadingDiagnoses}
      onDebounceSearch={onDebounceSearch}
      diagnosisList={diagnosisList}
      onChangeNotes={onChangeNotes}
      titleStyle={titleStyle}
      readOnly={readOnly}
      classNameContainer={classNameContainer}
      withDefinitiveDiagnosis={withDefinitiveDiagnosis}
      withComment={withComment}
      autoFocus={autoFocus}
    />
  );
}
