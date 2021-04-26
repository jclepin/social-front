import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { disconnect, getMe } from "./features/user/userSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const me = useSelector(getMe);
  let history = useHistory();

  const handleDisconnect = async () => {
    const raw = await fetch(`${process.env.REACT_APP_API_URL}/disconnect`, {
      headers: { "Content-Type": "application/json", credentials: "include" },
    });
    await raw.json();
    dispatch(disconnect());
    // localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <header className='header p-relative background'>
      <h1>AllWalls</h1>
      <p>Join - Share - Imagine - Create</p>
      {me?.id ? (
        <div>
          <p>{`Bonjour ${me.login}`}</p>
          <button className='top-right btn-xs' onClick={handleDisconnect}>
            Deconnexion
          </button>
        </div>
      ) : (
        <Link className='top-right btn btn-xs' to='/login'>
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
