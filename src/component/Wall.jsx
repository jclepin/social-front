import { useCallback, useEffect, useState } from "react";
import PostList from "./PostList";

const Wall = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = useCallback(() => {
    fetch("/posts")
      .then((rawResult) => rawResult.json())
      .then((result) => setPosts(result));
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <h2>Posts</h2>
      {posts.map((post, index) => (
        <PostList post={post} key={index}></PostList>
      ))}
    </>
  );
};

export default Wall;
