//import "./App.css";
import PostList from "./app/features/post/PostList";
import Layout from "./components/Layout";
import SinglePostPage from "./app/features/post/SinglePostPage";
import { Route, Routes, Navigate } from "react-router-dom";
import AddPostForm from "./app/features/post/AddPostForm";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
