import { createSlice } from "@reduxjs/toolkit";
const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isLoginFormActive: true,
  },
  reducers: {
    toggleForm: (state) => {
      state.isLoginFormActive = !state.isLoginFormActive;
    },
  },
});

export const { toggleForm } = sessionSlice.actions;
export default sessionSlice.reducer;
