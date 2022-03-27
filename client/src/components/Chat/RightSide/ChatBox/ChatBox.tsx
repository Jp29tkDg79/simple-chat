import { useState } from "react";

import { IoSend } from "react-icons/io5";

import { RequestSocketConstTypes } from "../../../../types/socketIo";
import { RequestChatMessageTypes } from "../../../../types/chat";
import { splitNewLineTextLength } from "../../../../utils/utils";
import { isEmpty } from "../../../../utils/validation";

import classes from "./ChatBox.module.css";

type ChatBoxProps = {
  name: string;
  doSocket: <U>(eventName: RequestSocketConstTypes, data: U) => void;
};

const ChatBox = (props: ChatBoxProps) => {
  const [message, setMessage] = useState("");

  const onSendMessageHandler = () => {
    if (isEmpty(message)) {
      alert("メッセージが入力されていません。");
      return;
    }

    props.doSocket<RequestChatMessageTypes>("request_message", {
      name: props.name,
      message,
    });
    setMessage("");
  };

  return (
    <div
      style={{
        position: "relative",
        height: `60px * ${splitNewLineTextLength(message)}`
      }}
    >
      <div className={classes["chatBox-input"]}>
        <textarea
          placeholder="Type a message"
          rows={
            splitNewLineTextLength(message) > 6
              ? 6
              : splitNewLineTextLength(message)
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <IoSend onClick={onSendMessageHandler} />
      </div>
    </div>
  );
};

export default ChatBox;
