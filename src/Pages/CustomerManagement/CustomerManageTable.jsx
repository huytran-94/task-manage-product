import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerAvatarInfo from "../../core/Components/TableAvatar/CustomerAvatarInfo";
import CustomerActionButtons from "./CustomerActionButtons";

const CustomerManageTable = ({ search, customerListData }) => {
  const [customerList, setCustomerList] = useState(customerListData);
  let location = useLocation();

  //   fetch api
  useEffect(() => {
    let returnedData = [];
    if (search) {
      if (/^\d+$/.test(search)) {
        returnedData = customerList.filter(
          (customer) => customer.sdt.indexOf(search) > -1
        );
      } else {
        returnedData = customerList.filter(
          (customer) => customer.fullname.toLowerCase().indexOf(search) > -1
        );
      }
    } else {
      returnedData = customerList.map((item, idx) => ({
        key: idx,
        ...item,
      }));
    }
    setCustomerList(returnedData);
  }, [search]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      className: "fullname",
      render: (_, customer) => <CustomerAvatarInfo customerData={customer} />,
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "sdt",
      className: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      className: "address",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, customer) => {
        if (location.pathname === "/manager") {
          return <CustomerActionButtons customerData={customer} />;
        } else {
          return (
            <a href={`tel:${customer.sdt}`}>
              <img
                src="https://templates.envytheme.com/joxi/default/assets/images/icon/call-2.svg"
                alt=""
              />
            </a>
          );
        }
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
      rowKey={(customer) => customer.id.toString()}
      columns={columns}
      dataSource={customerList}
      pagination={false}
      className="customer-manage-table"
    />
  );
};

export default CustomerManageTable;
