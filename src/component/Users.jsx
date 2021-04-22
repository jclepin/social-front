import { useCallback, useEffect, useState } from "react";
import UserList from "./UserList";
import { useSelector } from "react-redux";
import { setFriends, getUser, getFriends } from "../features/user/userSlice";

const Users = ({ showFriends }) => {
  const [users, setUsers] = useState([]);
  const { token } = useSelector(getUser);
  let friends = useSelector(getFriends);

  const getUsers = useCallback(async () => {
    let result = [];

    const url = showFriends
      ? `${process.env.REACT_APP_API_URL}/friends`
      : `${process.env.REACT_APP_API_URL}/users`;
    const rawResult = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    result = await rawResult.json();
    showFriends && setFriends(result);
    result.error ? setUsers([]) : setUsers(result);
  }, [token, showFriends]);

  useEffect(() => {
    try {
      getUsers();
    } catch (e) {
      console.log("🚀 ~ file: Users.jsx ~ line 13 ~ getUsers ~ e", e);
    }
  }, [getUsers]);

  return (
    <>
      {users.length === 0 && "Connectez-vous pour partager avec vos amis"}
      {users.map((user, index) => (
        <UserList user={user} key={index}></UserList>
      ))}
    </>
  );
};

export default Users;
