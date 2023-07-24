import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import BackgroundImg from "../Assets/Blog/bg-5.jpg";
import { Player } from '@lottiefiles/react-lottie-player';
import BlogAnimation from '../Assets/json/scrolling.json';

function Products() {
  document.title = "Ouranos Robotics | Shop";
  return (
    <Container fluid style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: "cover", backgroundPosition: "bottom ", paddingTop: 0, }} >
      <Row className="px-md-5 px-3" style={{ backgroundImage: "linear-gradient(0deg, #000, transparent)", height: "100dvh", }} >
        <Col md='6' lg="8" className="d-flex align-items-center order-1 order-md-0" >
          <Card className="rounded-5 p-1 p-md-5 text-white" bg="glass-w" style={{ "--bs-card-bg": "none" }} >
            <Card.Body>
              <div className="display-4 fw-bolder text-uppercase py-4 py-md-3">
                Coming Soon...
              </div>
              <p>
              Hello there! Thank you for stopping by our website. We are thrilled to announce that we will be launching a shopping page soon, where you can browse and purchase our products online. Our team is working hard behind the scenes to bring you the best shopping experience possible. While the shopping page is currently under construction, we invite you to sign up for our newsletter to stay up-to-date on our progress and be the first to know when our shopping page goes live. We appreciate your patience and look forward to serving you soon.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex align-items-center order-0 order-md-1">
          <Player autoplay loop src={BlogAnimation} className='d-none d-md-flex' style={{width: '80%'}}></Player>
        </Col>
      </Row>
    </Container>
  )
}

export default Products;







