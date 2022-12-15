import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import ADMIN_SERVICE from "../../core/services/adminServ";
import { Button, Form, Input } from "antd";
import Label from "../../core/Components/Forms/Label/Label";
const AddAdminPage = ({ layout = "vertical", size = "large" }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    if (
      LOCAL_SERVICE.user.getRole() === "user" ||
      LOCAL_SERVICE.user.getRole() === "admin"
    ) {
      navigate("/");
    }
  }, []);

  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  const handleFinish = (values) => {
    ADMIN_SERVICE.addAdminInfo(values)
      .then((res) => {
        Notification("success", "Add new admin ok", "Please wait a minute");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const rennderAddAdminForm = () => {
    return (
      <Form
        form={form}
        name="add-admin"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="add-admin-form"
      >
        <Form.Item
          label={labelItem("Full name")}
          name="fullname"
          rules={[
            { required: true, message: "Please input your name here" },
            {
              message: "Letters only",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Email")}
          name="email"
          rules={[
            { required: true, message: "Please add your email here" },
            {
              type: "email",
              message: "Please use correct email format",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Password")}
          name="password"
          rules={[{ required: true, message: "Please add your password" }]}
        >
          <Input type="passwords" />
        </Form.Item>

        <Form.Item
          label={labelItem("Phone number")}
          name="sdt"
          rules={[
            { required: true, message: "Phone number is required" },
            {
              pattern: /^\d+$/,
              message: "Number only, no whitespace",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="form-btn-groups" style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
          >
            Add new Admin
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] rounded-[4px] text-white text-sm transition-all duration-[400ms] ml-3"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"master"}
        title={"Add new admin"}
        content={rennderAddAdminForm()}
      />
    </>
  );
};

export default AddAdminPage;
