import React from "react";
import STRINGS from "../../../utils/strings";
import LabeledDialog from "../../dialogs/LabeledDialog";
import ServiceForm from "./ServiceForm";

interface Props {
  open: boolean;
  creatingService: boolean;
  initialValues: Schemas.ProfessionalProductRequest;
  handleShow: () => void;
  handleOnAddService: (request: Schemas.ProfessionalProductRequest) => void;
}

export default function NewEditServiceDialog({
  open,
  creatingService,
  initialValues,
  handleShow,
  handleOnAddService,
}: Props) {
  return (
    <LabeledDialog
      open={open}
      label={STRINGS.service.NEW_SERVICE}
      handleShow={handleShow}
      actionPanel={<div />}>
      <ServiceForm
        initialValues={initialValues}
        addingService={creatingService}
        handleOnConfirm={handleOnAddService}
        handleOnOpenModal={handleShow}
      />
    </LabeledDialog>
  );
}
