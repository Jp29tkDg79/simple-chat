import { useEffect } from "react";

import { useSocketIo } from "../../../hooks/useSocketIo";
import { useSelector } from "../../../store";
import { ResponseChatMessageTypes } from "../../../types/chat";

import ChatList from "./ChatList/ChatList";
import ChatBox from "./ChatBox/ChatBox";

import classes from "./RightSide.module.css";

export default () => {
  const user = useSelector((state) => state.curUser.user);

  const { doSocket, socketRes, socketError } =
    useSocketIo<ResponseChatMessageTypes>("response_message", {
      history: [],
    });

  useEffect(() => {
    doSocket<null>("request_message", null);
  }, []);

  if (socketError) {
    return (
      <div className={classes.errorMessageContainer}>
        <h1 className={classes.errorTitle}>Connection Error</h1>
        <p className={classes.errorMessage}>{socketError}</p>
      </div>
    );
  }

  return (
    <>
      <ChatList chatList={socketRes} />
      <ChatBox name={user.name} doSocket={doSocket} />
    </>
  );
};
