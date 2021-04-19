import React from "react";
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
          <Col>
            <section>
              {/* <h2>Posts</h2> */}
              <Wall></Wall>
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
    </div>
  );
}

export default App;
