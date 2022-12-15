import { Table } from "antd";
import React, { useState } from "react";
import { SlEye } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import OrderDetail from "./OrderDetail";
const CustomerOrderHistory = ({ orderHistory }) => {
  // const navigate = useNavigate();
  // const handleView = (order) => {
  //   navigate(`/order/${order.order_id}`);
  // };

  const columns = [
    {
      title: "order",
      dataIndex: "order",
    },

    {
      title: "Complete Date",
      dataIndex: "complete_date",
    },
    // {
    //   title: "Action",
    //   dataIndex: "",
    //   key: "x",
    //   render: (_, order) => {
    //     return (
    //       <SlEye
    //         onClick={() => handleView(order)}
    //         className="cursor-pointer"
    //         size={"20px"}
    //         color={"#3F80FD"}
    //       />
    //     );
    //   },
    // },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orderHistory}
      size="small"
      rowKey={(order) => order.order_id.toString()}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (order) => (
          <div className="order-more-info">
            <div className="order-info flex items-center gap-2">
              <div className="title font-medium text-lg capitalize">
                Order info
              </div>
              <div className="txt">: {order.order}</div>
            </div>
            <div className="note flex items-center gap-2">
              <div className="title font-medium text-lg capitalize">Note :</div>
              <div className="txt">{order.note}</div>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default CustomerOrderHistory;
