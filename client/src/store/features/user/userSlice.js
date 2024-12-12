import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    username: "",
    email: "",
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

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
