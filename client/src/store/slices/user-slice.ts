import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserTypes } from "../../types/user-slice";

type UserSlice = {
  user: UserTypes;
  isLogin: boolean;
};

const initialState: UserSlice = {
  user: {
    name: "",
    email: "",
    token: "",
  },
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state: UserSlice, action: PayloadAction<UserTypes>) {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.token = action.payload.token;
      state.isLogin = true;
    },
    clearUserState(state: UserSlice) {
      state.user.name = "";
      state.user.email = "";
      state.user.token = "";
      state.isLogin = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
