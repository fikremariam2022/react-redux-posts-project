//import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";
import PostList from "./app/features/post/PostList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* {posts.map((post) => (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </>
        ))} */}
        <PostList />
      </div>
    </Provider>
  );
}

export default App;
