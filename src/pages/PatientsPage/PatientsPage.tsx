import React from "react";
import WrapperPage from "../../components/wrappers/WrapperPage";
import CustomersContainer from "../../containers/customers/CustomersContainer";
import CustomersFiltersContainer from "../../containers/customers/CustomersFiltersContainer";

function PatientsPage() {
  return (
    <WrapperPage>
      <div>
        <CustomersFiltersContainer />
        <CustomersContainer />
      </div>
    </WrapperPage>
  );
}

export default PatientsPage;
