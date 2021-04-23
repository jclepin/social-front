import React from "react";
import { Link } from "react-router-dom";
const UserList = ({ user }) => {
  const ShowStatus = () => {
    return <span className={`onLine ${!!user.status}`}></span>;
  };

  return (
    <article>
      <ShowStatus></ShowStatus>
      <Link to={`/user/${user.id}`}>{user.login}</Link>
    </article>
  );
};

export default UserList;
