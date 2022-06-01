import { Tooltip, TooltipProps, Typography } from "@material-ui/core";
import React, { PropsWithChildren, useRef } from "react";

interface Props {
  title?: string;
}

const WrapperToolTip = ({
  children,
  title = "",
  ...props
}: Props & PropsWithChildren<unknown> & TooltipProps) => {
  const ref = useRef();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      title={title}
      ref={ref}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      onClick={handleClose}
      {...props}>
      <Typography>{children}</Typography>
    </Tooltip>
  );
};

export default WrapperToolTip;
