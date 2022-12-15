import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import USER_SERVICE from "../../core/services/userServ";
import UserTaskTrackingActionButtons from "./UserTaskTrackingActionButtons";

const UserTaskTrackingTable = () => {
  let currentUserInfo = LOCAL_SERVICE.user.get();

  const [taskList, setTaskList] = useState([]);
  // fetch api
  useEffect(() => {
    USER_SERVICE.getSingleUserInfo(currentUserInfo.id)
      .then((res) => {
        let returnedData = res.tasks.filter((task) => task.completed == false);
        setTaskList(returnedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "fullname",
      className: "order-number text-[#292d32] text-base",
    },
    {
      title: "Customer Phone",
      dataIndex: "sdt",
      className: "order-number text-[#292d32] text-base",
    },
    {
      title: "Action",
      dataIndex: "",
      className: "action-btn-group",
      key: "x",
      width: "15%",
      render: (_, task) => {
        return <UserTaskTrackingActionButtons taskData={task} />;
      },
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      showHeader={false}
      rowKey={(task) => {
        return task.id.toString();
      }}
      columns={columns}
      dataSource={taskList}
      pagination={false}
      className="user-task-tracking-table"
    />
  );
};

export default UserTaskTrackingTable;
