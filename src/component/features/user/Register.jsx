import { Link, useHistory } from "react-router-dom";
import Basic from "../../../app/template/Basic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "./userSlice";
import registerApi from "./api/registerApi";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [toUser, setToUser] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    // if (login?.length === 0 || password?.length === 0) return false;
    try {
      const result = await registerApi({ login, password });

      if (result.ok) {
        dispatch(loginAsync({ login, password })).then(({ payload }) => {
          if (payload.erreur) setToUser("Problème lors de la connexion");
          else history.push("/");
        });
      } else {
        setToUser(result.erreur);
      }
    } catch (e) {
      console.log("🚀 ~ file: Login.jsx ~ line 48 ~ handleLogin ~ e", e);
    }
  };

  return (
    <Basic>
      <h1>Register</h1>
      <form onSubmit={(e) => handleRegister(e)}>
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
        <button type='submit'>Enregistrer</button>
        <p>{toUser}</p>
      </form>
      <Link to='/login'>Loging</Link>
    </Basic>
  );
};

export default Register;
