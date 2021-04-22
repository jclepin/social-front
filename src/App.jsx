import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wall from "./component/Wall";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getMeAsync } from "./features/user/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";

import Messages from "./component/Messages";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Register from "./component/Register";

// heroku : mars/create-react-app

function App() {
  const dispatch = useDispatch();
  const { me } = useSelector(getUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        dispatch(getMeAsync(token)).then(({ payload }) => {
          // payload?.erreur && setToUser("Problème lors de la connexion");
        });
      } catch (e) {
        console.log("🚀 ~ file: Login.jsx ~ line 48 ~ handleLogin ~ e", e);
      }
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/me'>
              <Wall who='me' />
            </Route>
            <Route path='/messages'>
              <Messages />
            </Route>
            <Route
              path='/user/:who'
              render={(props) => (
                <Wall {...props}>
                  <Contact {...props}></Contact>
                </Wall>
              )}></Route>
            <Route path='/'>{me?.id ? <Wall /> : <Login />}</Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
