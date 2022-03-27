
import ChatItem from "./ChatItem/ChatItem";

import { ResponseChatMessageTypes } from "../../../../types/chat";

import classes from "./ChatList.module.css";

type ChatListProps = {
  chatList: ResponseChatMessageTypes;
};

const ChatList = (props: ChatListProps) => {
  return (
    <ul className={classes.chatList}>
      {props.chatList &&
        props.chatList.history.map((data, idx) => (
          <ChatItem key={idx} {...data} />
        ))}
    </ul>
  );
};

export default ChatList;
