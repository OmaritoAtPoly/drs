import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../utils/strings";
import Autocomplete from "../../inputs/Search/Autocomplete";
import InfiniteScrollList from "../../lists/InfiniteScrollList";
import ItemFaqs from "./ItemFaqs";

// eslint-disable-next-line @typescript-eslint/no-shadow
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3),
      flexDirection: "column",
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
    containerList: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    search: {
      minWidth: 350,
      marginRight: 3,
    },
    row: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    question: {
      lineHeight: "20px",
      color: theme.palette.primary.main,
    },
    answer: {
      display: "flex",
      marginLeft: theme.spacing(2),
      marginTop: -theme.spacing(1),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
  }),
);

interface Props {
  faqs: Schemas.FaqData[];
  fetchMore: () => void;
  loadingFaqs?: boolean;
  hasNextPage?: boolean;
  onChange: (value: Schemas.FaqData) => void;
  onDebounceFaqs: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}

const Faqs = ({
  faqs,
  fetchMore,
  loadingFaqs,
  hasNextPage,
  onChange,
  onDebounceFaqs,
}: Props) => {
  const classes = useStyles();

  const renderRow = useCallback(
    (faqType: Schemas.FaqData) => (
      <div>
        <ItemFaqs faqType={faqType} />
      </div>
    ),
    [],
  );

  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <div className={classes.row}>
          <Autocomplete
            classes={{ root: classes.search }}
            options={faqs}
            getOptionLabel={(option: Schemas.FaqData) => option.question || ""}
            freeSolo
            inputProps={{
              placeholder: STRINGS.faqs.LOOKING_FOR_FAQs,
            }}
            onDebounce={onDebounceFaqs}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={classes.containerList}>
        <InfiniteScrollList
          data={faqs || []}
          loading={loadingFaqs}
          fetchMore={fetchMore}
          hasNextPage={hasNextPage}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default Faqs;
