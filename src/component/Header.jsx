import { useState } from "react";

const Header = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
    })
      .then((rawResult) => rawResult.json())
      .then((result) => {
        console.log("🚀 ~ file: Header.jsx ~ line 12 ~ .then ~ result", result);
        localStorage.setItem("token", result["token"]);
      });
  };

  return (
    <header className='jumbotron'>
      <h1>AllWalls</h1>
      <p>Join - Share - Imagine - Create</p>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Connexion</button>
      </form>
    </header>
  );
};

export default Header;
