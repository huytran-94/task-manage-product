import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";
import USER_SERVICE from "../../../core/services/userServ";
import EditUserForm from "../../../core/Components/Forms/EditUserForm";

const EditUserPage = () => {
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

  const renderPage = (userInfo) => {
    const avatarDiv = (
      <div className="col p-[20px] flex justify-center items-center w-full">
        <div className="avatar user-avatar">
          <Avatar size={300} src="https://joeschmoe.io/api/v1/random" />
        </div>
      </div>
    );
    return (
      <>
        <Header />
        {avatarDiv}
        <div className="col w-full">
          <EditUserForm userInfo={userInfo} />
        </div>
      </>
    );
  };

  if (Object.keys(userInfo).length) {
    return (
      <SectionWrapper
        sectionClass={"edit-user"}
        title={`Edit info:  ${userInfo.username}`}
        content={renderPage(userInfo)}
        contentClass={"flex flex-col justify-between"}
      />
    );
  }
};

export default EditUserPage;
