import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import FaqImg from '../Assets/photos/faq.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Faq() {
  const page1 = [
                  {question: 'What is mobile pump starter?', answer: <>A mobile pump starter is a device that is used to start and control electric motors in a water pumping system, typically used in agriculture, construction, or mining operations. It allows for remote operation of the pump, and typically includes features such as automatic shutoff, protection against overloading and dry running, and a display for monitoring performance data.</>},
                  {question: 'How to buy mobile pump starter?', answer: <>You can buy mobile pump starter from below sources: <br />Online: <a href='https://amzn.eu/d/4MpRtuB' target='_blank'  rel="noopener noreferrer">Amazon</a> <br />Phone no: <a href="tel:917747813995">+917747813995</a></>},
                  {question: 'What is mobile motor starter price?', answer: <>The price of a mobile motor starter can vary greatly depending on several factors, including the size and power of the motor, the complexity of the starting system, and the manufacturer. <br />
                  <strong>Starting from: ₹4,000 to ₹8,000</strong></>},
                  {question: 'Which starter is best for submersible pump?', answer: <>For a submersible pump, a soft starter or a variable frequency drive (VFD) is typically considered to be the best type of starter. Neer mobile pump starter is best suitable for submersible pumps.</>},
                  {question: 'Which starter is used for 5HP motor?', answer: <>A 5HP motor typically requires a start capacitor or a Direct On Line (DOL) starter. Neer mobile pump starter can be used for 1-7.5 HP motors.</>},
                  {question: 'Which mobile pump starter is best?', answer: <>Neer mobile pump starter provides remote control, monitoring & protection to your motor pump. It is best suitable for agriculture and domestic motors.</>}
                ];
  const page2 = [
                  {question: 'What is mobile pump controller?', answer: <>A mobile pump controller is a device used to control and regulate the operation of a water pump starter.</>},
                  {question: 'How to buy mobile pump controller?', answer: <>You can buy Neer mobile pump controller from below sources :<br />Online: <a href='https://amzn.eu/d/5cYCWW6' target='_blank'  rel="noopener noreferrer">Amazon</a> <br />Phone no: <a href="tel:917747813995">+917747813995</a></>},
                  {question: 'What is mobile motor controller price?', answer: <>The price of a mobile motor controller can vary greatly depending on several factors, including the size and power of the motor starter, the complexity of the starting system, and the manufacturer. <br />
                  <strong>Starting from 3,000 to 7,000</strong></>},
                  {question: 'Which controller is best for submersible pump starter?', answer: <>For a submersible pump starter, Neer mobile pump controller can be used.</>},
                  {question: 'Which mobile pump starter is best?', answer: <>Neer mobile pump controller can be used in all kinds of pump starters including DOL starter, star delta starter, oil starter, submersible starter, etc of various motors of power from 1-50 HP.</>},
                ]
  const [QNAs, setQNAs] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    setQNAs(page1)
    // eslint-disable-next-line
  }, []);

  const nextButton = () => {
    setQNAs(page2)
    setNext(false)
    setPage(page+1)
  }
  const prevButton = () => {
    setQNAs(page1)
    setNext(true)
    setPage(page-1)
  }

  return (
    <Container fluid className='px-md-5 px-3'>
      <Row>
        <Col>
          <div className="display-6 fw-bolder" style={{color: "#005718"}}>Frequently asked <span>questions</span></div>
        </Col>
      </Row>
      <Row>
        <Col lg={8} className='pt-5 order-1 order-lg-0' data-aos='fade-right'>
          <Row style={{minHeight: '70vh'}}>
            <Accordion defaultActiveKey={0} flush>
            {
              QNAs.map((element, idx) => {
                return (
                  <Accordion.Item eventKey={idx} key={idx}>
                      <Accordion.Header><div className="h5">{`Q${idx+1}.`} {element.question}</div></Accordion.Header>
                      <Accordion.Body className='py-0'><p>{element.answer}</p></Accordion.Body>
                    </Accordion.Item>
                )
              })
            }
            </Accordion>
          </Row>
          <Row>
            <Col>
              <Button onClick={prevButton} className='rounded-circle p-0 me-2' style={{background: 'transparent', color: '#5dc271'}} disabled={!next?false:true}><ArrowLeftCircleFill className='display-6' /></Button> <span className='fw-bold text-black'>{page} / 2</span> <Button onClick={nextButton} className='rounded-circle p-0 ms-2' style={{background: 'transparent', color: '#5dc271'}} disabled={next?false:true} ><ArrowRightCircleFill className='display-6' /></Button> {next}
            </Col>
          </Row>
        </Col>
        <Col className='order-0 order-lg-1' style={{minHeight: '35vh'}} data-aos='fade-left'>
          <Row style={{backgroundImage: `url(${FaqImg})`, minHeight: '100%'}} id='faq' className='mt-3'></Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Faq;