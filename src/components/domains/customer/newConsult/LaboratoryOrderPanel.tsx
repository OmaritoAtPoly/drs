import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import LaboratoryPanelContainer from "../request/laboratory/panels/LaboratoryPanelContainer";
import RequestPanelContainer from "../request/requestPanel/RequestPanelContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroup: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: "#828282",
    },
    cardStyle: {
      marginLeft: theme.spacing(0.4),
    },
    bodyCardStyle: {
      display: "flex",
      flexDirection: "row",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    panel: {
      marginLeft: theme.spacing(2),
    },
    panelContainer: {
      paddingTop: 40,
      minWidth: "50%",
    },
    panelContainerWitAll: {
      paddingTop: 40,
      minWidth: "100%",
    },
  }),
);

interface Props {
  laboratoryOrder: Schemas.LaboratoryRequestItemRequest[] | undefined;
  loadingCategories: boolean;
  handleAddRequestItem: (value: Schemas.CategoryExamData) => void;
  handleOnRequestNotesChange: (index: number, notes: string) => void;
  handleDeleteRequest: (code: string) => void;
  onDebounceSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  examList?: Schemas.CategoryExamData[] | undefined;
  handleAddRequestItemFromModal: (
    categories: Schemas.CategoryExamData[],
  ) => void;
  readOnly?: boolean;
  handleOnRequestQuantityChange:(index: number, value: string) => void;
}

const LaboratoryOrderPanel = ({
  laboratoryOrder,
  loadingCategories,
  handleAddRequestItem,
  handleOnRequestNotesChange,
  handleDeleteRequest,
  onDebounceSearch,
  examList,
  handleAddRequestItemFromModal,
  readOnly = false,
  handleOnRequestQuantityChange,
}: Props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.bodyCardStyle}>
        <div
          className={
            readOnly ? classes.panelContainerWitAll : classes.panelContainer
          }>
          <RequestPanelContainer
            loadingCategories={loadingCategories}
            requestList={laboratoryOrder}
            onAddRequest={handleAddRequestItem}
            onChangeRequestNotes={handleOnRequestNotesChange}
            onDeleteRequest={handleDeleteRequest}
            onDebounceSearch={onDebounceSearch}
            categoryResults={examList}
            showTitle={false}
            readOnly={readOnly}
            handleOnRequestQuantityChange={handleOnRequestQuantityChange}
          />
        </div>
        {!readOnly && (
          <div className={classes.panel}>
            <LaboratoryPanelContainer
              handleAddRequestItemFromModal={handleAddRequestItemFromModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default LaboratoryOrderPanel;
