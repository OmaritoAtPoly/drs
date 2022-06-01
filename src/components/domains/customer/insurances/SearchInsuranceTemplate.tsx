import {
  createStyles,
  Link,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import InfiniteScrollList from "../../../lists/InfiniteScrollList";
import ActionPanelInsurance from "./ActionPanelInsurance";

interface Props {
  handleShow: () => void;
  open: boolean;
  insurances?: Schemas.HealthInsuranceData[];
  loadingInsurances?: boolean;
  loadingDownload?: boolean;
  onChange: (value: Schemas.HealthInsuranceData) => void;
  onDebounceInsurances: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  fetchMore: () => void;
  hasNextPage?: boolean;
  onDownloadTemplate: (insurance: Schemas.HealthInsuranceData) => () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      marginTop: 10,
    },
    search: {
      minWidth: 250,
      marginRight: 3,
    },
    full: {
      width: "100%",
    },
  }),
);
export default function SearchInsuranceTemplate({
  handleShow,
  open,
  insurances,
  loadingInsurances,
  onDebounceInsurances,
  onChange,
  fetchMore,
  hasNextPage,
  onDownloadTemplate,
  loadingDownload,
}: Props) {
  const classes = useStyles();

  const renderRow = useCallback(
    (insurance: Schemas.HealthInsuranceData) => (
      <ListItem id="list-item-short-device" button alignItems="flex-start">
        <ListItemText
          primary={insurance.name}
          secondary={
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                <Link target="_blank" href={insurance.siteUrl}>
                  {insurance.siteUrl}
                </Link>
              </Typography>
            </>
          }
        />
        <div>
          <BadgedButton
            iconName="print"
            circular
            onClick={onDownloadTemplate(insurance)}
            iconHeight={15}
            iconWidth={15}
          />
        </div>
      </ListItem>
    ),
    [onDownloadTemplate],
  );

  return (
    <LabeledDialog
      label={STRINGS.buttonGrid.INSURANCES}
      open={open}
      actionPanel={<ActionPanelInsurance onClose={handleShow} />}
      handleShow={handleShow}>
      <div className={classes.container}>
        <div className={classes.full}>
          <Autocomplete
            loading={loadingInsurances}
            classes={{ root: classes.search }}
            options={insurances}
            getOptionLabel={
              (option: Schemas.CustomerInsurance) => option.name || ""
              // eslint-disable-next-line react/jsx-curly-newline
            }
            freeSolo
            autoComplete={false}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.patientInfo.MEDICAL_INSURANCE,
            }}
            onDebounce={onDebounceInsurances}
            onChange={onChange}
          />
        </div>
        <div>
          <InfiniteScrollList
            data={insurances || []}
            loading={loadingInsurances || loadingDownload}
            fetchMore={fetchMore}
            hasNextPage={hasNextPage}
            renderRow={renderRow}
          />
        </div>
      </div>
    </LabeledDialog>
  );
}
