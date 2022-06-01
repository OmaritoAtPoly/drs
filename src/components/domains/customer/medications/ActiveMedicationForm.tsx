import { List, makeStyles } from "@material-ui/core";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  FormikProvider,
  useFormik,
} from "formik";
import moment from "moment";
import React from "react";
import ActiveMedicationItemContainer from "../../../../containers/customer/medications/ActiveMedicationItemContainer";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import { ItemType } from "../../../inputs/Search/Search";
import MedicationCatalogSearch from "./MedicationCatalogSearch";

const styles = makeStyles((theme) => ({
  searchContainer: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  actionsButtons: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    backgroundColor: theme.palette.common.white,
  },
  listContainer: {
    height: "320px",
    overflow: "auto",
  },
  listContent: {
    marginBottom: theme.spacing(15),
  },
}));

interface Props {
  updatingList: boolean;
  medicationList: Schemas.CustomerMedicationData[];
  handleOnUpdateList: (
    medicationList: Schemas.CustomerMedicationData[],
  ) => void;
  handleMode: () => void;
}

export default function ActiveMedicationForm({
  updatingList,
  medicationList,
  handleOnUpdateList,
  handleMode,
}: Props) {
  const classes = styles();

  const formik = useFormik({
    initialValues: {
      medicationList,
    },
    onSubmit: (val) => {
      handleOnUpdateList(val.medicationList);
    },
  });

  const { values, setFieldValue } = formik;

  const handleOnAddMedication = (pickedOption: ItemType) => {
    const optionList = values.medicationList;
    optionList.unshift({
      code: pickedOption.value,
      currentIllness: [],
      diagnoses: [],
      medicine: pickedOption.label,
      fromDate: {
        dateDay: moment().date(),
        dateMonth: moment().month() + 1,
        dateYear: moment().year(),
      },
    });
    setFieldValue("medicationList", optionList);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className={classes.searchContainer}>
          <MedicationCatalogSearch onPickedOption={handleOnAddMedication} />
        </div>
        <FieldArray
          name="medicationList"
          render={({ remove }: FieldArrayRenderProps) => (
            <div className={classes.listContainer}>
              <List className={classes.listContent}>
                {values.medicationList.map((medication, index: number) => (
                  <ActiveMedicationItemContainer
                    index={index}
                    fieldName="medicationList"
                    editMode
                    medication={medication}
                    remove={remove}
                  />
                ))}
              </List>
            </div>
          )}
        />
        <div className={classes.actionsButtons}>
          <PrimaryButton
            label={STRINGS.generals.CANCEL}
            variant="text"
            color="primary"
            onClick={handleMode}
          />
          <PrimaryButton
            label={STRINGS.generals.SAVE}
            type="submit"
            variant="contained"
            color="primary"
            disabled={updatingList}
            loading={updatingList}
          />
        </div>
      </Form>
    </FormikProvider>
  );
}
