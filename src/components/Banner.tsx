import { makeStyles } from "@material-ui/core";
import React from "react";
import LoadingWrapper from "./LoadingWrapper";

interface StyleProps {
  url: string;
}

const useStyles = ({ url }: StyleProps) =>
  makeStyles({
    container: {
      margin: "0px",
      height: "100%",
    },
    img: {
      height: "100%",
      backgroundColor: "#fff",
      backgroundImage: `url(${url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  });

interface Props {
  url: string;
  loading: boolean;
}

export default function Banner({ url, loading }: Props) {
  const classes = useStyles({ url });
  return (
    <LoadingWrapper loading={loading} classNameContainer={classes().container}>
      <div className={classes().img} />
    </LoadingWrapper>
  );
}
