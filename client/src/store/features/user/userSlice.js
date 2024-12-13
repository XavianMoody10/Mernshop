import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      _id: "",
      username: "",
      email: "",
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },

    resetUser: (state) => {
      state.value = { _id: "", username: "", email: "" };
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
