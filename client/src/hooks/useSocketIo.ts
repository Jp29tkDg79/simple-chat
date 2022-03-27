import { useEffect, useState } from "react";

import socketIoClient from "socket.io-client";

import { useSelector } from "../store";

import {
  RequestSocketConstTypes,
  ResponseSocketConstTypes,
  ResponseRequiredSocketTypes,
} from "../types/socketIo";

export const useSocketIo = <T extends ResponseRequiredSocketTypes | null>(
  responseEventName: ResponseSocketConstTypes,
  initialValue: T
) => {
  const user = useSelector((state) => state.curUser.user);

  const socket = socketIoClient({
    path: import.meta.env.VITE_SOCKETIO_PATH,
    auth: {
      email: user.email,
      token: user.token,
    },
    transports: ["websocket"],
  });
  const [socketRes, setSocketRes] = useState<T>(initialValue);
  const [socketError, setSocketError] = useState<string>("");

  useEffect(() => {
    socket.on(responseEventName, (data: T) => {
      setSocketRes(data);
    });

    socket.on("connect_error", (err: Error) => {
      console.log(`connect_error ${err.message}`);
      setSocketError(err.message);
    });
    return () => {
      socket.close();
    };
  }, []);

  const doSocket = <U>(eventName: RequestSocketConstTypes, data: U) => {
    socket.emit(eventName, { ...data });
  };

  return { doSocket, socketRes, socketError };
};
