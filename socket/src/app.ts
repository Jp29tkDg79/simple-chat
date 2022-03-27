import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";

import {
  requestSocketConstTypes,
  responseSocketConstTypes,
} from "./types/socketIo";

import ChatRoom from "./models/chatRoom.model";

import { ChatTypes, MemberTypes } from "./types/chatRoom";

import * as validMiddlewares from "./middlewares/validationSocket";

const app = express();

const ROOMNAME = "room";

const httpServer = http.createServer(app);
const io = new Server(httpServer, { transports: ["websocket"] });

io.use(validMiddlewares.validRequestUser);

io.on("connection", (socket: Socket) => {
  socket.on<requestSocketConstTypes>(
    "request_chatroom_join",
    async (data: MemberTypes) => {
      const chatRoom = await ChatRoom.findOne({ roomName: ROOMNAME });

      let updateChatRoom;
      if (!chatRoom) {
        updateChatRoom = await ChatRoom.build({
          roomName: ROOMNAME,
          members: [],
          history: [],
        });
        await updateChatRoom.save();
      } else {
        updateChatRoom = chatRoom;
      }

      updateChatRoom.members.push({ ...data });
      await updateChatRoom.save();

      io.emit<responseSocketConstTypes>("response_chatroom_join", {
        status: true,
        message: `${data.name}さんが参加しました。`,
      });
    }
  );

  socket.on<requestSocketConstTypes>("request_member_list", async () => {
    const chatRoom = await ChatRoom.findOne({ roomName: ROOMNAME });
    if (chatRoom) {
      io.emit<responseSocketConstTypes>("response_member_list", {
        list: chatRoom.members,
        status: true,
        message: "success",
      });
    }
  });

  socket.on<requestSocketConstTypes>(
    "request_message",
    async (data: ChatTypes) => {
      const chatRoom = await ChatRoom.findOne({ roomName: ROOMNAME });

      if (chatRoom) {
        if (data.message) {
          chatRoom.history.push({ ...data });
          await chatRoom.save();
        }
        io.emit<responseSocketConstTypes>("response_message", {
          history: chatRoom.history,
          status: true,
          message: "success",
        });
      }
    }
  );

  socket.on<requestSocketConstTypes>(
    "logout",
    async (data: { name: string }) => {
      const chatRoom = await ChatRoom.findOne({ roomName: ROOMNAME });
      if (chatRoom) {
        const filterMembers = chatRoom.members.filter(
          (v) => v.name !== data.name
        );
        chatRoom.members = filterMembers;
        await chatRoom.save();

        io.emit<responseSocketConstTypes>("response_member_list", {
          list: chatRoom.members,
          status: true,
          message: "success",
        });
      }
    }
  );

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("disconnect");
  });
});

export default httpServer;
