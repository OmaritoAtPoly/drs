import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import theme from "../../../../styles/theme";
import BadgedButton from "../../../buttons/BadgedButton";

const styles = makeStyles(() => ({
  container: {
    display: "flex",
    paddingBlock: theme.spacing(1),
    marginLeft: theme.spacing(2),
    alignItems: "center",
  },
  action: {
    display: "flex",
    marginLeft: theme.spacing(2),
  },
}));

interface Props {
  attachment: string;
  downloading?: boolean;
  deleting?: boolean;
  removable?: boolean;
  downloadable?: boolean;
  deleteAttachmentItem?: (name: string) => void;
  downloadAttachmentItem?: () => void;
}

export default function Attachment({
  attachment,
  downloading = false,
  deleting = false,
  removable = false,
  downloadable = false,
  deleteAttachmentItem = () => {},
  downloadAttachmentItem = () => {},
}: Props) {
  const classes = styles();
  const [currentAttachment, setCurrentAttachment] = useState("");

  const handleDelete = useCallback(() => {
    deleteAttachmentItem && deleteAttachmentItem(attachment);
    setCurrentAttachment(attachment);
  }, [deleteAttachmentItem, attachment]);

  const handleDownload = useCallback(() => {
    setCurrentAttachment(attachment);
    downloadAttachmentItem();
  }, [attachment, downloadAttachmentItem]);

  return (
    <div className={classes.container}>
      <Typography>{attachment}</Typography>
      <div className={classes.action}>
        {downloadable && (
          <BadgedButton
            onClick={handleDownload}
            iconName="print"
            iconWidth={theme.spacing(2)}
            iconHeight={theme.spacing(2)}
            loading={attachment === currentAttachment && downloading}
          />
        )}
        {removable && (
          <BadgedButton
            onClick={handleDelete}
            iconName="trash"
            iconWidth={theme.spacing(2)}
            iconHeight={theme.spacing(2)}
            fill={theme.palette.error.main}
            loading={attachment === currentAttachment && deleting}
          />
        )}
      </div>
    </div>
  );
}
