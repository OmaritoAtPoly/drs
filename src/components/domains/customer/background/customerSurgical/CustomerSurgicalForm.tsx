import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  FormikProvider,
  useFormik,
} from "formik";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import PrimaryButton from "../../../../buttons/PrimaryButton";
import NotReferPanel from "../NotReferPanel";
import CustomerSurgicalBackgroundItem from "./CustomerSurgicalBackgroundItem";

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  headSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: theme.spacing(29),
    marginBottom: theme.spacing(2),
  },
  spacerLoading: {
    marginTop: 10,
  },
}));

interface Props {
  mode: boolean;
  referSurgicalText: string;
  customerSurgical: Schemas.CustomerSurgicalData;
  updatingSurgical: boolean;
  handleMode: () => void;
  handleUpdateSurgical: (value: Schemas.CustomerSurgicalData) => void;
}

export default function CustomerSurgicalForm({
  mode,
  referSurgicalText,
  customerSurgical,
  updatingSurgical,
  handleMode,
  handleUpdateSurgical,
}: Props) {
  const classes = styles();

  const formik = useFormik({
    initialValues: { ...customerSurgical },
    onSubmit: (value) => {
      handleUpdateSurgical(value);
    },
  });

  const { values, setFieldValue } = formik;

  const handleOnAddFreeItem = () => {
    const surgicalItems = values.items;
    if (surgicalItems && !values.enabled) {
      const now = new Date();
      surgicalItems.push({
        notes: [],
        surgical: "",
        dateTime: {
          dateDay: now.getDay(),
          dateMonth: now.getMonth(),
          dateYear: now.getFullYear(),
        },
      });
    }
    setFieldValue("items", surgicalItems);
  };

  const handleOnCheck = () => {
    setFieldValue("enabled", !values.enabled);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className={classes.headSection}>
          <Typography className={classes.title}>
            {STRINGS.background.SURGICAL_BACKGROUND}
          </Typography>
          <BadgedButton
            onClick={handleOnAddFreeItem}
            iconName={
              mode || customerSurgical.items?.length === 0 ? "add" : "edit"
            }
          />
        </div>
        {mode && (
          <FormControlLabel
            control={
              <Checkbox
                checked={values.enabled}
                onChange={handleOnCheck}
                name="enable"
                color="primary"
              />
            }
            labelPlacement="start"
            label={referSurgicalText}
          />
        )}
        {values.enabled && !mode && <NotReferPanel label={referSurgicalText} />}
        {!values.enabled && (
          <FieldArray
            name="items"
            render={({ remove }: FieldArrayRenderProps) => {
              const handleRemove = (index: number) => {
                remove(index);
              };
              return (
                <div className={classes.content}>
                  {values.items &&
                    values.items.map(
                      (surgicalItem: Schemas.CustomerSurgicalItem, index) => (
                        <div className={classes.item}>
                          <CustomerSurgicalBackgroundItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            index={index}
                            handleRemove={handleRemove}
                            inputPlaceholder={
                              STRINGS.background.DESCRIBE_THE_SURGICAL
                            }
                            surgicalItem={surgicalItem}
                            setFieldValue={setFieldValue}
                            editMode={mode}
                            inputFieldNotes={`items[${index}].notes`}
                            inputFieldName={`items[${index}].surgical`}
                            selectorFieldName={`items[${index}].dateTime`}
                            enabled={values.enabled || false}
                          />
                        </div>
                      ),
                    )}
                </div>
              );
            }}
          />
        )}
        {mode && (
          <div className={classes.actionSection}>
            <PrimaryButton
              label={STRINGS.generals.CANCEL}
              variant="text"
              color="primary"
              onClick={handleMode}
            />
            <PrimaryButton
              className={classes.saveButton}
              label={STRINGS.generals.SAVE}
              type="submit"
              variant="text"
              color="primary"
              loading={updatingSurgical}
              disabled={updatingSurgical}
            />
          </div>
        )}
      </Form>
    </FormikProvider>
  );
}
