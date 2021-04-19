import { Card } from "react-bootstrap";

const PostList = ({ post }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.titre}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{post.login}</Card.Subtitle>
        <Card.Text>{post.content}</Card.Text>
        {/* <Card.Link href='#'>Link</Card.Link>
        <Card.Link href='#'>Follow</Card.Link> */}
      </Card.Body>
    </Card>
  );
};

export default PostList;
