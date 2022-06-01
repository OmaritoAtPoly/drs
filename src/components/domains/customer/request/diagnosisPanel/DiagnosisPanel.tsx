/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import React, { useCallback, useState } from "react";
import STRINGS from "../../../../../utils/strings";
import CardLayout from "../../../../cards/CardLayout";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../../inputs/Search/NoOptionMatchItem";
import NoItemToShow from "../NoItemToShow";
import ItemDiagnosis from "./ItemDiagnosis";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    diagnosisTitleStyle: {
      paddingBlock: theme.spacing(1),
    },
    search: {
      padding: theme.spacing(1),
      width: "30%",
    },
    counterList: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
  }),
);

interface Props {
  loadingDiagnoses: boolean;
  loading?: boolean;
  searchResult: Schemas.Diagnose[];
  diagnosisList: Schemas.Diagnose[];
  handleAddDiagnosisItem: (value: Schemas.Diagnose) => void;
  handleDeleteDiagnosisItem: (index: number) => void;
  onChangeDiagnosisType: (index: number, type: string) => void;
  onChangeNotes: (index: number, notes: string) => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  titleStyle?: string;
  readOnly?: boolean;
  classNameContainer?: string;
  withDefinitiveDiagnosis: boolean;
  withComment: boolean;
  autoFocus?: boolean;
}
export default function DiagnosisPanel({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading = false,
  loadingDiagnoses,
  onDebounceSearch,
  searchResult,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAddDiagnosisItem,
  handleDeleteDiagnosisItem,
  onChangeDiagnosisType,
  onChangeNotes,
  diagnosisList,
  titleStyle = "",
  readOnly = false,
  classNameContainer = "",
  withDefinitiveDiagnosis,
  withComment,
  autoFocus,
}: Props) {
  const classes = styles();
  const [newDiagnosesName, setNewDiagnosesName] = useState<string>("");

  const onDebounceSearchCallBack = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.ChangeEvent<any>) => {
      setNewDiagnosesName(e.target.value);
      onDebounceSearch(e);
    },
    [onDebounceSearch],
  );

  const handleAddDiagnoses = useCallback(
    (diagnose: Schemas.Diagnose) => {
      handleAddDiagnosisItem(diagnose);
      setNewDiagnosesName("");
    },
    [handleAddDiagnosisItem],
  );

  const onAddDiagnoses = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (diagnose: Schemas.Diagnose | any) => {
      if (diagnose && diagnose.code !== undefined) {
        handleAddDiagnoses(diagnose);
      } else if (
        diagnose &&
        diagnose.code === undefined &&
        newDiagnosesName !== ""
      ) {
        handleAddDiagnoses({
          description: newDiagnosesName,
          definitive: false,
        });
      }
    },
    [handleAddDiagnoses, newDiagnosesName],
  );

  const filterOptions = createFilterOptions({
    stringify: (option: Schemas.Diagnose) =>
      `${option.description} ${option.code}`,
  });

  return (
    <div>
      <Typography className={`${classes.diagnosisTitleStyle}${titleStyle}`}>
        {STRINGS.buttonGrid.DIAGNOSIS}
      </Typography>
      <CardLayout className={`${classes.container} ${classNameContainer}`}>
        <div id="search-container" className={classes.search}>
          <Autocomplete
            loading={loadingDiagnoses}
            options={searchResult}
            // eslint-disable-next-line no-confusing-arrow
            getOptionLabel={(option: Schemas.Diagnose) =>
              // eslint-disable-next-line no-nested-ternary
              option.code
                ? option.code !== option.description
                  ? `( ${option.code || "-"} ) ${option.description || ""} `
                  : `${option.description || ""}`
                : ""
            }
            filterOptions={filterOptions}
            freeSolo
            autoComplete={false}
            onChange={onAddDiagnoses}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.buttonGrid.SEARCH_DIAGNOSE,
              onChange: (e) => {
                setNewDiagnosesName(e.target.value);
              },
              autoFocus,
            }}
            renderInitialOption={() => (
              <NoOptionMatchItem
                item={{ label: newDiagnosesName, value: newDiagnosesName }}
              />
            )}
            onDebounce={onDebounceSearchCallBack}
            disabled={readOnly}
          />
        </div>
        {diagnosisList.length <= 0 ? (
          <NoItemToShow value={STRINGS.historical.DIAGNOSE_WORD} />
        ) : (
          diagnosisList.map((diagnosis, index) => (
            <ItemDiagnosis
              index={index}
              key={index}
              label={diagnosis.description || ""}
              definitive={diagnosis.definitive}
              code={diagnosis.code || ""}
              onDelete={() => handleDeleteDiagnosisItem(index)}
              onChangeDiagnosisType={onChangeDiagnosisType}
              notes={diagnosis.notes || ""}
              onChangeNotes={onChangeNotes}
              readOnly={readOnly}
              withDefinitiveDiagnosis={withDefinitiveDiagnosis}
              withComment={withComment}
            />
          ))
        )}
      </CardLayout>
    </div>
  );
}
