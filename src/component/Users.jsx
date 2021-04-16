import { useCallback, useEffect, useState } from "react";
import UserList from "./UserList";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((rawResult) => rawResult.json())
      .then((result) => setUsers(result));
  }, []);

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
