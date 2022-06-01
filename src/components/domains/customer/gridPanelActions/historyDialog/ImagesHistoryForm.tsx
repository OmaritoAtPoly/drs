import { makeStyles, Typography } from "@material-ui/core";
import { FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import { fullName } from "../../../../../utils/user";
import BoldText from "../../../../label/BoldText";
import ButtonPanel from "./ButtonPanel";

type HistoryItemType = {
  date: Schemas.DateTimeObject;
  patient: Schemas.CustomerData;
  diagnoses: string;
  request: string;
};

interface Props {
  handleClose: () => void;
  imagesHistory: HistoryItemType[];
}

const styles = makeStyles({
  contentStyle: {
    display: "flex",
    paddingLeft: "20px",
    paddingBlock: "10px",
  },
  indexStyle: {
    paddingRight: "10px",
  },
  subtitleStyle: {
    display: "flex",
    flexDirection: "row",
  },
});

const ImagesHistoryForm = ({ handleClose, imagesHistory }: Props) => {
  const classes = styles();
  return (
    <Formik
      initialValues={{
        imagesHistory,
      }}
      onSubmit={() => {
        handleClose(); // todo change this line by the correct
      }}
      render={({ values }) => (
        <Form>
          <FieldArray
            name="imagesHistory"
            render={({ remove }: FieldArrayRenderProps) => {
              const handleRemove = (index: number) => {
                remove(index);
              };
              return (
                <div>
                  {values.imagesHistory &&
                    values.imagesHistory.map((a, ind) => {
                      const key = Math.random();
                      return (
                        <div key={key}>
                          <div
                            className={classes.contentStyle}
                            id="history-content">
                            <Typography className={classes.indexStyle}>
                              {ind + 1}
                            </Typography>
                            <span>
                              <div className={classes.subtitleStyle}>
                                <BoldText label={STRINGS.historical.DATE} />
                                <Typography>{`${a.date.dateDay}/${a.date.dateMonth}/${a.date.dateYear}`}</Typography>
                              </div>
                              <div className={classes.subtitleStyle}>
                                <BoldText label={STRINGS.historical.TIME} />
                                <Typography>{`${a.date.timeHour}:${a.date.timeMinute}`}</Typography>
                              </div>
                              <div className={classes.subtitleStyle}>
                                <BoldText
                                  label={STRINGS.historical.PATIENT_NAME}
                                />
                                <Typography>{fullName(a.patient)}</Typography>
                              </div>
                              <div className={classes.subtitleStyle}>
                                <BoldText
                                  label={STRINGS.historical.DIAGNOSES}
                                />
                                <Typography>{a.diagnoses}</Typography>
                              </div>
                              <div className={classes.subtitleStyle}>
                                <BoldText
                                  label={STRINGS.historical.LOWER_REQUEST}
                                />
                                <Typography>{a.request}</Typography>
                              </div>
                              <ButtonPanel
                                handleRemove={handleRemove}
                                index={ind}
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            }}
          />
        </Form>
      )}
    />
  );
};

export default ImagesHistoryForm;
