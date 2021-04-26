import { useEffect, useState } from "react";
import UserList from "./UserList";
import { useSelector } from "react-redux";
import { getUser } from "./userSlice";

const Users = ({ showFriends }) => {
  const [users, setUsers] = useState([]);
  const { token, friends } = useSelector(getUser);

  useEffect(() => {
    let result = [];
    try {
      const doti = async () => {
        if (showFriends) {
          result = friends;
        } else {
          const url = `${process.env.REACT_APP_API_URL}/users`;
          const rawResult = await fetch(url, {
            credentials: "include",
          });

          result = await rawResult.json();
        }

        result.error ? setUsers([]) : setUsers(result);
      };
      doti();
    } catch (e) {
      console.log("🚀 ~ file: Users.jsx ~ line 13 ~ getUsers ~ e", e);
    }
  }, [token, showFriends, friends]);

  return (
    <div>
      {showFriends && users.length === 0 && "Vous n'avez pas encore d'amis"}
      {!showFriends &&
        users.length === 0 &&
        "Connectez-vous pour partager avec vos amis"}
      {users.map((user, index) => (
        <UserList user={user} key={index}></UserList>
      ))}
    </div>
  );
};

export default Users;
