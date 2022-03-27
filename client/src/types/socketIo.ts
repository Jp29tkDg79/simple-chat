import { REQUESTSOCKETIOCONSTS, RESPONSESOCKETIOCONSTS } from "../constants/socketIo";

export type RequestSocketConstTypes = typeof REQUESTSOCKETIOCONSTS[keyof typeof REQUESTSOCKETIOCONSTS];

export type ResponseSocketConstTypes = typeof RESPONSESOCKETIOCONSTS[keyof typeof RESPONSESOCKETIOCONSTS];

export type ResponseRequiredSocketTypes = {
  status?: boolean;
  message?: string;
}