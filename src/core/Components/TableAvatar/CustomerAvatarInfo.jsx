import { Avatar } from "antd";
import React from "react";
import { isValidUrl } from "../../utils/utils";

import avatar from "../../assets/images/avatar_2.svg";

const CustomerAvatarInfo = ({ customerData }) => {
  const renderAvatarInfo = () => {
    return (
      <div className="flex gap-3 items-center">
        <Avatar
          src={isValidUrl(customerData.avatar) ? customerData.avatar : avatar}
          size={60}
          className="customer-avatar"
        />
        <div className="customer-info flex justify-center gap-1 flex-col">
          <div className="customer-name font-semibold text-[#292d32] text-base">
            {customerData.fullname}
          </div>
          <div className="customer-phone text-lg">{customerData.sdt}</div>
        </div>
      </div>
    );
  };
  return renderAvatarInfo();
};

export default CustomerAvatarInfo;
