import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReaction from "./PostReaction";
import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  //retrieve postId

  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post)
    return (
      <section>
        <h2>Post was not found</h2>
      </section>
    );

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <PostReaction post={post} />
    </article>
  );
};

export default SinglePostPage;
