import React, { useEffect, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import CUSTOMER_SERVICE from "../../core/services/customerServ";

import { storage } from "../../core/Components/UploadFile/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { exportToExcel } from "../../core/Components/ExcelReport/exportExcel";
import { sendMailWithFile } from "../../core/Components/Email/sendMail";
import Notification from "../../core/Components/Notification/Notification";

const CustomerListPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    CUSTOMER_SERVICE.getCustomerList()
      .then((res) => {
        setCustomerList(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };

  let handleExportFile = (customerList) => {
    const fileName = "file_report";
    const currentDate = new Date().getTime();
    let fileBlobData = exportToExcel(
      `${fileName}_${currentDate}`,
      customerList
    );

    const fileRef = ref(storage, `files/${fileName}_${currentDate}.xlsx`);
    uploadBytes(fileRef, fileBlobData)
      .then(() => {
        alert("upload ok");
        return getDownloadURL(fileRef);
      })
      .then((url) => {
        console.log(url);
        let templateParams = {
          from_name: "system",
          message: `Link download: ${url}`,
          to_email: "scorpionthemes944@gmail.com",
        };
        return sendMailWithFile(templateParams);
      })
      .then((result) => {
        Notification("success", "Email is sent", "Please check your inbox");
        console.log("result");
        console.log(result.text);
      })
      .catch((error) => {
        Notification("error", "Error", "Something went wrong");
        console.log(error);
      });
  };

  let renderTitle = () => {
    return (
      <div className="wrapper">
        <p>Customer List</p>

        <div className="button-group">
          <Button
            className="flex items-center justify-center bg-indigo-500/100 p-5 w-full mb-5"
            onClick={() => {
              navigate("/manager");
            }}
          >
            <MdOutlineManageAccounts color="#fff" size={28} />
          </Button>

          {LOCAL_SERVICE.user.getRole() === "master" && (
            <Button
              className="flex items-center justify-center bg-indigo-500/100 p-5 w-full mb-5"
              onClick={() => handleExportFile(customerList)}
            >
              <RiFileExcel2Line color="#fff" size={24} />
            </Button>
          )}
        </div>
      </div>
    );
  };
  if (customerList.length) {
    return (
      <>
        <Header handleSearchInput={handleSearchInput} />
        <SectionWrapper
          sectionClass={"customers"}
          title={renderTitle()}
          titleClass="flex items-center justify-center"
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

export default CustomerListPage;
