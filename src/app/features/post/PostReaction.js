import { useDispatch } from "react-redux";
import { updateReaction } from "./postsSlice";
const emoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "🧡",
  rocket: "🚀",
  coffee: "☕",
};
const PostReaction = ({ post }) => {
  const dispatch = useDispatch();
  const handleClick = (e, reaction) => {
    e.preventDefault();
    dispatch(updateReaction({ postId: post.id, reaction }));
  };
  const keys = Object.keys(post.reactions);
  const renderReaction = keys.map((k) => (
    <button
      style={{
        marginRight: 6,
        backgroundColor: "transparent",
        border: "none",
        color: "white",
      }}
      key={k}
      onClick={(e) => handleClick(e, k)}
    >
      {emoji[k]}
      <span style={{ fontSize: 14 }}>{post.reactions[k]}</span>
    </button>
  ));
  return <div>{renderReaction}</div>;
};

export default PostReaction;
