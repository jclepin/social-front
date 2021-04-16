import React from "react";
import Wall from "./component/Wall";
import Users from "./component/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./component/Header";

// heroku : mars/create-react-app

function App() {
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
