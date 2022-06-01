import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import Search, { ItemType } from "../../../../inputs/Search/Search";
import DiagnosisItem from "./DiagnosisItem";

const styles = makeStyles(() =>
  createStyles({
    container: {},
    seeker: {
      padding: "10px",
      width: "30%",
    },
  }),
);

interface Props {
  loading?: boolean;
  diagnosisList: ItemType[];
  newDiagnosisList: ItemType[];
  handleAddDiagnosisItem: (value: ItemType) => void;
  handleDeleteDiagnosisItem: (value: string) => void;
}
export default function Diagnosis({
  loading = false,
  diagnosisList,
  handleAddDiagnosisItem,
  handleDeleteDiagnosisItem,
  newDiagnosisList,
}: Props) {
  const classes = styles();

  return (
    <div>
      <div id="search-container" className={classes.seeker}>
        <Search items={diagnosisList} onPickedOption={handleAddDiagnosisItem} />
      </div>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        newDiagnosisList &&
        newDiagnosisList.map((a, index) => {
          const key = Math.random();
          return (
            <DiagnosisItem
              index={index}
              key={key}
              label={a.label}
              onDelete={() => handleDeleteDiagnosisItem(a.value)}
            />
          );
        })
      )}
    </div>
  );
}
