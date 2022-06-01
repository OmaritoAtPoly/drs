import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import InfiniteScrollList from "../../lists/InfiniteScrollList";
import CustomerSimpleRowContainer from "./CustomerSimpleRow/CustomerSimpleRowContainer";
import SimpleHeader from "./SimpleHeader";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
  }),
);

interface Props {
  customers: Schemas.CustomerData[];
  loading?: boolean;
  fetchMore?: () => void;
  hasNextPage?: boolean;
}

const Customers = ({
  customers,
  loading,
  fetchMore = () => {},
  hasNextPage,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <InfiniteScrollList
        data={customers}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
        renderRow={(customer) => (
          <CustomerSimpleRowContainer customer={customer} />
        )}
        renderHeader={() => <SimpleHeader />}
      />
    </div>
  );
};

export default Customers;
