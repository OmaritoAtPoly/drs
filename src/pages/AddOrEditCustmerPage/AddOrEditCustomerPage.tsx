import React from "react";
import WrapperPage from "../../components/wrappers/WrapperPage";
import AddCustomerContainer from "../../containers/customer/customerActions/AddCustomerContainer";

function AddOrEditCustomerPage() {
  return (
    <WrapperPage>
      <AddCustomerContainer />
    </WrapperPage>
  );
}

export default AddOrEditCustomerPage;
