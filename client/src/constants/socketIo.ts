export const REQUESTSOCKETIOCONSTS = {
  REQUEST_MEMBER_LIST: 'request_member_list',
  REQUEST_CHATROOM_JOIN: 'request_chatroom_join',
  REQUEST_MESSAGE: 'request_message',
  LOGOUT: 'logout'
} as const;


export const RESPONSESOCKETIOCONSTS = {
  RESPONSE_MEMBER_LIST: 'response_member_list',
  RESPONSE_MESSAGE: 'response_message',
  RESPONSE_TOKEN: 'response_token',
  RESPONSE_CHATROOM_JOIN: 'response_chatroom_join',
  LOGOUT: 'logout'
} as const;
