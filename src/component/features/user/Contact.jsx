import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, addFriendAsync } from "./userSlice";

const Contact = (props) => {
  const { who } = props.match.params;
  const [message, setToUser] = useState("");
  const dispatch = useDispatch();
  const { token, friends } = useSelector(getUser);

  const handleFriend = () => {
    try {
      dispatch(addFriendAsync({ token, who })).then(({ payload }) => {
        payload?.erreur && setToUser("Problème lors de la connexion");
      });
    } catch (e) {
      console.log("🚀 ~ file: Login.jsx ~ line 48 ~ handleLogin ~ e", e);
    }
  };

  const isFriend = () => {
    return friends.some((friend) => friend.id === parseInt(who)) ? true : false;
  };

  const printButton = () => {
    if (message) return message;
    else if (isFriend()) return `Je suis ton ami-e`;
    else {
      return <button onClick={handleFriend}>Deviens mon ami ^^</button>;
    }
  };
  return <div className='jumbotron'>{printButton()}</div>;
};

export default Contact;
