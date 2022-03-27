import { REQUESTSOCKETIOCONSTS, RESPONSESOCKETIOCONSTS } from "../constants/socketIo";

export type requestSocketConstTypes = typeof REQUESTSOCKETIOCONSTS[keyof typeof REQUESTSOCKETIOCONSTS];

export type responseSocketConstTypes = typeof RESPONSESOCKETIOCONSTS[keyof typeof RESPONSESOCKETIOCONSTS];
