import React, { useEffect, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import CUSTOMER_SERVICE from "../../core/services/customerServ";
import { LOCAL_SERVICE } from "../../core/services/localServ";
const CustomerManagementPage = () => {
  const [search, setSearch] = useState("");

  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };
  const [customerList, setCustomerList] = useState(null);
  useEffect(() => {
    CUSTOMER_SERVICE.getCustomerList()
      .then((res) => {
        setCustomerList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (customerList) {
    return (
      <>
        <Header handleSearchInput={handleSearchInput} />
        <SectionWrapper
          sectionClass={"customers"}
          title={"Customer Management"}
          content={
            <CustomerManageTable
              search={search}
              customerListData={customerList}
            />
          }
        />
      </>
    );
  }
};

export default CustomerManagementPage;
