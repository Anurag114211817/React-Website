import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import BackgroundVideo from '../Assets/background-video/bg-video.mp4';
import BackgroundImage from '../Assets/background-video/bg-img.png';
import Hero from '../Assets/json/farmer-gareeb.json';

function Home() {
  document.title = "Ouranos Robotics | Home";
  return (
    <main>
      <Container fluid className='px-md-5 px-3' id='home'>
        <div className='video-container'></div>
        <video autoPlay muted loop className='bg-video' poster={BackgroundImage} preload="metadata" style={{"--height": "100dvh"}}>
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
        <Row className='d-flex align-items-center' style={{minHeight: '100vh'}}>
          <Col md="7">
            <Card className='rounded-5 p-1 p-md-5 text-white' bg='glass-w' style={{'--bs-card-bg': 'none'}}>
              <Card.Body>
                <div className="display-4 fw-bolder">We promote<br/><span style={{color: "#005718"}}>modern & advance</span><br/>farming</div>
                <p className='text-white-50'>
                  Our products aim to provide efficient and cost-effective solutions to farmers, helping them to increase productivity and profitability.
                </p>
                <a href='#about-us'>
                  <Button variant='light' className='px-5 p-2 rounded-pill fw-bold'>More details</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-none d-md-grid'>
            <Player autoplay loop src={Hero} className='d-none d-md-flex' style={{width: '80%'}}></Player>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Home;
