import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((u) => u.id === (Number(userId) || 0));

  return (
    <span className="postCredit">
      By {author ? author.name : "Unknown Author"}
    </span>
  );
};
export default PostAuthor;
