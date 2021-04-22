import { useCallback, useEffect, useState } from "react";
import UserList from "./UserList";
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

const Users = ({ showFriends }) => {
  const [users, setUsers] = useState([]);
  const { token, friends } = useSelector(getUser);

  const getUsers = useCallback(async () => {
    let result = [];

    if (showFriends) {
      result = friends;
    } else {
      const url = showFriends
        ? `${process.env.REACT_APP_API_URL}/friends`
        : `${process.env.REACT_APP_API_URL}/users`;
      const rawResult = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      result = await rawResult.json();
    }

    result.error ? setUsers([]) : setUsers(result);
  }, [token, showFriends, friends]);

  useEffect(() => {
    try {
      getUsers();
    } catch (e) {
      console.log("🚀 ~ file: Users.jsx ~ line 13 ~ getUsers ~ e", e);
    }
  }, [getUsers]);

  return (
    <>
      {showFriends && users.length === 0 && "Vous n'avez pas encore d'amis"}
      {!showFriends &&
        users.length === 0 &&
        "Connectez-vous pour partager avec vos amis"}
      {users.map((user, index) => (
        <UserList user={user} key={index}></UserList>
      ))}
    </>
  );
};

export default Users;
