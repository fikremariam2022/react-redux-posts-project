import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPost,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postsSlice";
import AddPostForm from "./AddPostForm";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [postStatus, dispatch]);
  console.log(postStatus);
  if (postStatus === "loading") {
    return <p>Loading...</p>;
  } else if (postStatus === "failed") {
    return <p>{postError}</p>;
  }

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <PostReaction post={post} />
    </article>
  ));
  return (
    <div>
      <AddPostForm />
      <section>
        <h2>Posts</h2>
        {renderPosts}
      </section>
    </div>
  );
}
