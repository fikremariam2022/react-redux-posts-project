import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/post/postsSlice";
import userReducer from "./features/users/usersSlice";
const store = configureStore({
  reducer: {
    post: postReducer,
    users: userReducer,
  },
});
export default store;
