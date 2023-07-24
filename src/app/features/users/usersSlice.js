import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: "Andrew",
    },
    {
      id: 2,
      name: "Mike",
    },
    {
      id: 3,
      name: "Jhon",
    },
  ],
};
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
});
export default userSlice.reducer;
export const selectAllUsers = (state) => state.users.users;
