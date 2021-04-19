import { useCallback, useEffect, useState } from "react";
import UserList from "./UserList";
import { useSelector } from "react-redux";
import { getToken } from "../features/token/tokenSlice";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector(getToken);

  const getUsers = useCallback(async () => {
    const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await rawResult.json();
    result.error ? setUsers([]) : setUsers(result);
  }, [token]);

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
