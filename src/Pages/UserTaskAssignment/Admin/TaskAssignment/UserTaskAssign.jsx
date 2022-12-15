import React, { useEffect, useState } from "react";
import { Space } from "antd";
import clsx from "clsx";

import { useParams } from "react-router-dom";

import CustomerInputForm from "../../../../core/Components/Forms/CustomerInputForm";
import SectionWrapper from "../../../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../../../core/Components/Header/Header";
import USER_SERVICE from "../../../../core/services/userServ";

const UserTaskAssign = () => {
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
  const renderUserInfo = (userInfo) => {
    return (
      <div className={clsx("content-header", bgClass, "w-full")}>
        <div className="wrapper flex flex-col gap-2">
          <div className="personal-info">
            <Space className="flex" direction="vertical" size={"middle"}>
              <div className="title capitalize text-lg text-[#292d32] font-bold">
                thông tin nhân viên
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
  const contentHeader = (userInfo) => {
    return renderUserInfo(userInfo);
  };
  const contentBody = (userInfo) => {
    return (
      <div className={clsx("content-body", bgClass, "w-full")}>
        <div className="col w-full">
          <CustomerInputForm userInfo={userInfo} />
        </div>
      </div>
    );
  };
  const renderPage = (userInfo) => {
    return (
      <>
        <Header />
        <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
          {contentHeader(userInfo)}
          {contentBody(userInfo)}
        </div>
      </>
    );
  };

  if (Object.keys(userInfo).length) {
    return (
      <SectionWrapper
        sectionClass={"assign-user"}
        content={renderPage(userInfo)}
        contentClass={"flex flex-col justify-between"}
      />
    );
  }
};

export default UserTaskAssign;
