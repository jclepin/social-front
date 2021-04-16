import React from "react";
import Wall from "./component/Wall";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <div className='App'>
      <Container>
        <h1>All Walls</h1>
        <Row>
          <Col md={3}>
            <section>
              <h2>Amis</h2>
            </section>
          </Col>
          <Col>
            <section>
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
