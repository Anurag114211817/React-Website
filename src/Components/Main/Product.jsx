import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Back1 from '../Assets/card-back/back-1.jpg'
import Back2 from '../Assets/card-back/back-2.jpg'
import Back3 from '../Assets/card-back/back-3.jpg'
import Back4 from '../Assets/card-back/back-4.jpg'
import Back5 from '../Assets/card-back/back-5.jpg'
import Neer from '../Assets/photos/neer.png';
import Distance from '../Assets/svg/distance.svg';
import Schedule from '../Assets/svg/schedule.svg';
import Protect from '../Assets/svg/protection.svg';
import Monitor from '../Assets/svg/monitor.svg';
import Weather from '../Assets/svg/weather.svg';
import Irrigation from '../Assets/svg/irrigation.svg';
import House from '../Assets/svg/house.svg';
import Societies from '../Assets/svg/societies.svg';
import Tank from '../Assets/svg/water-tank.svg';            
import Commercial from '../Assets/svg/commercial.svg';
import Government from '../Assets/svg/government.svg';
import Park from '../Assets/svg/park.svg';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Product() {
  const features = [
    {text: 'Control water pump remotely, ignoring distance', img: Distance, back: Back1},
    {text: 'Schedule your water pump through timer', img: Schedule, back: Back2},
    {text: 'Protect your water pump from overload & dryrun', img: Protect, back: Back3},
    {text: 'Realtime data of electricity, current & voltage', img: Monitor, back: Back4},
    {text: 'Realtime weather updates & forecast upto 7 days', img: Weather, back: Back5}
  ];
  const uses = [
    {text: 'Irrigation', img: Irrigation },
    {text: 'Smart Homes', img: House },
    {text: 'Societies', img: Societies },
    {text: 'Water Tanks', img: Tank },
    {text: 'Commercial Buildings', img: Commercial },
    {text: 'Government Water Supply', img: Government },
    {text: 'Nurseries & Parks', img: Park },
  ];

  useEffect(() => {
    Aos.init({ duration: 2000});
  }, [])
  

  return (
    <Container fluid className='px-md-5 px-3' id="product">
      <Row>
          <div className="display-6 fw-bolder text-center text-capitalize mb-3" style={{color: "#005718"}}>neer smart pump controller & starter</div>
      </Row>
      <Row className='mt-3'>
        <Col lg='9' data-aos='fade-right'>
          <Row>
            <Col md='5'>
              <div className="display-5 fw-bolder mb-3" style={{color: "#005718"}}><span>Smartly automate</span> your water supply</div>
              <p>Neer Smart pump controller & starter provides various features to remotely operate or monitor your water pump without any range limit.</p>
              <div className="fs-3 fw-bolder mt-3">₹3500 - ₹6500</div>
              <a href="https://www.amazon.in/s?me=A31BQ02N7TQH7K&ref=sf_seller_app_share_new" target='_blank' rel="noopener noreferrer" className="me-3"><Button className='px-4 rounded-pill p-2 my-3'>Buy now</Button></a>
              <a href="./NeerV2.0.0 beta.apk" download="NeerV2.0.0 beta.apk" rel="noopener noreferrer"><Button className='px-4 rounded-pill p-2 my-3'>Download apk now</Button></a>
            </Col>
            <Col md='7' className='text-center'>
              <img src={Neer} alt="neer" style={{width: '65%'}} className='mt-3' />
            </Col>
          </Row>
          <Row>
            <div className="fs-3">Uses:</div>
          </Row>
          <Row className='pt-3'>
            {
              uses.map((use, idx) => {
                return (
                  <Col key={idx} className='text-center'>
                    <img src={use.img} alt={use.text} width="50" />
                    <div className="fs-6">{use.text}</div>
                  </Col>
                )
              })
            }
          </Row>
        </Col>
        <Col lg='3' className='px-2 mt-3' data-aos='fade-left'>
        {
          features.map((element, idx) => {
            return (
            <Card key={idx} className='mb-3 border-0 rounded-4 text-white' style={{backgroundImage: `url(${element.back})`}}>
              <Card.Body>
                <Row className='d-flex flex-row align-items-center'>
                  <Col xs='3' style={{backgroundImage: `url(${element.img})`, height: '52px'}}></Col>
                  <Col>
                    {element.text}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            )
          })
        }
        </Col>
      </Row>
    </Container>
  )
}

export default Product;
