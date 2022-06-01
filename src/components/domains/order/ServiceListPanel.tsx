import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import ServiceItem from "./ServiceItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(2),
      width: "100%",
    },
  }),
);

interface Props {
  loading: boolean;
  services: Schemas.ProfessionalProductData[];
  handleDeleteService: (service: Schemas.ProfessionalProductData) => void;
}

export default function ServiceListPanel({
  loading,
  services,
  handleDeleteService,
}: Props) {
  const classes = useStyles();
  return loading ? (
    <div className={classes.container}>
      <CircularProgress size={25} />
    </div>
  ) : (
    <div>
      {services.map((service, index) => (
        <ServiceItem
          key={service.code}
          index={index + 1}
          service={service}
          handleOnDelete={() => handleDeleteService(service)}
        />
      ))}
    </div>
  );
}
