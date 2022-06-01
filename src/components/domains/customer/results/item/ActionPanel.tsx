import { makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import PrimaryButton from "../../../../buttons/PrimaryButton";

const styles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    margin: theme.spacing(1),
  },
  content: {
    display: "flex",
  },
  iconButton: {
    height: theme.spacing(5),
  },
  iconContainer: {
    display: "flex",
  },
  label: {
    color: theme.palette.common.white,
  },
  buttonIcon: {
    margin: 4,
  },
  button: {
    backgroundColor: "#F41616",
  },
  classNameWrapper: {
    margin: 0,
  },
}));

interface Props {
  visited?: boolean;
  handleOnPrintClicked: () => void;
  handleSendEmail: () => void;
  loadingSendEmail?: boolean;
  loadingResultPdf?: boolean;
  handleInform?: () => void;
  loadingHandleInform?: boolean;
  handleDeleteResult: () => void;
  loadingDeleteResult?: boolean;
  onRequestClick?: () => void;
  handleDuplicateRequest?: () => void;
  handlePatientCellClicked?: () => void;
  handleEditResult: () => void;
  loadingSendingCell?: boolean;
  editable: boolean;
}

export default function ActionPanel({
  visited,
  handleInform,
  loadingHandleInform,
  loadingResultPdf,
  loadingSendEmail,
  handleSendEmail,
  handleOnPrintClicked,
  handleDeleteResult,
  loadingDeleteResult = false,
  onRequestClick,
  handleDuplicateRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlePatientCellClicked,
  handleEditResult,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadingSendingCell = false,
  editable,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      {handleInform && (
        <PrimaryButton
          className={classes.button}
          labelClassName={classes.label}
          label={STRINGS.generals.LOW_RESULTS}
          iconColor="white"
          variant="contained"
          size="small"
          iconName="openLetter"
          onClick={handleInform}
          loading={loadingHandleInform}
          disabled={loadingHandleInform}
        />
      )}
      <div className={classes.content}>
        {editable && (
          <BadgedButton
            iconName="edit"
            onClick={handleEditResult}
            iconWidth={15}
            iconHeight={15}
            containerStyle={classes.buttonIcon}
            classNameWrapper={classes.classNameWrapper}
            toolTip={STRINGS.generals.EDIT}
          />
        )}
        {visited && (
          <>
            {/* TODO: Implement the openEyes and duplicate icons  */}
            {onRequestClick && (
              <BadgedButton
                iconName="openEye"
                onClick={onRequestClick}
                iconWidth={15}
                iconHeight={15}
                containerStyle={classes.button}
                classNameWrapper={classes.classNameWrapper}
              />
            )}
            {handleDuplicateRequest && (
              <BadgedButton
                iconName="duplicate"
                onClick={handleDuplicateRequest}
                iconWidth={15}
                iconHeight={15}
                containerStyle={classes.buttonIcon}
                classNameWrapper={classes.classNameWrapper}
                toolTip={STRINGS.generals.DUPLICATE_REQUEST}
              />
            )}
            {/* TODO show when patient app was made it */}
            {/* {handlePatientCellClicked && (
              <BadgedButton
                iconName="cellLogo"
                onClick={handlePatientCellClicked}
                iconWidth={15}
                iconHeight={15}
                loading={loadingSendingCell}
                containerStyle={classes.buttonIcon}
                classNameWrapper={classes.classNameWrapper}
              />
            )} */}
            {handleSendEmail && (
              <BadgedButton
                iconName="mail"
                onClick={handleSendEmail}
                iconWidth={15}
                iconHeight={15}
                loading={loadingSendEmail}
                containerStyle={classes.buttonIcon}
                classNameWrapper={classes.classNameWrapper}
                disabled={loadingSendEmail}
              />
            )}
            {!handleInform && handleOnPrintClicked && (
              <BadgedButton
                iconName="print"
                onClick={handleOnPrintClicked}
                iconWidth={15}
                iconHeight={15}
                loading={loadingResultPdf}
                containerStyle={classes.buttonIcon}
                classNameWrapper={classes.classNameWrapper}
                disabled={loadingResultPdf}
              />
            )}
          </>
        )}
        <BadgedButton
          loading={loadingDeleteResult}
          iconName="delete"
          iconWidth={15}
          iconHeight={15}
          onClick={handleDeleteResult}
          containerStyle={classes.buttonIcon}
          classNameWrapper={classes.classNameWrapper}
          disabled={loadingDeleteResult}
        />
      </div>
    </div>
  );
}
