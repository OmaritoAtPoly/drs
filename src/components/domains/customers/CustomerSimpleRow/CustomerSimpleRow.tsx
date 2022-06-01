/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useCallback, useMemo, useState } from "react";
import NewConsultDialogContainer from "../../../../containers/customer/newConsult/NewConsultDialogContainer";
import STRINGS from "../../../../utils/strings";
import { ValueAndLabelType } from "../../../../utils/types";
import {
  age,
  fullName,
  getCityName,
  getGenderLabel,
  mainPhonesOrDefault,
} from "../../../../utils/user";
import Avatar from "../../../Avatar";
import BadgedButton from "../../../buttons/BadgedButton";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    inline: {
      display: "inline",
    },
    shortColumn: {
      width: "10%",
      padding: 2,
    },
    largeColumn: {
      width: "20%",
      padding: 2,
    },
    avatarContainer: {
      marginTop: 0,
    },
    avatar: {
      width: "50px",
      height: "50px",
    },
    flex: { display: "flex" },
    min: { minWidth: 100 },
    center: { alignSelf: "center" },
    centerItems: { alignItems: "center" },
  }),
);

interface Props {
  customer: Schemas.CustomerData;
  onClick?: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  handleAdd?: (customer: Schemas.CustomerData) => void;
  onBegin?: (reason: string[]) => void;
  alwaysShort?: boolean;
  alwaysShowAction?: boolean;
  hideDeleteIcon?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  showOnlyName?: boolean;
  gendersOptions: ValueAndLabelType[];
}

const CustomerSimpleRow = ({
  customer,
  onClick = () => {},
  handleEdit,
  handleDelete,
  handleAdd,
  alwaysShort = false,
  alwaysShowAction = false,
  iconWidth,
  iconHeight,
  hideDeleteIcon = false,
  showOnlyName = false,
  onBegin = () => {},
  id,
  gendersOptions,
}: Props & { id?: string }) => {
  const classes = useStyles();
  const [showAction, setShowAction] = useState(false);
  const [showNewConsultDialog, setShowNewConsultDialog] = useState(false);

  const handleShowNewConsultDialog = useCallback(() => {
    setShowNewConsultDialog(!showNewConsultDialog);
  }, [showNewConsultDialog]);

  const largeDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md"),
  );

  const preventDefault = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const handleShowNewConsultDialogCallBack = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      preventDefault(e);
      if (handleAdd) {
        handleAdd(customer);
        return;
      }
      handleShowNewConsultDialog();
    },
    [customer, handleAdd, handleShowNewConsultDialog],
  );

  const handleEditCallBack = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      preventDefault(e);
      handleEdit();
    },
    [handleEdit],
  );

  const handleDeleteCallBack = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      preventDefault(e);
      handleDelete();
    },
    [handleDelete],
  );

  const hoverComponent = useMemo(
    () => (
      <div className={classes.flex}>
        <div>
          <BadgedButton
            iconName="add"
            circular
            onClick={handleShowNewConsultDialogCallBack}
            iconWidth={iconWidth || 18}
            iconHeight={iconHeight || 18}
            toolTip={STRINGS.generals.NEW_APPOINTMENT}
          />
        </div>
        <div>
          <BadgedButton
            iconName="edit"
            circular
            onClick={handleEditCallBack}
            iconWidth={iconWidth || 18}
            iconHeight={iconHeight || 18}
            toolTip={STRINGS.generals.EDIT}
          />
          {!hideDeleteIcon && (
            <BadgedButton
              iconName="delete"
              circular
              iconWidth={iconWidth || 18}
              iconHeight={iconHeight || 18}
              onClick={handleDeleteCallBack}
            />
          )}
        </div>
      </div>
    ),
    [
      classes.flex,
      handleDeleteCallBack,
      handleEditCallBack,
      handleShowNewConsultDialogCallBack,
      hideDeleteIcon,
      iconHeight,
      iconWidth,
    ],
  );

  // TODO: add city in api and patient app
  const rowInLagerDevice = useMemo(
    () => (
      <ListItem
        onClick={onClick}
        onMouseEnter={() => setShowAction(true)}
        onMouseLeave={() => setShowAction(false)}
        button
        alignItems="flex-start"
        className={`${classes.flex} ${classes.centerItems}`}>
        <div
          className={`${classes.largeColumn} ${classes.flex} ${classes.centerItems}`}>
          <ListItemAvatar className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              alt={STRINGS.generals.IMAGE}
              src={customer.avatarUrl}
            />
          </ListItemAvatar>
          <ListItemText
            classes={{ root: classes.center }}
            primary={fullName(customer)}
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={
              !!customer.birthdateYear &&
              `${age(customer).years} ${
                age(customer).years
                  ? STRINGS.generals.YEARS
                  : STRINGS.generals.YEAR
              }`
            }
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={getGenderLabel(gendersOptions, customer.gender)}
          />
        </div>
        <div className={classes.largeColumn}>
          <ListItemText primary={customer.email} />
        </div>
        <div className={`${classes.largeColumn} ${classes.min}`}>
          <ListItemText primary={mainPhonesOrDefault("MOBILE", customer)} />
        </div>
        <div className={`${classes.shortColumn} ${classes.min}`}>
          <Link
            href="https://servicios.registrocivil.gob.ec/cdd/"
            onClick={preventDefault}>
            <ListItemText primary={customer.legalID} />
          </Link>
        </div>
        <div className={classes.shortColumn}>
          <ListItemText primary={getCityName(customer) || ""} />
        </div>
        <div className={`${classes.shortColumn}`}>
          {(showAction || alwaysShowAction) && hoverComponent}
        </div>
      </ListItem>
    ),
    [
      alwaysShowAction,
      classes.avatar,
      classes.avatarContainer,
      classes.center,
      classes.centerItems,
      classes.flex,
      classes.largeColumn,
      classes.min,
      classes.shortColumn,
      customer,
      gendersOptions,
      hoverComponent,
      onClick,
      showAction,
    ],
  );

  return (
    <div key={id} className={classes.container}>
      {(!largeDevice || alwaysShort) && (
        <ListItem
          id="list-item-short-device"
          onClick={onClick}
          onMouseEnter={() => setShowAction(true)}
          onMouseLeave={() => setShowAction(false)}
          button
          alignItems="flex-start">
          {!showOnlyName && (
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt={STRINGS.generals.IMAGE}
                src={customer.avatarUrl}
              />
            </ListItemAvatar>
          )}
          <ListItemText
            className={showOnlyName ? classes.center : ""}
            primary={fullName(customer)}
            secondary={
              <>
                {!showOnlyName && (
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary">
                    <Link
                      href="https://servicios.registrocivil.gob.ec/cdd/"
                      onClick={preventDefault}>
                      {`${STRINGS.patientInfo.CI}: ${customer.legalID}`}
                    </Link>
                  </Typography>
                )}
              </>
            }
          />
          {(showAction || alwaysShowAction) && hoverComponent}
        </ListItem>
      )}
      {!alwaysShort && largeDevice && rowInLagerDevice}
      <NewConsultDialogContainer
        open={showNewConsultDialog}
        handleShow={handleShowNewConsultDialog}
        onBegin={onBegin}
      />
    </div>
  );
};

export default CustomerSimpleRow;
