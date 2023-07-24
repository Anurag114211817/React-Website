import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Earth from '../Assets/svg/earth.svg'
import Ecology from '../Assets/svg/ecology.svg'
import Money from '../Assets/svg/money.svg'
import Man from '../Assets/svg/man.svg'
import Crops from '../Assets/svg/crops.svg'
import Water from '../Assets/svg/water.svg'
import Back1 from '../Assets/card-back/back-1.jpg';
import Back2 from '../Assets/card-back/back-2.jpg';
import Back3 from '../Assets/card-back/back-3.jpg';
import Back4 from '../Assets/card-back/back-4.jpg';
import Back5 from '../Assets/card-back/back-5.jpg';
import Back6 from '../Assets/card-back/back-6.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';

function About() {
  const whoWeAre = [
    {text: 'Sustainability in plantation, irrigation and monitoring', img: Earth, back: Back1},
    {text: 'Efficiency in providing precision and modern farming', img: Ecology, back: Back2},
    {text: 'Cost effective solutions through our product', img: Money, back: Back3},
  ];
  const ourVision = [
    {text: 'Lack of skilled laborers in fields resulting in high wages.', img: Man, back: Back4},
    {text: 'At least 40% of global crops are lost to pests every year', img: Crops, back: Back5},
    {text: 'Ineffective management leads to 70% irrigation water waste.', img: Water, back: Back6},
  ];
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])
  
  return (
    <Container fluid className='p-md-5 px-3 d-flex flex-column justify-content-evenly' id='about-us'>
      <Row data-aos='fade-up'>
        <Col>
          <div className="display-6 fw-bolder mb-3" style={{color: "#005718"}}>Who <span>we</span> are</div>
          <p>
            As an Agri-Tech startup, our goal is to revolutionize the agriculture industry through the use of automation and the internet of things (IoTs). We are dedicated to promoting modern and advanced farming methods that are sustainable and precise. Our products aim to provide efficient and cost-effective solutions to farmers, helping them to increase productivity and profitability. By utilizing automation and IoTs, we hope to bring a new level of precision and sustainability to the agriculture industry, ultimately leading to a more efficient and cost-effective way of producing food for the growing global population.
          </p>
        </Col>
      </Row>
      <Row data-aos='fade-up'>
        {
          whoWeAre.map((element, idx) => {
            return (
              <Col xs='12' md='4' key={idx}>
                <Card className='mb-3 border-0 rounded-4 text-white' style={{backgroundImage: `url(${element.back})`}}>
                  <Card.Body>
                    <Row className='d-flex flex-row align-items-center'>
                      <Col xs='3' style={{backgroundImage: `url(${element.img})`, height: '52px'}}></Col>
                      <Col>
                        {element.text}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>
      <Row data-aos='fade-up'>
        <div className="display-6 fw-bolder mb-3" style={{color: "#005718"}}>Our <span>vision</span></div>
        <p>
          India is the second most populous country in the world and its economy heavily relies on the agriculture sector, accounting for 25% of total global production. Despite this, there have been growing concerns about the state of agriculture in India. Our research has identified that a lack of mechanization in farming is a major issue, leading to higher production costs and lower yields. This problem is caused by three primary factors: the availability and accessibility of modern farming equipment, the lack of education and training for farmers on how to effectively use these tools, and the high cost of purchasing and maintaining such equipment. By addressing these issues, we can help to increase the efficiency and productivity of the agriculture sector in India. This is primarily due to the top 3 reasons:
        </p>
      </Row>
      <Row data-aos='fade-up'>
        {
          ourVision.map((element, idx) => {
            return (
              <Col xs='12' md='4' key={idx}>
                <Card className='mb-3 border-0 rounded-4 text-white' style={{backgroundImage: `url(${element.back})`}}>
                  <Card.Body>
                    <Row className='d-flex flex-row align-items-center'>
                      <Col xs='3' style={{backgroundImage: `url(${element.img})`, height: '52px'}}></Col>
                      <Col>
                        {element.text}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </Container>
  );
}

export default About;