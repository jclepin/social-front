import Header from "../../component/Header";
import Menu from "../../component/Menu";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Publish from "../../component/features/post/Publish";
import Users from "../../component/features/user/Users";
import Footer from "../../component/Footer";
const Complet = ({ children }) => {
  return (
    <div className='complet'>
      <Header />
      <Menu />
      <Row>
        <Col>
          <section>{children}</section>
        </Col>
        <Col md={3} className='col-right'>
          <div>
            <section className='background'>
              <h2>Publier</h2>
              <Publish></Publish>
            </section>
            <section className='background'>
              <h2>Amis</h2>
              <Users showFriends={true}></Users>
            </section>
            <section className='background'>
              <h2>Utilisateurs</h2>
              <Users></Users>
            </section>
          </div>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  );
};

export default Complet;
