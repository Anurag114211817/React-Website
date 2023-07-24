import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import Qr from '../Assets/svg/qr.svg';
import Upi from '../Assets/svg/upi-options.svg';
import Donation from '../Assets/photos/donate.png';
import Merchandise from '../Assets/svg/merchandise.svg';
import Amount from '../Assets/svg/amount.svg';
import Username from '../Assets/svg/username.svg';
import Email from '../Assets/svg/email.svg';
import Mobile from '../Assets/svg/mobile.svg';
import Tshirt from '../Assets/svg/tshirt.svg';
import Address from '../Assets/svg/address.svg';
import PinCode from '../Assets/svg/pin.svg';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Donate() { 
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [formData, setFormData] = useState({
    amount: 500,
    fullName: '',
    email: '',
    mobileNo: '',
    anonymous: false,
    address: '',
    pinCode: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])

  const handleOnChange = () => {
    setFormData({...formData, anonymous: !formData.anonymous});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.anonymous) {
      try {
        await addDoc(collection(db, "donation"), formData);
      } catch(err) {
        alert(err);
      }
    } else {
      try {
        await addDoc(collection(db, "donation"), {
          anonymous: true,
          amount: formData.amount
        });
      } catch(err) {
        alert(err);
      }
    }
  }

  const onData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData, [name]:value});
  };

  const handleCloseOne = () => {
    setShowOne(false);
  }

  const handleShowOne = () => {
    setShowOne(true);
  }

  const handleCloseTwo = () => {
    setShowTwo(false);
  }

  const handleShowTwo = () => {
    setShowTwo(true);
  }

  return (
    <Container fluid className='px-md-5 px-3' id='donate'>
      <Row>
        <div className="display-6 fw-bolder" style={{color: "#005718"}}>Help us in our <span>initiative</span></div>
      </Row>
      <Row>
        <Col md='6' lg='4' className='pt-5' data-aos='fade-right'>
          <Card bg='glass-g' className='rounded-5'>
            <Card.Body className='p-5 pb-4 text-center '>
              <Button className='w-100 rounded-pill' onClick={handleShowOne}>Contribute Now</Button>
              <div className="fs-6 mt-3" style={{color: "#5f5f5f"}}>Card, Netbanking</div>
              <Row>
                <div className="header-center fs-6 mt-3" style={{color: "#5f5f5f"}}>OR using QR code</div>
              </Row>
              <Row className="d-flex position-relative mt-3">
                  <img src={Qr} alt="qr" style={{aspectRatio: "2/1.2"}} className="rounded-4" />
                  <Button href="/" variant='light' className="rounded-pill position-absolute top-50 start-50 translate-middle" style={{maxWidth: '50%'}}>Generate</Button>
              </Row>
              <div className="fs-6 mt-3">Scan using any app</div>
              <img src={Upi} alt="upi" />
            </Card.Body>
          </Card>
        </Col>
        <Col data-aos='fade-up'>
          <img src={Donation} className="w-100 d-none d-lg-block" alt="" style={{aspectRatio: "2/.7", objectFit: 'contain'}} />
          <img src={Donation} className="w-100 d-lg-none mt-3" alt="" style={{aspectRatio: "2/1", objectFit: 'contain'}} />
          <p className="fs-7 text-center mt-3">Contribute to us in bringing revolution in agriculture and IoT sector of India.</p>
          <img src={Merchandise} alt="" className="w-100 mt-3 d-none d-lg-block" style={{aspectRatio: "2/.3"}} />
          <img src={Merchandise} alt="" className="w-100 mt-3 d-lg-none" style={{aspectRatio: "2/.6"}} />
          <div className="fs-6 fw-bolder text-center mt-3">*Get our merchandise on donation above ₹500 <span className="text-decoration-none" style={{cursor: 'pointer'}} onClick={handleShowTwo}>more details</span>.</div>
        </Col>
      </Row>
      <Modal show={showOne} onHide={handleCloseOne} backdrop="static" keyboard={false} centered scrollable style={{"--bs-modal-border-radius":"1.5rem"}}>
        <Modal.Header closeButton className='border-0 px-4 pt-4'></Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row>
                <InputGroup className="mb-3 d-flex justify-content-between">
                  <label htmlFor="custom-switch">Donate anonymously</label>
                  <Form.Check type="switch" id="custom-switch" name="anonymous" checked={formData.anonymous} onChange={handleOnChange} />
                </InputGroup>
              </Row>
              <Row> 
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" className='bg-white'><img src={Amount} width={23} alt="Amount" /></InputGroup.Text>
                  <FloatingLabel controlId="floatingInput" label="Amount">
                    <Form.Control type="number" placeholder="500" min={500} max={100000} style={{borderLeft: 0}} name="amount" value={formData.amount} onChange={onData} />
                  </FloatingLabel>
                </InputGroup>
              </Row>
              {
                !formData.anonymous && <>
                  <Row>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon2" className='bg-white'><img src={Username} width={23} alt="Full name" /></InputGroup.Text>
                      <FloatingLabel controlId="floatingInput" label="Full name">
                        <Form.Control type="text" placeholder="Full name" style={{borderLeft: 0}} name="fullName" value={formData.fullName} onChange={onData} />
                      </FloatingLabel>
                    </InputGroup>
                  </Row>
                  <Row>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon3" className='bg-white'><img src={Email} width={23} alt="Email" /></InputGroup.Text>
                      <FloatingLabel controlId="floatingInput" label="Email">
                        <Form.Control type="text" placeholder="Email" style={{borderLeft: 0}} name="email" value={formData.email} onChange={onData} />
                      </FloatingLabel>
                    </InputGroup>
                  </Row>
                  <Row>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon4" className='bg-white'><img src={Mobile} width={23} alt="Mobile" /></InputGroup.Text>
                      <FloatingLabel controlId="floatingInput" label={`Mobile number`}>
                        <Form.Control type="text" placeholder="Mobile number" style={{borderLeft: 0}} name="mobileNo" value={formData.mobileNo} onChange={onData} />
                      </FloatingLabel>
                    </InputGroup>
                  </Row>
                  <Row>
                    <Col xs={3} className='text-center'>
                      <div className="fs-6 fw-semibold text-black">You'll get:</div>
                      <img src={Tshirt} alt="Tshirt" width={52} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3} className='text-center'>
                      <div className="fs-6 fw-fw-semibold">T-shirt</div>
                    </Col>
                    <Col>
                      <ul>
                        <li>Please fill below the shipping details.</li>
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon4" className='bg-white'><img src={Address} width={23} alt="Address" /></InputGroup.Text>
                      <FloatingLabel controlId="floatingInput" label={`Address`}>
                        <Form.Control type="text" placeholder="Address" style={{borderLeft: 0}} name="address" value={formData.address} onChange={onData} />
                      </FloatingLabel>
                    </InputGroup>
                  </Row>  
                  <Row>
                    <Col>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon4" className='bg-white'><img src={PinCode} width={23} alt="Pin Code" /></InputGroup.Text>
                        <FloatingLabel controlId="floatingInput" label={`Pin Code`}>
                          <Form.Control type="text" placeholder="Pin Code" style={{borderLeft: 0}} name="pinCode" value={formData.pinCode} onChange={onData} />
                        </FloatingLabel>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label={`City`}>
                          <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={onData} />
                        </FloatingLabel>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label={`State`}>
                          <Form.Control type="text" placeholder="State" name="state" value={formData.state} onChange={onData} />
                        </FloatingLabel>
                      </InputGroup>
                    </Col>
                  </Row>
                </>
              }
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center border-0'>
          <Button onClick={handleSubmit} variant="primary" className='px-5 p-2 rounded-pill'>Continue to pay</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTwo} onHide={handleCloseTwo} backdrop="static" keyboard={false} centered scrollable style={{"--bs-modal-border-radius":"1.5rem"}}>
        <Modal.Header closeButton className='border-0 px-4 pt-4'></Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <p>We giving out merchandise on every donation</p>
            </Row>
            <Row className='d-flex justify-content-evenly'>
              <Col xs={6} className='d-flex flex-column align-items-center'>
                <ul>
                  <li>For above ₹500</li>
                </ul>
                <img src={Tshirt} alt="" width={52} />
                <p>Tshirt</p>
              </Col>
              <Col xs={6} className='d-flex flex-column align-items-center'>
                <ul>
                  <li>For above ₹1000</li>
                </ul>
                <img src={Tshirt} alt="" width={52} />
                <p>Tshirt</p>
              </Col>
            </Row>
            <Row className='d-flex justify-content-evenly'>
              <Col xs={6} className='d-flex flex-column align-items-center'>
                <ul>
                  <li>For above ₹5000</li>
                </ul>
                <img src={Tshirt} alt="" width={52} />
                <p>Tshirt</p>
              </Col>
              <Col xs={6} className='d-flex flex-column align-items-center'>
                <ul>
                  <li>For above ₹10000</li>
                </ul>
                <img src={Tshirt} alt="" width={52} />
                <p>Tshirt</p>
              </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col xs={6} className='d-flex flex-column align-items-center'>
                <ul>
                  <li>For above ₹20000</li>
                </ul>
                <img src={Tshirt} alt="" width={52} />
                <p>Tshirt</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Donate;
