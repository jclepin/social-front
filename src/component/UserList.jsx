const UserList = ({ user }) => {
  user.status = user.status ?? false;

  const ShowStatus = () => {
    return <span className={`onLine ${!!user.status}`}></span>;
  };

  return (
    <article>
      <ShowStatus></ShowStatus>
      {user.login}
    </article>
  );
};

export default UserList;
