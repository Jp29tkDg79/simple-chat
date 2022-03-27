import { useEffect } from "react";

import RightSide from "../../components/Chat/RightSide";
import LeftSide from "../../components/Chat/LeftSide";
import Header from "../../components/Chat/Header/Header";

import { useSocketIo } from "../../hooks/useSocketIo";
import {
  RequestChatRoomJoinTypes,
  ResponseChatRoomJoinTypes,
} from "../../types/chat";
import { useSelector } from "../../store";

import classes from "./Chat.module.css";

export default () => {
  const name = useSelector((state) => state.curUser.user.name);
  const { doSocket } = useSocketIo<ResponseChatRoomJoinTypes>(
    "response_chatroom_join",
    {}
  );

  useEffect(() => {
    doSocket<RequestChatRoomJoinTypes>("request_chatroom_join", { name });
  }, []);

  return (
    <>
      <Header />
      <main className={classes.container}>
        <div className={classes.leftSide}>
          <LeftSide />
        </div>
        <div className={classes.rightSide}>
          <RightSide />
        </div>
      </main>
    </>
  );
};
