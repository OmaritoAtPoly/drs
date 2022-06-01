import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import BadgedButton from "../../buttons/BadgedButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(1),
    },
    boldFont: {
      fontWeight: "bold",
    },
  }),
);

interface Props {
  index: number;
  service: Schemas.ProfessionalProductData;
  handleOnDelete: (service: Schemas.ProfessionalProductData) => void;
}

export default function ServiceItem({ index, service, handleOnDelete }: Props) {
  const classes = useStyles();

  const handleDelete = useCallback(() => {
    handleOnDelete(service);
  }, [handleOnDelete, service]);

  return (
    <div className={classes.container}>
      <Typography className={classes.boldFont}>{index}</Typography>
      <Typography className={classes.boldFont}>{service.name}</Typography>
      <Typography className={classes.boldFont}>
        {`$ ${service.basePrice}`}
      </Typography>
      <BadgedButton iconName="delete" onClick={handleDelete} />
    </div>
  );
}
