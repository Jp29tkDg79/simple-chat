import { Socket } from "socket.io";

import bcrypt from "bcryptjs";
import { SALT } from "../constants/salt";

export const validRequestUser = async (
  socket: Socket,
  next: (err?: any | undefined) => void
) => {
  const { email, token } = socket.handshake.auth;
  console.log(email + " " + token)
  const match = await bcrypt.compare(SALT + email, token);
  if (match) {
    next();
  } else {
    next(new Error("token is unmatch!"));
  }
};
