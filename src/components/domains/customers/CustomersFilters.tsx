/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import { ValueAndLabelType } from "../../../utils/types";
import { fullName } from "../../../utils/user";
import PopoverButton from "../../buttons/PopOverButton";
import CardLayout from "../../cards/CardLayout";
import Autocomplete from "../../inputs/Search/Autocomplete";
import NewCustomerPanel from "./newCustomer/NewCostomerPanel";

// eslint-disable-next-line @typescript-eslint/no-shadow
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      width: "100%",
      height: "100%",
      marginTop: 10,
    },
    searchContainer: {
      alignItems: "center",
      display: "flex",
      paddingLeft: 20,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    full: {
      width: "100%",
    },
    search: {
      minWidth: 250,
      marginRight: 3,
    },
    paddingExtremeRight: {
      [theme.breakpoints.down("md")]: {
        paddingLeft: 20,
        paddingTop: 2,
      },
      display: "flex",
      alignItems: "center",
      paddingRight: 20,
    },
    popoverButtonContainer: {
      height: "100%",
      alignItems: "center",
      display: "flex",
    },
    popoverButton: {
      height: 35,
      width: 35,
    },
    popupContainer: {
      display: "flex",
      flexDirection: "column",
      minWidth: 100,
      padding: theme.spacing(3),
    },
    row: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    labelStyle: {
      textTransform: "uppercase",
    },
    alignSelf: {
      alignSelf: "flex-start",
    },
    popoverContainerClassName: {
      marginLeft: 60,
    },
  }),
);

interface Props {
  insurances?: Schemas.HealthInsuranceData[];
  yearOptions: string[];
  cities: Schemas.CityData[];
  onDebounceCities: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  onDebounceInsurances: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  onRoute: ({
    city,
    search,
    gender,
    insurance,
  }: {
    city: Schemas.CityData;
    search: string;
    gender: string;
    insurance: Schemas.CustomerInsurance;
  }) => void;
  loadingCities?: boolean;
  loadingInsurances?: boolean;
  gendersOptions: ValueAndLabelType[];
}

const CustomersFilters = ({
  insurances,
  yearOptions,
  cities,
  onDebounceCities,
  onRoute,
  loadingCities,
  onDebounceInsurances,
  loadingInsurances,
  gendersOptions,
}: Props) => {
  const classes = useStyles();

  const { values, setFieldValue } = useFormik({
    initialValues: {
      gender: "",
      insurance: undefined,
      year: "",
      city: undefined,
    },
    onSubmit: () => {},
  });

  const handleClick = useCallback(
    (name: string, value: string) => () => {
      setFieldValue(name, (values as any)[name] === value ? "" : value, true);
    },
    [setFieldValue, values],
  );

  const renderContentPopup = useCallback(
    () => (
      <CardLayout className={classes.popupContainer}>
        <div>
          <div>
            <Typography>{STRINGS.patientInfo.SEX}</Typography>
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="contraceptive_type"
              name="gender"
              value={values.gender}>
              {gendersOptions.map((g) => (
                <FormControlLabel
                  value={g.value}
                  control={<Radio onClick={handleClick("gender", g.value)} />}
                  label={g.label}
                  color={theme.palette.primary.main}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <div>
            <Typography>{STRINGS.patientInfo.PATIENT_YEAR_CREATION}</Typography>
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="contraceptive_type"
              name="year"
              value={values.year}>
              {yearOptions?.map((year) => (
                <FormControlLabel
                  value={year}
                  control={<Radio onClick={handleClick("year", year)} />}
                  label={year}
                  color={theme.palette.primary.main}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </CardLayout>
    ),
    [
      classes.popupContainer,
      gendersOptions,
      handleClick,
      values.gender,
      values.year,
      yearOptions,
    ],
  );

  const handleChangeCreator = useCallback(
    (name: string) => (
      value?: Schemas.CityData | Schemas.CustomerInsurance,
    ) => {
      setFieldValue(name, value || "", true);
    },
    [setFieldValue],
  );

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFieldValue("search", event.target.value || "", true);
    },
    [setFieldValue],
  );

  const filterOptions = createFilterOptions({
    stringify: (option: Schemas.CityData) => `${option.name} ${option.code}`,
  });

  useEffect(() => {
    onRoute(values as any);
  }, [onRoute, values]);

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <div className={classes.row}>
          <Autocomplete
            classes={{ root: classes.search }}
            options={[]}
            // eslint-disable-next-line no-confusing-arrow
            getOptionLabel={(option: Schemas.CustomerData) =>
              option.firstName
                ? fullName(option)
                : ((option as any) as string) || ""
            }
            freeSolo
            inputProps={{
              placeholder: STRINGS.generals.FIND_PATIENT_BY_NAME_ETC,
            }}
            value={(values as any).search}
            onDebounce={onDebounceSearch}
            closeIcon={false}
          />
          <Autocomplete
            loading={loadingCities}
            classes={{ root: classes.search }}
            options={cities}
            getOptionLabel={(option: Schemas.CityData) => option.name || ""}
            filterOptions={filterOptions}
            freeSolo={false}
            autoComplete={false}
            onChange={handleChangeCreator("city")}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.patientInfo.CITY,
            }}
            onDebounce={onDebounceCities}
          />
          <Autocomplete
            loading={loadingInsurances}
            classes={{ root: classes.search }}
            options={insurances}
            getOptionLabel={(option: Schemas.CustomerInsurance) =>
              option.name || ""
            }
            filterOptions={filterOptions}
            freeSolo={false}
            autoComplete={false}
            onChange={handleChangeCreator("insurance")}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.patientInfo.MEDICAL_INSURANCE,
            }}
            onDebounce={onDebounceInsurances}
          />
        </div>
        <div className={`${classes.full} ${classes.alignSelf}`}>
          <PopoverButton
            className={classes.popoverButtonContainer}
            buttonClassName={classes.popoverButton}
            popoverContainerClassName={classes.popoverContainerClassName}
            iconName="filter"
            renderContent={renderContentPopup}
          />
        </div>
      </div>
      <div className={classes.paddingExtremeRight}>
        <NewCustomerPanel />
        {/* <NewCustomerPanelContainer /> */}
        {/* <LabeledButton
          buttonLabel={STRINGS.generals.NEW_PATIENT}
          iconName="add"
          onClick={onNewPatient}
          labelStyle={classes.labelStyle}
        /> */}
      </div>
    </div>
  );
};

export default CustomersFilters;
