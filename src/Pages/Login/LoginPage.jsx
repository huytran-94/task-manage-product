import { message, Space } from "antd";
import React, { useEffect } from "react";
import Container from "../../core/Components/Container/Container";
import PageWrapper from "../../core/Components/PageWrapper/PageWrapper";

import logoPage from "../../core/assets/images/logo.png";

import LoginForm from "../../core/Components/Forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import USER_SERVICE from "../../core/services/userServ";
import { useDispatch } from "react-redux";
import { userActions } from "../../core/redux/slice/userSlice";
import Notification from "../../core/Components/Notification/Notification";
import { LOCAL_SERVICE } from "../../core/services/localServ";

import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (LOCAL_SERVICE.user.get()) {
      navigate("/");
    }
  }, []);

  const handleFinish = (values) => {
    Promise.all([
      USER_SERVICE.checkAdminInfo(values),
      USER_SERVICE.checkUserInfo(values),
      USER_SERVICE.checkMasterInfo(values),
    ])
      .then((res) => {
        console.log("res");
        console.log(res);
        if (res[0].length === 0 && res[1].length === 0 && res[2].length === 0) {
          Notification("error", "Login fails", "Please check your info again");
          return;
        } else {
          Notification("success", "Login ok", "Please wait a minute");
          if (res[0].length) {
            setTimeout(() => {
              navigate("/");
              dispatch(userActions.setUserProfile(res[0][0]));
              LOCAL_SERVICE.user.set(res[0][0], 
              );
            }, 2500);
          }

          if (res[1].length) {
            setTimeout(() => {
              navigate("/");
              dispatch(userActions.setUserProfile(res[1][0]));
              LOCAL_SERVICE.user.set(res[1][0], "user");
            }, 2500);
          }

          if (res[2].length) {
            setTimeout(() => {
              navigate("/");
              dispatch(userActions.setUserProfile(res[2][0]));
              LOCAL_SERVICE.user.set(res[2][0], "master");
            }, 2500);
          }
        }
      })
      .catch((error) => {
        Notification("error", "Login fails", "Please check your info again");
        console.log(error);
      });
  };

  const renderPage = () => {
    return (
      <PageWrapper className="page-login h-full ">
        <Container className="h-full">
          <div className="wrapper h-full mx-auto flex items-center justify-center">
            <Space
              className="form-wrapper bg-white rounded-[15px] p-7 max-w-[500px] w-full"
              align="center"
              direction="vertical"
              size={30}
            >
              <div className="form-header text-center w-full">
                <Link to="/" className="pb-8 flex items-center justify-center">
                  <img src={logoPage} alt="logo-page" className="logo" />
                </Link>
                <h3 className="form-title border-t border-solid border-[#EBF1FF] pt-8 text-xl font-semibold mb-0">
                  Login
                </h3>
              </div>
              <div className="form-body">
                <LoginForm handleFinish={handleFinish} />
              </div>
              <div className="social-link">
                <ul className="account-social-link flex justify-center items-center gap-5">
                  <li>
                    <Link
                      to="https://www.google.com/"
                      target="_blank"
                      className="w-12 h-12 rounded-full  bg-[#EBF1FF] flex items-center justify-center"
                    >
                      <AiOutlineGoogle
                        className="text-blue-ribbon-500"
                        size={20}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.facebook.com/"
                      target="_blank"
                      className="w-12 h-12 rounded-full text-blue-ribbon-500 bg-[#EBF1FF] flex items-center justify-center"
                    >
                      <FaFacebookF className="text-blue-ribbon-500" size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.twitter.com/"
                      target="_blank"
                      className="w-12 h-12 rounded-full text-blue-ribbon-500 bg-[#EBF1FF] flex items-center justify-center"
                    >
                      <FaTwitter className="text-blue-ribbon-500" size={16} />
                    </Link>
                  </li>
                </ul>
              </div>
            </Space>
          </div>
        </Container>
      </PageWrapper>
    );
  };

  return renderPage();
};

export default LoginPage;
