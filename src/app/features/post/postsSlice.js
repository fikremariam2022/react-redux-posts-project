import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
  posts: [],
  status: "idle", // || "loading" | "succeeded" | "failed",
  error: null,
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    console.log("data.......................", { ...response });
    return response.data;
  } catch (err) {
    console.log("error fetching");
    return err.message;
  }
});
const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    updateReaction: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload;
        let existingPost = state.posts.find((p) => p.id === postId);
        existingPost.reactions[reaction] += 1;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        //add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addDefaultCase((state, action) => {
        console.log("default case");
      });
  },
});
export default postSlice.reducer;
export const { postAdded, updateReaction } = postSlice.actions;
export const selectAllPost = (state) => state.post.posts;
export const getPostStatus = (state) => state.post.status;
export const getPostError = (state) => state.post.error;
