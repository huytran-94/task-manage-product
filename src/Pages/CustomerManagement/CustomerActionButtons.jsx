import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { SlEye } from "react-icons/sl";

import { Modal, Popover, Space } from "antd";
import CUSTOMER_SERVICE from "../../core/services/customerServ";
import { useNavigate } from "react-router-dom";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { DesktopView, MobileView } from "../../core/HOC/Responsive";

import { TfiMore } from "react-icons/tfi";
import { useState } from "react";

const CustomerActionButtons = ({ customerData }) => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDeleteConfirm = (title, content = "", handleOK) => {
    confirm({
      title: title,
      content: content,
      okText: "Yes",
      okButtonProps: {
        className: "btn-delete-ok",
      },
      cancelButtonProps: {
        className: "btn-delete-cancel",
      },
      cancelText: "No",
      onOk() {
        handleOK();
      },
      onCancel() {
        console.log("Cancel");
      },
      centered: true,
      wrapClassName: "modal-confirm-delete",
    });
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleDeleteCustomer = (customerData) => {
    setOpen(false);
    showDeleteConfirm(
      `Are you sure you want to delete customer ${customerData.fullname} ?`,
      "",
      () => deleteCustomer(customerData)
    );
  };

  const deleteCustomer = (customerData) => {
    CUSTOMER_SERVICE.deleteCustomer(customerData.id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  const handleView = (customerData) => {
    navigate(`/customer/view/${customerData.id}`);
  };

  const handleEdit = () => {
    navigate(`/customer/edit/${customerData.id}`);
  };

  const renderButtons = () => {
    return (
      <>
        <DesktopView>{renderDesktopViewButtons()}</DesktopView>
        <MobileView>{renderMobileViewButtons()}</MobileView>
      </>
    );
  };
  const renderDesktopViewButtons = () => {
    return (
      <Space size={"middle"} align={"center"} className="btn-actions">
        <SlEye
          onClick={() => handleView(customerData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#3F80FD"}
        />

        <AiOutlineEdit
          onClick={() => handleEdit(customerData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#82D973"}
        />
        {(LOCAL_SERVICE.user.getRole() === "admin" ||
          LOCAL_SERVICE.user.getRole() === "master") && (
          <FiTrash
            onClick={() => {
              handleDeleteCustomer(customerData);
            }}
            className="cursor-pointer"
            size={"20px"}
            color={"red"}
          />
        )}
      </Space>
    );
  };

  const renderMobileViewButtons = () => {
    let popOverContent = (
      <Space
        size={"middle"}
        align={"center"}
        className="btn-actions justify-center w-full"
      >
        <SlEye
          onClick={() => handleView(customerData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#3F80FD"}
        />
        <AiOutlineEdit
          onClick={() => handleEdit(customerData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#82D973"}
        />
        {(LOCAL_SERVICE.user.getRole() === "admin" ||
          LOCAL_SERVICE.user.getRole() === "master") && (
          <FiTrash
            onClick={() => {
              handleDeleteCustomer(customerData);
            }}
            className="cursor-pointer"
            size={"20px"}
            color={"red"}
          />
        )}
      </Space>
    );
    return (
      <Popover
        placement="bottomRight"
        content={popOverContent}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <TfiMore size={20} />
      </Popover>
    );
  };
  return <div>{renderButtons()}</div>;
};

export default CustomerActionButtons;
