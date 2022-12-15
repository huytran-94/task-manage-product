/* import antd components */
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { IoMailOutline } from "react-icons/io5";
import { HiOutlineKey } from "react-icons/hi";

const LoginForm = ({ layout = "horizontal", size = "large", handleFinish }) => {
  const onFinish = (values) => {
    handleFinish(values);
  };

  const inputClassName =
    "py-2 px-5 rounded-[10px] bg-[#F1F5FF] border border-solid border-[#F1F5FF] text-[#292d32] h-[60px] py-3 px-5";
  return (
    <Form
      name="login_form"
      className="myform loginform flex flex-col gap-1"
      onFinish={onFinish}
      layout={layout}
      size={size}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            type: "email",
            message: "Please input correct email format for ${name}",
          },
        ]}
      >
        <Input
          prefix={
            <IoMailOutline
              className="site-form-item-icon text-blue-ribbon-500"
              size={"30px"}
            />
          }
          placeholder="Email"
          className={clsx(inputClassName)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          name="password"
          prefix={
            <HiOutlineKey
              className="site-form-item-icon text-blue-ribbon-500"
              size={"30px"}
            />
          }
          type="password"
          placeholder="Password"
          className={clsx(inputClassName)}
        />
      </Form.Item>
      <div className="form-item-wrapper mb-6">
        <Link to="" className="text-blue-ribbon-500">
          Forgot Password?
        </Link>
      </div>
      <Form.Item className="w-full mb-6">
        <Button
          htmlType="submit"
          className={clsx(
            "login-form-button w-full bg-blue-ribbon-500 rounded-xl hover:bg-[#4fcb8d]",
            "font-semibold text-lg",
            "py-4 px-4 rounded-lg",
            "text-white flex items-center justify-center",
            "duration-500 transition-all"
          )}
        >
          Log in
        </Button>
      </Form.Item>
      <div className="sign-up-txt mb-0 text-center">
        <p className="txt">
          Not A Member ?{" "}
          <Link to="/" className="text-blue-ribbon-500 ml-1">
            Create An Account
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
