import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
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
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  imageOrder: Schemas.ImageRequestItemRequest[] | undefined;
  loadingCategoriesImage: boolean;
  handleAddRequestItemImage: (value: Schemas.CategoryExamData) => void;
  handleOnRequestNotesChangeImage: (index: number, notes: string) => void;
  handleDeleteRequestImage: (code: string) => void;
  onDebounceSearchImage: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  examListImage?: Schemas.CategoryExamData[] | undefined;
  readOnly?: boolean;
  handleOnRequestQuantityChange?: (index: number, quantity: string) => void;
}

const ImageOrderPanel = ({
  imageOrder,
  loadingCategoriesImage,
  handleAddRequestItemImage,
  handleOnRequestNotesChangeImage,
  handleDeleteRequestImage,
  onDebounceSearchImage,
  examListImage,
  readOnly = false,
  handleOnRequestQuantityChange,
}: Props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.bodyCardStyle}>
        <RequestPanelContainer
          loadingCategories={loadingCategoriesImage}
          requestList={imageOrder}
          onAddRequest={handleAddRequestItemImage}
          onChangeRequestNotes={handleOnRequestNotesChangeImage}
          onDeleteRequest={handleDeleteRequestImage}
          onDebounceSearch={onDebounceSearchImage}
          categoryResults={examListImage}
          showTitle={false}
          readOnly={readOnly}
          handleOnRequestQuantityChange={handleOnRequestQuantityChange}
        />
      </div>
    </div>
  );
};
export default ImageOrderPanel;
