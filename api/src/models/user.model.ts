import mongoose, {Model, Document, Schema} from "mongoose";

import bcrypt from 'bcryptjs';

const TABNENAME = 'users';

type UserAttrs = {
  name: string;
  email: string;
  password: string;
  token: string;
}

interface UserDocument extends UserAttrs, Document {
  compare(enteredPassword: string): Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    },
    timestamps: true
  }
)

userSchema.statics.build = function (attrs: UserAttrs) {
  return new User(attrs);
}

userSchema.methods.compare = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model<UserDocument, UserModel>(TABNENAME, userSchema);

export default User;