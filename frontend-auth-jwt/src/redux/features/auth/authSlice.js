import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
};
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { isRejectedWithValue }) => {
    console.log({ isRejectedWithValue });
    try {
      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      console.log(response.token);
      const data = await response.json();
      return data;
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(userData),
    });

    if(!response.ok){
      throw Error("User not found")
    }
  const data = await response.json();
  const token = data.token;
  localStorage.setItem("token", token.slice(7));
  console.log({ data });
  //decoded and login user
  return data;
  } catch (error) {
    console.error(error)
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
