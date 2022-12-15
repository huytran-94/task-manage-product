import React from "react";

import { notification} from "antd";

const Notification = (type, message = "", desc = "") => {
  return notification[type]({
    message: message,
    description: desc,
  });
};

export default Notification;
