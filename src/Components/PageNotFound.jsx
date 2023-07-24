import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import BackgroundVideo from './Assets/background-video/bg-video.mp4';
import BackgroundImage from './Assets/background-video/bg-img.png';

function PageNotFound() {

  useEffect(() => {
    // eslint-disable-next-line
  }, [])
  

  return (
    <Container className='p-0' fluid>
      <div className='video-container'></div>
      <video autoPlay muted loop className='bg-video' poster={BackgroundImage} preload="metadata" style={{"--height": "100dvh"}}>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <Row style={{height:'100dvh'}} className='text-white d-flex align-items-center'>
        <div className='display-3 text-center' style={{zIndex:1}}>404 - Page Not Found</div>
      </Row>
    </Container>
  )
}

export default PageNotFound;