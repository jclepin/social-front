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
    getUsers();
  }, [getUsers]);

  return (
    <>
      {users.map((user, index) => (
        <UserList user={user} key={index}></UserList>
      ))}
    </>
  );
};

export default Users;
