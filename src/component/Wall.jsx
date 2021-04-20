import { useCallback, useEffect, useState } from "react";
import PostList from "./PostList";
import { useSelector } from "react-redux";
import { getToken } from "../features/token/tokenSlice";

const Wall = (props) => {
  const who = props.who || props.match?.params?.who;
  //   console.log("🚀 ~ file: Wall.jsx ~ line 5 ~ Wall ~ props", props);
  console.log("🚀 ~ file: Wall.jsx ~ line 5 ~ Wall ~ who", who);
  const [posts, setPosts] = useState([]);
  const token = useSelector(getToken);

  const getPosts = useCallback(() => {
    let url = `${process.env.REACT_APP_API_URL}/posts`;
    let fetchOptions = null;

    if (who !== undefined) {
      url = `${process.env.REACT_APP_API_URL}/posts/${who}`;
      fetchOptions = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    fetch(`${url}`, fetchOptions)
      .then((rawResult) => rawResult.json())
      .then((result) => setPosts(result));
  }, [token, who]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {props.children}
      {posts.map((post, index) => (
        <PostList post={post} key={index}></PostList>
      ))}
    </>
  );
};

export default Wall;
