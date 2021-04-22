import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getMe } from "../features/user/userSlice";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Respond from "./Respond";

const PostList = ({ post, responses }) => {
  const me = useSelector(getMe);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.titre}</Card.Title>
        {me.id !== post.user_id && (
          <>
            <Link
              className='btn btn-outline btn-sm right'
              to={`/user/${post.user_id}`}>
              Profil de {post.login}
            </Link>
          </>
        )}
        <Card.Subtitle className='mb-2 text-muted'>
          {post.login}
          {me.id === post.user_id && <small> - (me)</small>}
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
