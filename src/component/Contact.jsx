import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, addFriend } from "../features/user/userSlice";
import addFriendApi from "../api/addFriendApi";
const Contact = (props) => {
  const { who } = props.match.params;
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();
  const { token, me, friends } = useSelector(getUser);
  const handleFriend = () => {
    // addFriendApi()
    //   ? setmessage("Vous êtes maintenant amis ^^")
    //   : setmessage("ERROR");
  };
  return (
    <div>
      {message || <button onClick={handleFriend}>Deviens mon ami ^^</button>}
    </div>
  );
};

export default Contact;
