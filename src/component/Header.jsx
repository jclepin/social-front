import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, destroy, getToken } from "../features/token/tokenSlice";
import { addMe, destroyMe, getMe } from "../features/me/meSlice";

const Header = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
          dispatch(addMe(result));
        });
    }
  }, [dispatch, token]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })
      .then((rawResult) => rawResult.json())
      .then((result) => {
        localStorage.setItem("token", result["token"]);
        dispatch(add(result["token"]));
        dispatch(addMe(result["user"]));
      });
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
    <header>
      <h1>AllWalls</h1>
      <p>Join - Share - Imagine - Create</p>
      {token ? (
        <div>
          <p>{`Bonjour ${me.login}`}</p>
          <p>
            <button>Mes publications</button>
            <button onClick={handleDisconnect}>Deconnexion</button>
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => handleLogin(e)}>
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
