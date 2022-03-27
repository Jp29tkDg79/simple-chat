import { ResponseRequiredSocketTypes } from "./socketIo";

export type ChatTypes = {
  name: string;
  message: string;
};

export type RequestChatRoomJoinTypes = {
  name: string;
};

export type ResponseChatRoomJoinTypes = ResponseRequiredSocketTypes;

export type RequestChatMessageTypes = ChatTypes;

export type ResponseChatMessageTypes = {
  history: ChatTypes[];
} & ResponseRequiredSocketTypes;

type MemberTypes = {
  name: string;
}

export type ResponseMemberListTypes = {
  list: MemberTypes[];
} & ResponseRequiredSocketTypes;
