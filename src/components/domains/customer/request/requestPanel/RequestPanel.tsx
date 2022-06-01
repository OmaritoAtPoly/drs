/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import React, { useCallback, useMemo, useState } from "react";
import shortid from "shortid";
import STRINGS from "../../../../../utils/strings";
import CardLayout from "../../../../cards/CardLayout";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../../inputs/Search/NoOptionMatchItem";
import NoItemToShow from "../NoItemToShow";
import ItemRequest from "./ItemRequest";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
    },
    diagnosisTitleStyle: {
      paddingBlock: theme.spacing(1),
    },
    seeker: {
      padding: theme.spacing(1),
    },
  }),
);

interface Props {
  loading?: boolean;
  loadingCategories: boolean;
  searchResult: Schemas.CategoryExamData[];
  requestList: Schemas.ImageRequestItemRequest[];
  handleAddItem: (value: Schemas.CategoryExamData) => void;
  handleDeleteItem: (code: string) => void;
  onChangeNotes: (index: number, notes: string) => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  showTitle?: boolean;
  handleOnRequestQuantityChange?: (index: number, quantity: string) => void;
  readOnly?: boolean;
}
export default function RequestPanel({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading = false,
  searchResult,
  handleAddItem,
  onDebounceSearch,
  loadingCategories,
  handleDeleteItem,
  onChangeNotes,
  requestList,
  showTitle = true,
  handleOnRequestQuantityChange,
  readOnly = false,
}: Props) {
  const classes = styles();
  const [newRequestName, setNewRequestName] = useState<string>("");

  const filterOptions = createFilterOptions({
    stringify: (option: Schemas.CategoryExamData) =>
      `${option.name} ${option.code}`,
  });

  const onDebounceSearchCallBack = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.ChangeEvent<any>) => {
      setNewRequestName(e.target.value);
      onDebounceSearch(e);
    },
    [onDebounceSearch],
  );

  const handleAddRequest = useCallback(
    (request: Schemas.CategoryExamData) => {
      handleAddItem(request);
      setNewRequestName("");
    },
    [handleAddItem],
  );

  const onAddRequest = useCallback(
    (request: Schemas.CategoryExamData) => {
      if (request && request.code !== undefined) {
        handleAddRequest(request);
      } else if (
        request &&
        request.code === undefined &&
        newRequestName !== ""
      ) {
        handleAddRequest({
          code: shortid(),
          categoryName: newRequestName,
          name: newRequestName,
        });
      }
    },
    [handleAddRequest, newRequestName],
  );

  const requests = useMemo<any[]>(() => {
    const tempRequest = [] as any[];
    // eslint-disable-next-line array-callback-return
    requestList.map((rqt) => {
      const index = tempRequest.findIndex(
        (tmpRequest) => rqt.code === tmpRequest.code,
      );
      if (index === -1) {
        tempRequest.push({ ...rqt, quantity: rqt.quantity });
      } else {
        tempRequest[index] = {
          ...tempRequest[index],
          amount: tempRequest[index].amount + 1,
        };
      }
    });
    return tempRequest;
  }, [requestList]);

  return (
    <div className={classes.container}>
      {showTitle && (
        <Typography className={classes.diagnosisTitleStyle}>
          {STRINGS.buttonGrid.REQUESTS}
        </Typography>
      )}
      <CardLayout className={classes.content}>
        <div id="search-container" className={classes.seeker}>
          <Autocomplete
            loading={loadingCategories}
            options={searchResult}
            // eslint-disable-next-line no-confusing-arrow
            getOptionLabel={(option: Schemas.CategoryExamData) =>
              // eslint-disable-next-line no-nested-ternary
              option.code
                ? option.code !== option.name
                  ? `( ${option.code || "-"} ) ${option.name || ""} `
                  : `${option.name || ""}`
                : ""
            }
            filterOptions={filterOptions}
            freeSolo
            autoComplete={false}
            onChange={onAddRequest}
            renderInitialOption={() => (
              <NoOptionMatchItem
                item={{ label: newRequestName, value: newRequestName }}
              />
            )}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.buttonGrid.SEARCH_REQUESTS,
              onChange: (e) => {
                setNewRequestName(e.target.value);
              },
            }}
            onDebounce={onDebounceSearchCallBack}
            disabled={readOnly}
          />
        </div>
        {requests.length <= 0 ? (
          <NoItemToShow value="pedido" />
        ) : (
          requests.map((requestItem, index) => (
            <ItemRequest
              index={index}
              key={index}
              label={requestItem.description || ""}
              notes={requestItem.notes || ""}
              code={requestItem.examCode || ""}
              onChangeNotes={onChangeNotes}
              onDelete={() => handleDeleteItem(requestItem.code || "")}
              handleOnRequestQuantityChange={handleOnRequestQuantityChange}
              quantity={requestItem.quantity}
              readOnly={readOnly}
            />
          ))
        )}
      </CardLayout>
    </div>
  );
}
