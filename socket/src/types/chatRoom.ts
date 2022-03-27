export type MemberTypes = {
  name: string;
}

export type ChatTypes = {
  name: string;
  message: string;
}

export type ChatRoomTypes = {
  roomName: string;
  history: ChatTypes[];
  members: MemberTypes[];
};