import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getMe } from "../features/me/meSlice";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const PostList = ({ post }) => {
  const me = useSelector(getMe);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.titre}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {post.login}
          {me.id === post.user_id && <small> - (me)</small>}
        </Card.Subtitle>
        <Card.Text>{post.content}</Card.Text>
        {me.id !== post.user_id && (
          <Link
            className='btn btn-sm bottom-right'
            to={`/user/${post.user_id}`}>
            Profil de {post.login}
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostList;
