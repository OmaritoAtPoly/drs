import { List, makeStyles, TextareaAutosize, Theme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import { Field, FieldArray, FieldProps } from "formik";
import React, { useCallback } from "react";
import { defaultStyleTextArea } from "../../../../../utils/defaultData";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import Autocomplete from "../../../../inputs/Search/Autocomplete";

const styles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  content: {
    display: "flex",
  },
  leftColumn: {
    marginRight: theme.spacing(2),
    display: "flex",
    minWidth: "200px",
  },
  listContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 0,
  },
  itemList: {
    marginBottom: theme.spacing(1),
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    height: theme.spacing(5),
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  selector: { width: "100%" },
}));

interface Props {
  pathologicalItem: Schemas.CustomerFamilyPathologiesData;
  familyParents: string[];
  fieldName: string;
  index: number;
  handleAddPathology: (index: number, pathology: string) => void;
  handleRemovePathology: (parentIndex: number, childIndex: number) => void;
  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  enabled: boolean;
}

export default function PathologicalBackgroundEditModeItem({
  pathologicalItem,
  familyParents,
  fieldName,
  index,
  setFieldValue,
  handleAddPathology,
  handleRemovePathology,
  handleRemove,
  enabled,
}: Props) {
  const classes = styles();

  const handlePicked = (value: string) => {
    setFieldValue(`${fieldName}[${index}].familyMember`, value);
  };

  const onRemove = useCallback(() => {
    handleRemove(index);
  }, [handleRemove, index]);

  const familyFilterOptions = createFilterOptions({
    stringify: (option: string) => option,
  });

  return (
    <div className={classes.content}>
      <div className={classes.leftColumn}>
        <BadgedButton onClick={onRemove} iconName="delete" />
        <Field name={`${fieldName}[${index}].familyMember`}>
          {({ field }: FieldProps) => (
            <Autocomplete
              className={classes.selector}
              options={familyParents}
              getOptionLabel={(option: string) => option}
              filterOptions={familyFilterOptions}
              freeSolo={false}
              notIcon
              autoComplete={false}
              value={field.value}
              onChange={handlePicked}
              inputProps={{
                autoComplete: "off",
                placeholder: STRINGS.background.FAMILY_MEMBER,
              }}
            />
          )}
        </Field>
      </div>
      <FieldArray
        name={`${fieldName}[${index}].pathologies`}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={() => {
          const addPathology = () => {
            handleAddPathology(index, "");
          };
          const removeItem = (indx: number) => {
            handleRemovePathology(index, indx);
          };
          return (
            <div className={classes.listContainer}>
              <List className={classes.list}>
                {pathologicalItem &&
                  pathologicalItem.pathologies &&
                  pathologicalItem.pathologies.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (pathology, ind: number) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={ind} className={classes.itemContainer}>
                        <Field
                          name={`${fieldName}[${index}].pathologies[${ind}]`}>
                          {({ field }: FieldProps) => (
                            <div className={classes.itemList}>
                              <TextareaAutosize
                                className={classes.input}
                                style={defaultStyleTextArea}
                                placeholder="Patología"
                                {...field}
                                rowsMax={4}
                                disabled={enabled}
                              />
                            </div>
                          )}
                        </Field>
                        {ind > 0 ? (
                          <BadgedButton
                            onClick={() => removeItem(ind)}
                            iconName="delete"
                          />
                        ) : (
                          <BadgedButton onClick={addPathology} iconName="add" />
                        )}
                      </div>
                    ),
                  )}
              </List>
            </div>
          );
        }}
      />
    </div>
  );
}
