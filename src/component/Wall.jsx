import { useCallback, useEffect, useState } from "react";
import PostList from "./PostList";

const Wall = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then((rawResult) => rawResult.json())
      .then((result) => setPosts(result));
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {posts.map((post, index) => (
        <PostList post={post} key={index}></PostList>
      ))}
    </>
  );
};

export default Wall;
