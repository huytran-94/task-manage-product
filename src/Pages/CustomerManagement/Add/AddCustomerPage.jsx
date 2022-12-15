import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Label from "../../../../src/core/Components/Forms/Label/Label";
import CUSTOMER_SERVICE from "../../../core/services/customerServ";
import Notification from "./../../../core/Components/Notification/Notification";
import { userActions } from "./../../../core/redux/slice/userSlice";
import Header from "../../../core/Components/Header/Header";
import TextArea from "antd/es/input/TextArea";

const AddCustomerPage = ({
  layout = "vertical",
  size = "large",
  customerInfo,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initialValues = { ...customerInfo };

  const handleFinish = (values) => {
    values = { ...values, order_history: [] };
    CUSTOMER_SERVICE.addCustomer(values).then((res) => {
      Notification("success", "Add new customer ok", "Please wait a minute");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  const handleFinishFailed = () => {};
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="section-title mb-8">
          <h3 className="title uppercase text-2xl font-extrabold tracking-wide relative">
            <span className="relative z-[2]">Add new Customer</span>
          </h3>
        </div>
        <Form
          form={form}
          name="add-customer"
          layout={layout}
          size={size}
          initialValues={initialValues}
          onFinish={handleFinish}
          className="add-customer-form"
        >
          <Form.Item
            label={labelItem("full name")}
            name="fullname"
            rules={[
              { required: true, message: "Please input your Name here" },
              {
                pattern:
                  /^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ' ]+$/,
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
          <Form.Item label={labelItem("Address")} name="address">
            <Input />
          </Form.Item>

          <Form.Item
            label={labelItem("Google Map")}
            name="map"
            rules={[
              { required: true, message: "Please input your map here" },
              {
                message: "Letters only",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={labelItem("Ghi chú")} name="note">
            <TextArea />
          </Form.Item>
          <Form.Item className="form-btn-groups" style={{ marginTop: "30px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
            >
              Add new
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
      </div>
    </>
  );
};

export default AddCustomerPage;
