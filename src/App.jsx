import React from "react";
import Wall from "./component/Wall";
import Users from "./component/Users";
import { useDispatch } from "react-redux";
import { add } from "./features/token/tokenSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./component/Header";

// heroku : mars/create-react-app

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  dispatch(add(token));
  return (
    <div className='App'>
      <Container>
        <Header />
        <Row>
          <Col md={3}>
            <section>
              <h2>Amis</h2>
              <Users></Users>
            </section>
          </Col>
          <Col>
            <section>
              <h2>Posts</h2>
              <Wall></Wall>
            </section>
          </Col>
          <Col md={3}>
            <section>
              <h2>Plus</h2>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
