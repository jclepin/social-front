import { useCallback, useEffect, useState } from "react";
import PostList from "./PostList";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { useHistory } from "react-router-dom";
import Complet from "../template/Complet";

const Wall = (props) => {
  let history = useHistory();
  const who = props.who || props.match?.params?.who;
  const [posts, setPosts] = useState([]);
  const { token } = useSelector(getUser);

  const getPosts = useCallback(async () => {
    let url = `${process.env.REACT_APP_API_URL}/posts`;
    let fetchOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (who !== undefined) {
      url = `${process.env.REACT_APP_API_URL}/posts/${who}`;
    }
    try {
      const rawResult = await fetch(`${url}`, fetchOptions);
      if (!rawResult.ok) {
        // setPosts([]);
        history.push("/");
        throw Error(rawResult.statusText);
      }
      const result = await rawResult.json();
      setPosts(result);
    } catch (e) {
      //   console.log("🚀 ~ file: Wall.jsx ~ line 38 ~ getPosts ~ e", e);
    }
  }, [token, who, history]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const getResponses = (postId) =>
    posts.filter((post) => post.parent === postId) || [];

  return (
    <Complet>
      {props.children}
      {posts
        .filter((post) => post.parent === null)
        .map((post) => (
          <PostList
            post={post}
            responses={getResponses(post.id)}
            key={post.id}></PostList>
        ))}
    </Complet>
  );
};

export default Wall;
