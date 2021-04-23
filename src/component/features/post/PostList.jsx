import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getMe } from "../user/userSlice";

import { Link } from "react-router-dom";
import Respond from "./Respond";

const PostList = ({ post, responses }) => {
  const me = useSelector(getMe);
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {post.titre} <small>par</small>{" "}
          <Link className='btn btn-outline btn-sm' to={`/user/${post.user_id}`}>
            {me.id !== post.user_id ? `${post.login}` : `Moi`}
          </Link>
        </Card.Title>

        <Card.Subtitle className='mb-2 text-muted'>
          <small className='badge right'>
            {post.public ? "Publique" : "Privé"}
          </small>
        </Card.Subtitle>

        <Card.Text className='whiteSpace'>{post.content}</Card.Text>
      </Card.Body>
      {responses.map((response) => (
        <Card.Footer className='whiteSpace' key={response.id}>
          {response.content}
          <small> - {response.login}</small>
        </Card.Footer>
      ))}
      {me.id !== post.user_id && (
        <Card.Footer>
          <Respond parent={post.id} parentUserId={post.user_id}></Respond>
        </Card.Footer>
      )}
    </Card>
  );
};

export default PostList;
