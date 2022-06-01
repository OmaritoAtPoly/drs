import {
  Divider,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";
import React, { useCallback } from "react";
import { useSearchRequestCacheSelector } from "../../../../modules/customer/request/cacheSelector";
import { useAddLastAlerts } from "../../../../modules/utils/error/handleError";
import { RequestType } from "../../../../utils/enums";
import { convertFileToBase64 } from "../../../../utils/file";
import STRINGS from "../../../../utils/strings";
import { ValueAndLabelType } from "../../../../utils/types";
import { fullName } from "../../../../utils/user";
import { requestType } from "../../../../utils/utils";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CardLayout from "../../../cards/CardLayout";
import DatePicker from "../../../inputs/DatePicker";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import InfiniteScrollList from "../../../lists/InfiniteScrollList";
import UploadFile from "../files/UploadFile";
import RequestItem from "../request/history/RequestItem";

// eslint-disable-next-line @typescript-eslint/no-shadow
const styles = makeStyles((theme: Theme) => ({
  flex: { display: "flex" },
  full: { width: "100%" },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  leftGroup: {
    display: "flex",
    width: "65%",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  fightGroup: {
    display: "flex",
    flexDirection: "column",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  date: {
    marginTop: theme.spacing(1.9),
    width: "100%",
  },
  field: {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginRight: 10,
  },
  autocompleteContainer: {
    marginTop: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
  },
  filterContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: 10,
    },
  },
  title: {
    color: theme.palette.primary.main,
  },
  divider: {
    marginRight: 20,
    backgroundColor: "#D6E3F3",
  },
  card: {
    minWidth: 275,
    cursor: "pointer",
    marginBottom: 10,
  },
}));

interface Props {
  initialValues: {
    requestType: RequestType;
    requestCode?: string;
    itemCode?: string;
  } & Schemas.ResultFileRequest;
  currentPatient?: Schemas.CustomerData;
  loadingNewResult?: boolean;
  handleAddResult: (
    value: {
      requestType?: RequestType;
      requestCode?: string;
      itemCode?: string;
    } & Omit<Schemas.ResultFileRequest, "requestType">,
  ) => void;
  handleShowAddResult: () => void;
}

export default function ResultFileForm({
  initialValues,
  currentPatient,
  loadingNewResult,
  handleAddResult,
  handleShowAddResult,
}: Props) {
  const classes = styles();
  const { addLastAlerts } = useAddLastAlerts();

  const validateForm = useCallback(
    (titleField?: string, fileField?: string) => {
      if (titleField === "" || titleField === undefined) {
        addLastAlerts({
          name: "",
          message: STRINGS.validation.TITLE_RESULT_REQUIRED,
          severity: "error",
        });
        return false;
      }
      if (fileField === "" || fileField === undefined) {
        addLastAlerts({
          name: "",
          message: STRINGS.validation.FILE_RESULT_ATTACHMENT_REQUIRED,
          severity: "error",
        });
        return false;
      }
      return true;
    },
    [addLastAlerts],
  );

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      result: initialValues,
      filters: {
        requestSelected: undefined as Schemas.RequestItem | undefined,
        requestType: requestType[1].value as RequestType,
        from: moment(new Date()).subtract(1, "months").toDate(),
        to: new Date(),
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onSubmit: (values, { resetForm }) => {
      if (!values.filters.requestSelected) {
        validateForm(values.result.title, values.result.base64) &&
          handleAddResult(values.result);
      } else {
        validateForm(values.result.title, values.result.base64) &&
          handleAddResult({
            ...values.result,
            requestType: values.filters.requestSelected
              .requestType as RequestType,
            requestCode: values.filters.requestSelected.requestCode,
            itemCode: values.filters.requestSelected.code,
          });
      }
      validateForm(values.result.title, values.result.base64) &&
        resetForm({
          result: initialValues,
          filters: {
            requestSelected: undefined as Schemas.RequestItem | undefined,
            requestType: "" as RequestType,
            from: moment(new Date()).subtract(1, "months").toDate(),
            to: new Date(),
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
    },
  });

  const {
    loading,
    items: requests,
    isFetchingMore,
  } = useSearchRequestCacheSelector({
    to: values.filters.to,
    from: values.filters.from,
    requestType: values.filters.requestType,
  });

  const onChangeRequestType = useCallback(
    (value?: ValueAndLabelType) => {
      setFieldValue(
        "filters.requestType",
        value ? value.value : undefined,
        true,
      );
    },
    [setFieldValue],
  );

  const handleDateChange = useCallback(
    (name: string) => (date?: Date) => {
      // eslint-disable-next-line no-useless-return
      if (!date) return;
      setFieldValue(`filters.${name}`, date, true);
    },
    [setFieldValue],
  );

  const handleSelectItem = useCallback(
    (
      request:
        | Schemas.ImageResponse
        | Schemas.LaboratoryResponse
        | Schemas.OtherRequestResponse,
    ) => () => {
      setFieldValue("filters.requestSelected", request, true);
    },
    [setFieldValue],
  );

  const uploadLocalProfessionalFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);
      if (base64) {
        setFieldValue("result.base64", base64, true);
        setFieldValue("result.name", file?.name || "", true);
      }
    },
    [setFieldValue],
  );

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.flex}>
        <div className={`${classes.flex} ${classes.full}`}>
          <div className={classes.column}>
            <Typography className={classes.title} variant="h6">
              {STRINGS.result.CHOOSE_REQUEST_TO_UPLOAD_RESULT}
            </Typography>
            <div className={classes.filterContainer}>
              <div
                className={`${classes.field} ${classes.autocompleteContainer}`}>
                <Autocomplete
                  options={requestType}
                  getOptionLabel={
                    (option: ValueAndLabelType) => option.label || ""
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                  autoComplete={false}
                  onChange={onChangeRequestType}
                  inputProps={{
                    autoComplete: "off",
                    placeholder: STRINGS.request.REQUEST_TYPE,
                  }}
                  value={requestType[1]}
                />
              </div>
              <div className={`${classes.date} ${classes.field}`}>
                <DatePicker
                  date={values.filters.from}
                  handleDateChange={handleDateChange("from")}
                />
              </div>
              <div className={`${classes.date} ${classes.field}`}>
                <DatePicker
                  date={values.filters.to}
                  handleDateChange={handleDateChange("to")}
                />
              </div>
            </div>
            <div>
              <InfiniteScrollList
                height={500}
                data={requests || []}
                loading={loading || !!isFetchingMore}
                fetchMore={() => {}}
                hasNextPage={false}
                renderRow={(
                  request:
                    | Schemas.ImageResponse
                    | Schemas.LaboratoryResponse
                    | Schemas.OtherRequestResponse,
                ) => (
                  <CardLayout
                    selected={
                      request.code === values.filters.requestSelected?.code
                    }
                    className={`${classes.card}`}
                    onClick={handleSelectItem(request)}>
                    <RequestItem
                      requestType={(request as Schemas.RequestItem).requestType}
                      key={request.code}
                      code={request.code || ""}
                      date={`${request.createdAt?.dateDay}/${request.createdAt?.dateMonth}/${request.createdAt?.dateYear}`}
                      time={moment(
                        `${request.createdAt?.timeHour}:${
                          request.createdAt?.timeMinute || 0
                        }`,
                        "hh:mm",
                      ).format("hh:mm A")}
                      diagnosis={
                        request.diagnoses?.map((d) => d.description || "") || []
                      }
                      patientName={fullName(currentPatient)}
                    />
                  </CardLayout>
                )}
              />
            </div>
          </div>
          <Divider orientation="vertical" className={classes.divider} />
        </div>
        <div className={classes.fightGroup}>
          <Typography className={classes.title} variant="h6">
            {STRINGS.result.ADD_ONE_RESULT}
          </Typography>
          <div className={`${classes.flex} ${classes.full}`}>
            <TextField
              type="text"
              id="name"
              name="result.title"
              placeholder={STRINGS.result.RESULT_TYPE}
              value={values.result.title}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              margin="dense"
            />
            <UploadFile
              loading={loadingNewResult || false}
              onImportFile={uploadLocalProfessionalFile}
              localBase64={values.result}
            />
          </div>
        </div>
      </div>
      <div className={classes.actionSection}>
        <PrimaryButton
          label={STRINGS.generals.CANCEL}
          className={classes.saveButton}
          onClick={handleShowAddResult}
        />
        <PrimaryButton
          label={STRINGS.generals.SAVE}
          className={classes.saveButton}
          type="submit"
          loading={loadingNewResult}
          disabled={loadingNewResult}
        />
      </div>
    </form>
  );
}
