import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Wall from "./component/Wall";
import Users from "./component/Users";
import { useDispatch } from "react-redux";
import { add } from "./features/token/tokenSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Publish from "./component/Publish";
import Menu from "./component/Menu";
import Messages from "./component/Messages";
import Contact from "./component/Contact";

// heroku : mars/create-react-app

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  dispatch(add(token));
  return (
    <div className='App'>
      <Router>
        <Container>
          <Header />
          <Menu />
          <Row>
            <Col>
              <section>
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
                        <Contact></Contact>
                      </Wall>
                    )}></Route>
                  <Route path='/'>
                    <Wall />
                  </Route>
                </Switch>
              </section>
            </Col>
            <Col md={3} className='col-right'>
              <div>
                <section>
                  <h2>Publier</h2>
                  <Publish></Publish>
                </section>
                <section>
                  <h2>Amis</h2>
                  <Users></Users>
                </section>
              </div>
            </Col>
          </Row>
          <Footer></Footer>
        </Container>
      </Router>
    </div>
  );
}

export default App;
