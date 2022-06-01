import { makeStyles } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import InviteProfessionalForm from "./InviteForm";

interface Props {
  visible: boolean,
  handleShow: () => void;
  loading?: boolean;
  handleInvitation: (value: Schemas.EmailsNameRequest) => void;
}
const useStyles = makeStyles({
  root: {
    minWidth: "30%",
    minHeight: "30%",
  },
},
);

const InviteDialog = ({ visible, handleShow, loading, handleInvitation }: Props) => {
  const classes = useStyles();

  return (
    <div id="id-invite-dr-dialog" className={classes.root}>
      <LabeledDialog
        rootClassName={classes.root}
        actionPanel={<span />}
        handleShow={handleShow}
        open={visible}
        label={STRINGS.generals.INVITE_OTHERS}
      >
        <InviteProfessionalForm handleSubmitForm={handleInvitation} loading={loading} />
      </LabeledDialog>
    </div>
  );
};

export default InviteDialog;
