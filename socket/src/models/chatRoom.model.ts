import mongoose, { Model, Document, Schema } from "mongoose";

import { ChatRoomTypes, ChatTypes, MemberTypes } from "../types/chatRoom";

const TABLENAME = "chatRooms";

interface MemberDocument extends MemberTypes, Document {};

const memberSchema = new Schema<MemberDocument>(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    }
  }
)

interface ChatDocument extends ChatTypes, Document {};

const chatSchema = new Schema<ChatDocument>(
  {
    name: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true
  }
)


interface ChatDocument extends ChatRoomTypes, Document {}

interface ChatModel extends Model<ChatDocument> {
  build(attrs: ChatRoomTypes): ChatDocument;
}

const chatRoomSchema = new Schema<ChatDocument>(
  {
    roomName: {
      type: String,
      required: true,
    },
    history: {
      type: [chatSchema],
      required: true,
    },
    members: {
      type: [memberSchema],
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

chatRoomSchema.statics.build = function (attrs: ChatRoomTypes) {
  return new ChatRoom(attrs);
};

const ChatRoom = mongoose.model<ChatDocument, ChatModel>(TABLENAME, chatRoomSchema);

export default ChatRoom;
