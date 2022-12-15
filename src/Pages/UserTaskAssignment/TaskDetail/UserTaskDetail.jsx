import React, { useEffect } from "react";
import Header from "../../../core/Components/Header/Header";
import TaskDetailForm from "../../../core/Components/Forms/TaskDetailForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import USER_SERVICE from "../../../core/services/userServ";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

const UserTaskDetail = () => {
  const { id } = useParams();
  let [taskInfo, setTaskInfo] = useState({});
  let [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    USER_SERVICE.getUserInfo()
      .then((res) => {
        res.forEach((user) => {
          let taskIdx = user.tasks.findIndex((task) => task.id === id);
          if (taskIdx > -1) {
            setTaskInfo(user.tasks[taskIdx]);
            setUserInfo(user);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderPage = (taskInfo) => {
    return (
      <div className="col w-full">
        <TaskDetailForm taskInfo={taskInfo} userInfo={userInfo} />
      </div>
    );
  };
  if (Object.keys(taskInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"user-task-detail"}
          title={`Task Details`}
          content={renderPage(taskInfo)}
          contentClass={"flex flex-col justify-between"}
        />
      </>
    );
  }
};

export default UserTaskDetail;
