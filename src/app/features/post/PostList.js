import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPost,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";
import { Link } from "react-router-dom";
export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") dispatch(fetchPosts());
  }, [postStatus, dispatch]);
  if (postStatus === "loading") {
    return <p>Loading...</p>;
  } else if (postStatus === "failed") {
    return <p>{postError}</p>;
  }

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post, index) => (
    <article key={index}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <Link to={`post/${post.id}`}>View Post</Link>

      <PostReaction post={post} />
    </article>
  ));
  return (
    <div>
      <section>
        <h2>Posts</h2>
        {renderPosts}
      </section>
    </div>
  );
}
