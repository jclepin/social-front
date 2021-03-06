import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "./userSlice";
import Basic from "../../../app/template/Basic";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [toUser, setToUser] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    // if (login?.length === 0 || password?.length === 0) return false;
    try {
      dispatch(loginAsync({ login, password })).then(({ payload }) => {
        if (payload.erreur) {
          setToUser("Problème lors de la connexion");
        } else {
          history.push("/");
        }
      });
    } catch (e) {
      console.log("🚀 ~ file: Login.jsx ~ line 48 ~ handleLogin ~ e", e);
    }
  };

  return (
    <Basic>
      <h1>Login</h1>
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
        <p>{toUser}</p>
      </form>
      <Link to='/register'>Register</Link>
    </Basic>
  );
};
export default Login;
