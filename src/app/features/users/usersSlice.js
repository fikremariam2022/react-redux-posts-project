import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USER_URL = "https://jsonplaceholder.typicode.com/users";
const initialState = {
  users: [],
  status: "idle",
  error: null,
};
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(`${USER_URL}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("order fullfillde", action.payload);
      state.users = state.users.concat(action.payload);
      // return action.payload;
    });
  },
});
export default userSlice.reducer;
export const selectAllUsers = (state) => state.users.users;
