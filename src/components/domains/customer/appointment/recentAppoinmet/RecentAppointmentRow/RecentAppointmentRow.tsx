/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import moment from "moment";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useCallback, useMemo, useState } from "react";
import NewConsultDialogContainer from "../../../../../../containers/customer/newConsult/NewConsultDialogContainer";
import STRINGS from "../../../../../../utils/strings";
import { fullName } from "../../../../../../utils/user";
import BadgedButton from "../../../../../buttons/BadgedButton";
import ConfirmModal from "../../../../../modals/ConfirmModal";
import { formatDate } from "../../../../../../utils/date";

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
    blue: {
      color: "#004AAD",
    },
    lightGreen: {
      color: "#7ED957",
    },
    lightBlue: {
      color: "#00C2CB",
    },
    red: {
      color: "#F41616",
    },
    flex: { display: "flex" },
    min: { minWidth: 100 },
    center: { alignSelf: "center" },
    centerItems: { alignItems: "center" },
    marginTop: { marginTop: 30 },
  }),
);

interface Props {
  appointment: Schemas.AppointmentData;
  onClick?: () => void;
  onBegin?: (reason: string[]) => void;
  alwaysShort?: boolean;
  alwaysShowAction?: boolean;
  hideDeleteIcon?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  showOnlyName?: boolean;
  handleOnConfirmDelete: (code: string) => void;
  loadingDelete?: boolean;
  handleEditCallBack: () => void;
  handleAdd: () => void;
}

