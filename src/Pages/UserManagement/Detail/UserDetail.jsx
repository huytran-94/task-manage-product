import { Avatar, Space } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";
import USER_SERVICE from "../../../core/services/userServ";

const UserDetail = () => {
  const { id } = useParams();

  let [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    USER_SERVICE.getSingleUserInfo(id)
      .then((res) => {
        setUserInfo(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const bgClass = "bg-white rounded-lg p-4 shadow-lg p-[50px]";
  const contentHeader = (userInfo) => {
    return (
      <>
        <div className={clsx("content-header", bgClass, "w-full")}>
          <div className="wrapper flex items-center justify-center">
            <div className="profile-info flex flex-col gap-2 items-center justify-center">
              <div className="col flex justify-center items-center w-full">
                <div className="avatar">
                  <Avatar size={300} src="https://joeschmoe.io/api/v1/random" />
                </div>
              </div>

              <h4 className="txt text-lg font-bold text-[#292d32] mb-0">
                {userInfo.username}
              </h4>
              <span>Member Since: September 2022</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  const contentBody = (userInfo) => {
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
                    <span className="txt capitalize">{userInfo.username}</span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      email
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">{userInfo.email}</span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      phone
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">{userInfo.sdt}</span>
                  </li>
                </ul>
              </div>
            </Space>
          </div>
          <div className="biography"></div>
        </div>
      </div>
    );
  };
  const renderContent = (userInfo) => {
    if (Object.keys(userInfo).length) {
      return (
        <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
          {contentHeader(userInfo)}
          {contentBody(userInfo)}
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
        title={"Thông tin nhân viên"}
        content={renderContent(userInfo)}
      />
    </>
  );
};

export default UserDetail;
