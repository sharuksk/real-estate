import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