const RecentAppointmentRow = ({
  appointment,
  onClick = () => {},
  handleAdd,
  alwaysShort = false,
  alwaysShowAction = false,
  iconWidth,
  iconHeight,
  hideDeleteIcon = false,
  showOnlyName = false,
  onBegin = () => {},
  id,
  handleOnConfirmDelete,
  loadingDelete = false,

  handleEditCallBack,
}: Props & { id?: string }) => {
  const classes = useStyles();
  const [showAction, setShowAction] = useState(false);
  const [showNewConsultDialog, setShowNewConsultDialog] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleShowNewConsultDialog = useCallback(() => {
    setShowNewConsultDialog(!showNewConsultDialog);
  }, [showNewConsultDialog]);

  const handleShow = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const largeDevice = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md"),
  );

  const handleConfirm = useCallback(() => {
    handleOnConfirmDelete(appointment.code || "");
    handleShow();
  }, [appointment.code, handleOnConfirmDelete, handleShow]);

  const handleOnDelete = useCallback(() => {
    handleShow();
  }, [handleShow]);

  const hoverComponent = useMemo(
    () => (
      <div className={classes.flex}>
        <div>
          <BadgedButton
            iconName="add"
            circular
            onClick={handleAdd}
            iconWidth={iconWidth || 18}
            iconHeight={iconHeight || 18}
            toolTip={STRINGS.appointment.TO_JOINT_APPOINTMENT}
          />
        </div>
        <div>
          <BadgedButton
            iconName="info"
            circular
            onClick={handleEditCallBack}
            iconWidth={iconWidth || 18}
            iconHeight={iconHeight || 18}
            toolTip={STRINGS.appointment.INFORM_APPOINTMENT}
          />
          {!hideDeleteIcon && (
            <BadgedButton
              iconName="delete"
              circular
              iconWidth={iconWidth || 18}
              iconHeight={iconHeight || 18}
              onClick={handleOnDelete}
              loading={loadingDelete}
              toolTip={STRINGS.appointment.DELETE_APPOINTMENT}
            />
          )}
        </div>
      </div>
    ),
    [
      classes.flex,
      handleAdd,
      handleEditCallBack,
      handleOnDelete,
      hideDeleteIcon,
      iconHeight,
      iconWidth,
      loadingDelete,
    ],
  );

  const convertState = useMemo(() => {
    switch (appointment.state) {
      case "PAID":
        return {
          state: "Confirmado",
        };
      case "IN_PROGRESS":
        return {
          state: "En progreso",
        };
      case "PENDENT":
        return {
          state: "Pendiente",
        };
      case "CANCELED":
        return {
          state: "Cancelado",
        };
      case "COMPLETED":
        return {
          state: "Completado",
        };
      default:
        return {
          state: "Desconocido",
        };
    }
  }, [appointment.state]);

  const convertServiceCode = useMemo(() => {
    switch (appointment.serviceCode) {
      case "FACE_TO_FACE":
        return {
          modality: "Cita Presencial",
        };
      case "REMOTE":
        return {
          modality: "Cita Virtual",
        };
      case "REMOTE_EMERGENCY":
        return {
          modality: "Cita Virtual Emergencia",
        };
      default:
        return {
          modality: "Cita",
        };
    }
  }, [appointment.serviceCode]);

  const classNameColor = useMemo(() => {
    if (appointment.state === "IN_PROGRESS") {
      return {
        // aqui va en rojo
        color: classes.red,
      };
    }

    if (appointment.state === "PAID" || appointment.state === "PENDENT") {
      switch (appointment.serviceCode) {
        case "FACE_TO_FACE":
          return {
            color: classes.blue,
          };
        case "REMOTE":
          return {
            color: classes.lightGreen,
          };
        case "REMOTE_EMERGENCY":
          return {
            color: classes.lightGreen,
          };
        default:
          return {
            color: classes.lightGreen,
          };
      }
    }

    return {
      color: classes.lightGreen,
    };
  }, [
    appointment.serviceCode,
    appointment.state,
    classes.blue,
    classes.lightGreen,
    classes.red,
  ]);

  const rowInLagerDevice = useMemo(
    () => (
      <ListItem
        onClick={onClick}
        onMouseEnter={() => setShowAction(true)}
        onMouseLeave={() => setShowAction(false)}
        button
        alignItems="flex-start"
        className={`${classes.flex} ${classes.centerItems}`}>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={moment(
              new Date(
                appointment.from?.dateYear || 0,
                appointment.from?.dateMonth || 0 - 1,
                appointment.from?.dateDay || 0,
                appointment.from?.timeHour,
                appointment.from?.timeMinute,
              ),
            ).format(formatDate["hh:mm A"])}
          />
        </div>
        <div className={`${classes.shortColumn} ${classNameColor.color}`}>
          <ListItemText primary={convertServiceCode.modality} />
        </div>
        <div className={classes.largeColumn}>
          <ListItemText primary={fullName(appointment.customerData)} />
        </div>
        <div className={`${classes.largeColumn} ${classes.min}`}>
          <ListItemText primary={appointment.record?.reason} />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText primary={convertState.state} />
        </div>
        <div className={`${classes.largeColumn}`}>
          {(showAction || alwaysShowAction) && hoverComponent}
        </div>
      </ListItem>
    ),
    [
      alwaysShowAction,
      appointment.customerData,
      appointment?.from,
      appointment.record?.reason,
      classNameColor.color,
      classes.centerItems,
      classes.flex,
      classes.largeColumn,
      classes.min,
      classes.shortColumn,
      convertServiceCode.modality,
      convertState.state,
      hoverComponent,
      onClick,
      showAction,
    ],
  );

  return (
    <div key={id}>
      <div className={classes.container}>
        {(!largeDevice || alwaysShort) && (
          <ListItem
            id="list-item-short-device"
            onClick={onClick}
            onMouseEnter={() => setShowAction(true)}
            onMouseLeave={() => setShowAction(false)}
            button
            alignItems="flex-start">
            <div className={classes.shortColumn}>
              <ListItemText
                primary={`${appointment.from?.timeHour}:${appointment.from?.timeMinute}`}
              />
            </div>
            <ListItemText
              className={showOnlyName ? classes.center : ""}
              primary={fullName(appointment.customerData)}
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
      <ConfirmModal
        handleShow={handleShow}
        open={open}
        title={STRINGS.appointment.SURE_DELETE_APPOINTMENT}
        onConfirm={handleConfirm}
        confirmButtonText={STRINGS.generals.CONFIRM}
      />
    </div>
  );
};

export default RecentAppointmentRow;
