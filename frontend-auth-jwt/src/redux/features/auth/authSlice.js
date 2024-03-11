import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { isRejectedWithValue }) => {
    console.log({ isRejectedWithValue });
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log({ response });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      console.log({ data });
      return data;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function

export default authSlice.reducer;
