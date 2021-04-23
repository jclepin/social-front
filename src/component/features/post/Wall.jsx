import { useSelector, useDispatch } from "react-redux";
import { getPostAsync, getPosts } from "./postSlice";
import Complet from "../../../app/template/Complet";
import PostList from "./PostList";
import { useEffect } from "react";
import { getUser } from "../user/userSlice";

const Wall = (props) => {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const { token, friends, me } = useSelector(getUser);
  const who = props.who || props.match?.params?.who;

  useEffect(() => {
    try {
      token &&
        dispatch(getPostAsync({ token, who })).then(({ payload }) => {
          // payload.erreur && setToUser("Problème lors de la connexion");
        });
      if (token) {
        const getCyclePosts = setInterval(() => {
          dispatch(getPostAsync({ token, who })).then(({ payload }) => {
            // payload.erreur && setToUser("Problème lors de la connexion");
          });
        }, 5000);
        return () => clearInterval(getCyclePosts);
      }
    } catch (e) {
      console.log("🚀 ~ file: Wall.jsx ~ line 24 ~ getPosts ~ e", e);
    }
  }, [token, who, dispatch]);

  const getResponses = (postId) =>
    (posts && posts.filter((post) => post.parent === postId)) || [];

  const isFriend = (who) => {
    return friends.some((friend) => friend.id === parseInt(who)) ||
      me.id === parseInt(who)
      ? true
      : false;
  };

  return (
    <Complet>
      {props.children}
      {posts &&
        posts
          .filter((post) => post.public || isFriend(post.user_id))
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
