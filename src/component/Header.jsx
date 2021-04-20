import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, destroy, getToken } from "../features/token/tokenSlice";
import { addMe, destroyMe, getMe } from "../features/me/meSlice";
import { bug, printToUser } from "../Utils/fn";

const Header = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [toUser, setToUser] = useState("");

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const me = useSelector(getMe);

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((rawResult) => rawResult.json())
        .then((result) => {
          if (result.error === "jwt expired") {
            dispatch(addMe({}));
            localStorage.removeItem("token");
            dispatch(add(""));
          } else {
            dispatch(addMe(result));
          }
        });
    }
  }, [dispatch, token]);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      })
        .then((rawResult) => rawResult.json())
        .then((result) => {
          if (result.error) {
            setToUser(result.error);
          } else {
            setToUser("");
            localStorage.setItem("token", result["token"]);
            dispatch(add(result["token"]));
            dispatch(addMe(result["user"]));
          }
        });
    } catch (e) {
      bug.log("🚀 ~ file: Header.jsx ~ line 48 ~ handleLogin ~ e", e);
    }
  };

  const handleDisconnect = async () => {
    const raw = await fetch(`${process.env.REACT_APP_API_URL}/disconnect`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await raw.json();
    dispatch(destroy());
    dispatch(destroyMe());
    localStorage.removeItem("token");
    return response;
  };

  return (
    <header className='header p-relative'>
      <h1>AllWalls</h1>
      <p>Join - Share - Imagine - Create</p>
      {token ? (
        <div>
          <p>{`Bonjour ${me.login}`}</p>
          <p>
            <button className='top-right btn-xs' onClick={handleDisconnect}>
              Deconnexion
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => handleLogin(e)}>
          {printToUser(toUser)}
          <label>
            <input
              type='text'
              placeholder='login'
              name='login'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <label>
            <input
              type='password'
              placeholder='password'
              name='password'
              autoComplete='on'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type='submit'>Connexion</button>
        </form>
      )}
    </header>
  );
};

export default Header;
