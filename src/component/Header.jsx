import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, destroy, getToken } from "../features/token/tokenSlice";

const Header = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  //   console.log("🚀 ~ file: Header.jsx ~ line 10 ~ Header ~ token", token);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })
      .then((rawResult) => rawResult.json())
      .then((result) => {
        // console.log("🚀 ~ file: Header.jsx ~ line 12 ~ .then ~ result", result);
        localStorage.setItem("token", result["token"]);
        dispatch(add(result["token"]));
      });
  };

  const handleDisconnect = () => {
    dispatch(destroy());
    localStorage.removeItem("token");
  };

  return (
    <header className='jumbotron'>
      <h1>AllWalls</h1>
      <p>Join - Share - Imagine - Create</p>
      {token ? (
        <button onClick={handleDisconnect}>Deconnexion</button>
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
