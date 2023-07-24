import React, { useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Farmer from '../Assets/svg/farmer.svg';
import Partner from '../Assets/svg/partner.svg';
import Order from '../Assets/svg/order.svg';
import Back1 from '../Assets/card-back/back-1.jpg';
import Back2 from '../Assets/card-back/back-2.jpg';
import Back3 from '../Assets/card-back/back-3.jpg';
import Government from '../Assets/investors/government-of-india.png';
import JawaharRabi from '../Assets/investors/jawahar-rabi.png';
import Pontaq from '../Assets/investors/pontaq.png';
import Stpi from '../Assets/investors/stpi.png';
import Jic from '../Assets/investors/jic.png';
import DigitalIndia from '../Assets/investors/digital-india.png';
import StartupIndia from '../Assets/investors/startup-india.png';
import MakeInIndia from '../Assets/investors/make-In-India.png';
import Rkvy from '../Assets/investors/rkvy.png';
import Atmanirbharbharat from '../Assets/investors/atmanirbhar-bharat.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import WhyChooseUs from '../Assets/photos/why-choose-1.png';

function WhyChoose() {
  const whyChoose = [
    {img: Farmer, number: '1K', tag: 'Farmers joined us', back: Back1},
    {img: Partner, number: '10', tag: 'Partners', back: Back2},
    {img: Order, number: '100', tag: 'Orders', back: Back3}
  ];
  const investors = [Government, JawaharRabi, Pontaq, Stpi, Jic, DigitalIndia, StartupIndia, MakeInIndia, Rkvy, Atmanirbharbharat]
  const responsive = {
    xxl: {
      breakpoint: { max: 4000, min: 1400 },
      items: 5,
      slidesToSlide: 5
    },
    xl: {
      breakpoint: { max: 1400, min: 1200 },
      items: 5,
      slidesToSlide: 5
    },
    lg: {
      breakpoint: { max: 1200, min: 992},
      items: 5,
      slidesToSlide: 5
    },
    md: {
      breakpoint: { max: 992, min: 768 },
      items: 4,
      slidesToSlide: 4
    },
    sm: {
      breakpoint: { max: 768, min: 576 },
      items: 3,
      slidesToSlide: 3
    },
    xs: {
      breakpoint: { max: 576, min: 0 },
      items: 2,
      slidesToSlide: 2
    }
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])
  return (
    <Container fluid className='px-md-5 px-3'>
      <Row>
        <Col>
          <div className="display-6 fw-bolder" style={{color: "#005718"}}>Why choose <span>us</span> ?</div>
        </Col>
      </Row>
      <Row>
        <Col md={4} lg={3} className='px-2 mt-5' data-aos='fade-right'>
          {
            whyChoose.map((element, idx) => {
              return (
              <Card key={idx} className='mb-3 border-0 rounded-4 text-white' style={{backgroundImage: `url(${element.back})`}}>
                <Card.Body>
                  <Row className='d-flex flex-row align-items-center'>
                    <Col xs='3' style={{backgroundImage: `url(${element.img})`, height: '52px'}}></Col>
                    <Col className='text-center'>
                      <div className="fs-5">{element.number}+</div>
                      <div className="fs-6">{element.tag}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              )
            })
          }
        </Col>
        <Col data-aos='fade-left'>
            <Row style={{backgroundImage: `url(${WhyChooseUs})`, minHeight: '200px'}} id='why-choose-us-img'></Row>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <div className="display-6 fw-bolder mt-3" style={{color: "#005718"}}>Investors who put their <span>faith on us</span></div>
        </Col>
      </Row>
      <Row className='px-md-5 mx-md-5' data-aos='fade-up'>
      <Carousel swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                removeArrowOnDeviceType={['xs', 'sm', 'md', 'lg', 'xl', 'xxl']}
                customTransition="all 1s"
                transitionDuration={3000}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px d-flex justify-content-evenly"
      >
        {
          investors.map((element, idx) => {
            return (
              // <Col key={idx} className="d-flex justify-content-center align-items-center" style={{height: "200px"}}>
              //   <img src={element} alt="" height={85} />
              // </Col>
              <Card key={idx} style={{height: '175px', width: '100px'}}>
                <Card.Body style={{backgroundImage: `url(${element})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}></Card.Body>
              </Card>
            )
          })
        }
      </Carousel>
      </Row>
    </Container>
  )
}

export default WhyChoose;