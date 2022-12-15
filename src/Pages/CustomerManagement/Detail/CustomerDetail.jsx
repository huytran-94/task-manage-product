import { Avatar, Space, Tabs } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import CUSTOMER_SERVICE from "../../../core/services/customerServ";
import Header from "../../../core/Components/Header/Header";
import CustomerOrderHistory from "./CustomerOrderHistory";

import avatar from "../../../core/assets/images/avatar.svg";
import { isValidUrl } from "../../../core/utils/utils";

const CustomerDetail = () => {
  const { id } = useParams();

  let [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    CUSTOMER_SERVICE.getCustomerInfo(id)
      .then((res) => {
        console.log(res);
        setCustomerInfo(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const bgClass = "bg-white rounded-lg p-4 shadow-lg p-[50px]";
  const renderOrderHistory = (orderHistory) => {
    return (
      <div className="order-history">
        <Space className="flex" direction="vertical" size={"middle"}>
          <div className="title capitalize text-lg text-[#292d32] font-bold">
            order history
          </div>
          <div className="info w-full">
            <ul className="mb-0">
              <li className="mb-3">
                <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                  Mã đơn hàng
                </span>
                <span className="char--special mx-1">:</span>
                <span className="txt capitalize">{customerInfo.fullname}</span>
              </li>
              <li className="mb-3">
                <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                  Địa Chỉ
                </span>
                <span className="char--special mx-1">:</span>
                <span className="txt capitalize">{customerInfo.address}</span>
              </li>
              <li className="mb-3">
                <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                  Google Map
                </span>
                <span className="char--special mx-1">:</span>
                <span className="txt capitalize leading-7">
                  <a href={customerInfo.map}> {customerInfo.map}</a>
                </span>
              </li>
            </ul>
          </div>
        </Space>
      </div>
    );
  };
  const renderPersonalInfo = (customerInfo) => {
    return (
      <div className={clsx("content-body", bgClass, "w-full")}>
        <div className="wrapper flex flex-col gap-2">
          <div className="personal-info">
            <Space className="flex" direction="vertical" size={"middle"}>
              <div className="title capitalize text-lg text-[#292d32] font-bold">
                personal information
              </div>
              <div className="info w-full">
                <ul className="mb-0">
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      Họ Tên
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">
                      {customerInfo.fullname}
                    </span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      Địa Chỉ
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">
                      {customerInfo.address}
                    </span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      Google Map
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize leading-7">
                      <a href={customerInfo.map}> {customerInfo.map}</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="info w-full">
                <ul className="mb-0">
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      email
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">{customerInfo.email}</span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      phone
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">{customerInfo.sdt}</span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      others link
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">
                      twitter, facebook, LinkedIn etc...
                    </span>
                  </li>
                </ul>
              </div>
            </Space>
          </div>
        </div>
      </div>
    );
  };
  const contentHeader = (customerInfo) => {
    return (
      <>
        <div className={clsx("content-header", bgClass, "w-full")}>
          <div className="wrapper flex items-center justify-center">
            <div className="profile-info flex flex-col gap-2 items-center justify-center">
              <div className="col flex justify-center items-center w-full">
                <div className="avatar">
                  <Avatar
                    size={300}
                    src={
                      isValidUrl(customerInfo.avatar)
                        ? customerInfo.avatar
                        : avatar
                    }
                  />
                </div>
              </div>

              <h4 className="txt text-lg font-bold text-[#292d32] mb-0">
                {customerInfo.fullname}
              </h4>
            </div>
          </div>
        </div>
      </>
    );
  };
  const contentBody = (customerInfo) => {
    return (
      <Tabs
        className="w-full"
        defaultActiveKey="1"
        items={[
          {
            label: `Personal Information`,
            key: "1",
            children: renderPersonalInfo(customerInfo),
          },
          {
            label: `Order History`,
            key: "2",
            children: (
              <CustomerOrderHistory orderHistory={customerInfo.order_history} />
            ),
          },
        ]}
      />
    );
  };
  const renderContent = (customerInfo) => {
    if (Object.keys(customerInfo).length) {
      return (
        <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
          {contentHeader(customerInfo)}
          {contentBody(customerInfo)}
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"customer-detail"}
        title={"Customer Details"}
        content={renderContent(customerInfo)}
      />
    </>
  );
};

export default CustomerDetail;
