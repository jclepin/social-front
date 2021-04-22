import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
