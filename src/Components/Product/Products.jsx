import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import BackgroundImg from "../Assets/Blog/bg-5.jpg";
import { Player } from '@lottiefiles/react-lottie-player';
import BlogAnimation from '../Assets/json/scrolling.json';

function Products() {
  document.title = "Ouranos Robotics | Product";
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
                Thank you for visiting our website! We are currently working hard to bring you our newest product, and are excited to share it with you soon. Our product page is currently under construction, but please check back with us in the near future for updates and more information. We apologize for any inconvenience this may cause, but rest assured that we are committed to bringing you the best possible product and user experience. Thank you for your patience and interest in our brand.
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







