import '../../index.css';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import FullName from '../Assets/svg/username.svg';
import Email from '../Assets/svg/email.svg';
import Mobile from '../Assets/svg/mobile.svg';
import Message from '../Assets/svg/message.svg';
import Waves from '../Assets/svg/waves.svg';
import Find from '../Assets/svg/find.svg';
import EmailUs from '../Assets/svg/email-us.svg';
import ContactUs from '../Assets/svg/contact-us.svg';
import Document from '../Assets/svg/image.png';
import { db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
// import Map from '../Assets/map.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Footer() {
  // const position = [23.21575517494478, 79.95941922536994]
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    message: ''
  });


  const onData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData, [name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "stayInTouch"), {...formData, time: new Date().toLocaleString()});
      toast.success('Thank you for your feedback', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch(e) {
      alert(e);
    }
  }
  
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])

  return (
    <>
      <Container fluid className='px-md-5 px-3 position-relative' id='support' style={{backgroundImage: `url(${Waves})`}}>
        <Row>
          <Col>
            <div className="display-6 fw-bolder" style={{color: "#005718"}}>Get in touch <span>with us</span></div>
          </Col>
        </Row>
        <Row className='mt-3' style={{paddingBottom: '20vh'}}>
          <Col lg={6} className='border-end' data-aos='fade-right'>
          <Form onSubmit={handleSubmit}>
              <Row>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className='bg-white'><img src={FullName} width={23} alt="Full name" /></InputGroup.Text>
                  <FloatingLabel controlId="floatingInput1" label="Full name">
                    <Form.Control type="text" placeholder="500" style={{borderLeft: 0}} name="fullName" value={formData.fullName} onChange={onData} />
                  </FloatingLabel>
                </InputGroup>
              </Row>
              <Row>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2" className='bg-white'><img src={Email} width={23} alt="Email" /></InputGroup.Text>
                  <FloatingLabel controlId="floatingInput2" label="Email">
                    <Form.Control type="email" placeholder="500" style={{borderLeft: 0}} name="email" value={formData.email} onChange={onData} />
                  </FloatingLabel>
                </InputGroup>
              </Row>
              <Row>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3" className='bg-white'><img src={ Mobile } width={23} alt="Mobile" /></InputGroup.Text>
                  <FloatingLabel controlId="floatingInput3" label="Mobile number">
                    <Form.Control type="text" placeholder="500" style={{ borderLeft: 0 }} name="mobileNo" value={ formData.mobileNo } onChange={ onData } />
                  </FloatingLabel>
                </InputGroup>
              </Row>
              <Row>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon4" className='bg-white align-items-start pt-3'><img src={ Message } width={23} alt="Message" /></InputGroup.Text>
                  <FloatingLabel controlId="floatingInput4" label="Message">
                    <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px', borderLeft: 0, resize: 'none' }} name='message' value={ formData.message } onChange={ onData } />
                  </FloatingLabel>
                </InputGroup>
              </Row>
              <Button className='px-5 p-2 rounded-pill' type='submit'>Submit</Button>
          </Form>
          </Col>
          <Col className='mt-3 mt-lg-0' data-aos='fade-left'>
            <div className="h4 d-flex align-items-baseline" style={{color: '#005718'}}><img src={Find} alt="" height={23} className='me-3' />Find us</div> 
            <Row className='ps-5'>
              <a href="https://goo.gl/maps/24RV92HCmixhtcPM8" target="_blank" rel="noopener noreferrer" className='text-decoration-none ps-0' style={{color: '#5F5F5F'}}>1st Floor, Institute of Agri-business Management, JNKVV Campus, Jabalpur, Madhya Pradesh 482004</a>
            </Row>
            <Row className='mt-3'>
              <Col>
                <div className="h4 d-flex align-items-baseline" style={{color: '#005718'}}><img src={EmailUs} alt="" height={23} className='me-3' />Email us</div> 
                <Row className='ps-5'>
                  <a href="mailto:management@ouranosrobotics.com" className='text-decoration-none ps-0' style={{color: '#5F5F5F'}}>management@ouranosrobotics.com</a>
                </Row>
              </Col>
            </Row>
            <Row className='mt-3'>   
              <Col>
                <div className="h4 d-flex align-items-baseline" style={{color: '#005718'}}><img src={ContactUs} alt="" height={23} className='me-3' />Contact us</div> 
                <Row className='ps-5'>
                  <a href="tel:+917747813995" className='text-decoration-none ps-0' style={{color: '#5F5F5F'}}>+91 774-781-3995</a>
                </Row>
              </Col>
            </Row>
            <Row className='mt-3'>   
              <Col>
                <div className="h4 d-flex align-items-baseline" style={{color: '#005718'}}><img src={Document} alt="" height={25} className='me-3' />Policies</div> 
                <Row className='ps-5'>
                  <Link to="/privacy-policy" className='text-decoration-none ps-0' style={{color: '#5F5F5F'}}>Privacy Policy</Link>
                </Row>
                <Row className='ps-5'>
                  <Link to="/terms-and-conditions" className='text-decoration-none ps-0' style={{color: '#5F5F5F'}}>Terms & conditions</Link>
                </Row>
                <Row className='ps-5'>
                  <Link to="/refund-policy" className='text-decoration-none ps-0' style={{color: '#5F5F5F'}}>Refund Policy</Link>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='position-absolute bottom-0 start-50 translate-middle-x'>
          <div className="fs-6 mb-md-4 text-white-50 text-center ">Copyright &copy; Ouranos Robotics Private Limited. All rights reserved.</div>
        </Row>
      </Container>
    </>
  )
}

export default Footer;