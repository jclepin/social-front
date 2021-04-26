import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wall from "./component/features/post/Wall";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getMeAsync,
  disconnect,
} from "./component/features/user/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Messages from "./component/features/message/Messages";
import Contact from "./component/features/user/Contact";
import Login from "./component/features/user/Login";
import Register from "./component/features/user/Register";
import NotFound from "./component/NotFound";
import Cookie from "./component/Cookie";

// heroku : mars/create-react-app

function App(props) {
  const dispatch = useDispatch();
  const { me } = useSelector(getUser);

  useEffect(() => {
    try {
      // const getCycleMe = setInterval(() => {
      dispatch(getMeAsync()).then(({ payload }) => {
        payload?.erreur && dispatch(disconnect());
      });
      // }, 2000);
      // return () => clearInterval(getCycleMe);
    } catch (e) {
      console.log("🚀 ~ file: Login.jsx ~ line 48 ~ handleLogin ~ e", e);
    }
  }, [dispatch]);

  const switchRoute = () => {
    if (me?.id) {
      return (
        <Switch>
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
          <Route exact path='/'>
            <Wall />
          </Route>
          <Route component={NotFound} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path='/cookie'>
            <Cookie />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route component={NotFound} />
        </Switch>
      );
    }
  };

  return (
    <div className='App'>
      <Router>
        <Container>{switchRoute()}</Container>
      </Router>
    </div>
  );
}

export default App;
