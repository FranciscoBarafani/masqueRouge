import React from "react";
//Components
import { Avatar } from "antd";
import { MessageOutlined } from "@ant-design/icons";

import "./ChatButton.scss";

export default function ChatButton() {
  return (
    <div className="chat-button">
      <a
        href="
        "
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar
          size={60}
          shape="circle"
          icon={
            <MessageOutlined
              style={{ color: "white", backgroundColor: "transparent" }}
            />
          }
        />
      </a>
    </div>
  );
}
