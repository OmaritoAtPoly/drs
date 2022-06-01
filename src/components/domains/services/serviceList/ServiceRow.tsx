import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Switch,
} from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    shortColumn: {
      width: "10%",
      padding: 2,
    },
    largeColumn: {
      width: "20%",
      padding: 2,
    },
    flex: { display: "flex" },
    center: { alignSelf: "center" },
    centerItems: { alignItems: "center" },
  }),
);

interface Props {
  service: Schemas.ProfessionalProductData;
  iconWidth?: number;
  iconHeight?: number;
  handleOnEdit: (
    service: Schemas.ProfessionalProductData,
    active?: boolean,
  ) => void;
  handleOnDelete: (service: Schemas.ProfessionalProductData) => void;
}

export default function ServiceRow({
  service,
  iconWidth = 18,
  iconHeight = 18,
  handleOnEdit,
  handleOnDelete,
  id,
}: Props & { id?: string }) {
  const classes = useStyles();
  const [showAction, setShowAction] = useState(false);
  const [active, setActive] = useState(service.enabled);

  const handleEdit = useCallback(() => {
    handleOnEdit(service);
  }, [handleOnEdit, service]);

  const handleDelete = useCallback(() => {
    handleOnDelete(service);
  }, [handleOnDelete, service]);

  const handleOnActive = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setActive(event.target.checked);
      handleOnEdit(
        { ...service, enabled: event.target.checked },
        event.target.checked,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleOnEdit, service],
  );

  const hoverComponent = useMemo(
    () => (
      <div className={classes.flex}>
        <div>
          <BadgedButton
            iconName="edit"
            circular
            iconWidth={iconWidth}
            iconHeight={iconHeight}
            toolTip={STRINGS.generals.EDIT}
            onClick={handleEdit}
          />
          <BadgedButton
            iconName="delete"
            circular
            iconWidth={iconWidth}
            iconHeight={iconHeight}
            onClick={handleDelete}
          />
        </div>
      </div>
    ),
    [classes.flex, handleDelete, handleEdit, iconHeight, iconWidth],
  );

  return (
    <ListItem
      key={id}
      onClick={() => {}}
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
      button
      alignItems="flex-start"
      className={`${classes.flex} ${classes.centerItems}`}>
      <div
        className={`${classes.largeColumn} ${classes.flex} ${classes.centerItems}`}>
        <ListItemText
          classes={{ root: classes.center }}
          primary={service.name}
        />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText primary={service.code} />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText primary={service.taxPercent} />
      </div>
      <div className={classes.shortColumn}>
        <ListItemText primary={service.basePrice} />
      </div>
      <div className={`${classes.largeColumn}`}>
        <ListItemText primary={service.description} />
      </div>
      <div className={classes.shortColumn}>
        <Switch
          checked={active}
          onChange={handleOnActive}
          name="enabled"
          color="primary"
        />
      </div>
      {showAction && (
        <div className={`${classes.shortColumn}`}>{hoverComponent}</div>
      )}
    </ListItem>
  );
}
