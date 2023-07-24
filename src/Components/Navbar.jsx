import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Card, Modal, FloatingLabel, Form, Spinner, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Assets/logo/logo-white-1.svg';
import LogoBlack from './Assets/logo/logo-black-1.svg';

import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function NavbarCustom({ userLoggedIn, isAdmin, setIsAdmin }) {
  const currentUrl = window.location.href;
  const url = currentUrl.substring(currentUrl.indexOf('/', 10))
  const [show, setShow] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [route, setRoute] = useState('');
  const [credential, setCredential] = useState({
    username: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleShow = () => {
    if (window.innerWidth < '992'){
      setShow(!show); 
    }
  };
  
  useEffect(() => {
    if (show) document.querySelector('body').classList.add('fix');
    else document.querySelector('body').classList.remove('fix');
  }, [show])

  useEffect(() => {
    setRoute(window.location.pathname);
    window.scrollY = 0;
  }, [location])

  const handleClose = () => {
    setShowOne(false);
    setErrorMsg("")
  }

  const handleShowOne = () => {
    handleShow();
    setShowOne(true);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!credential.username || !credential.password) {
      setErrorMsg("Enter some Data!!!")
      return;
    }
    setErrorMsg('');
    setDisable(true);
    signInWithEmailAndPassword(auth, credential.username, credential.password)
      .then(() => {
        setDisable(false);
        handleClose();
        getDoc(doc(db, 'admin', '_Users'))
        .then((snap) => {
          if (snap.data().blog.includes(auth.currentUser.email)) setIsAdmin(true);
        })
        .catch((err)=>console.log(err));
        setCredential({
          username: "",
          password: ""
        });
        
      })
      .catch(() => {
        setErrorMsg("Invalid Credentials!!!");
        setDisable(false);
      });
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then(() => {
      handleClose();
      setCredential({
        username: "",
        password: ""
      });
    })
    .catch(()=> {
      handleClose()
    })
  }

  const logout = () => {
    handleShow();
    signOut(auth);
    setIsAdmin(false);
    navigate('/');
    setRoute('/');
    setCredential({
      username: "",
      password: ""
    });
  }

  return (
    <>
      {  
        !["/privacy-policy", "/terms-and-conditions", "/refund-policy"].includes(route) &&
        <>
          <Navbar expanded={show} className='p-0 position-absolute w-100' bg='glass-w' expand="lg" variant={url.startsWith('/blog') ? 'light' : 'dark'} style={{zIndex: 1}}>
            <Container fluid className='px-md-5 px-3'>
              <Navbar.Brand onClick={() => setRoute('/')} as={Link} to='/' eventkey='/'><img src={url.includes('/blog') ? LogoBlack : Logo} height="50" alt="icon" className="p-0 py-1" /></Navbar.Brand>
              <Navbar.Toggle onClick={handleShow} />
              <Navbar.Collapse className='d-lg-flex justify-content-end'>
                <Nav activeKey={route} onSelect={(selectedKey) => setRoute(selectedKey)} className='fw-bold d-none d-lg-flex align-items-center'>
                  <Nav.Link className='ms-4' as={Link} to='/' eventKey='/'>Home</Nav.Link>
                  <Nav.Link className='ms-4' as={Link} to='/blog' eventKey='/blog'>Blog</Nav.Link>
                  {/* <Nav.Link className='ms-4' as={Link} to='/product' eventKey='/product'>Product</Nav.Link>
                  <Nav.Link className='ms-4' as={Link} to='/shop' eventKey='/shop'>Shop</Nav.Link> */}
                  {
                    !userLoggedIn ?
                    <Nav.Link className='ms-4' onClick={handleShowOne}>Login</Nav.Link>
                    :
                    <>
                      {isAdmin && <Nav.Link className='ms-4' as={Link} to='/admin-blog' eventKey='/admin-blog'>Blog Admin</Nav.Link>}
                      <Nav.Link className='ms-4' onClick={logout} >Logout</Nav.Link>
                      <Nav.Link className='ms-4' style={{pointerEvents: 'none'}}><div className="rounded-circle overflow-hidden" style={{backgroundImage: `url(${auth?.currentUser?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfuBGe64arHGqu8XjR__BxuFYcE6hZ3jeij8xutmglg&s'})`, width: "42px", height: '42px', backgroundSize: 'cover', backgroundPosition: 'center'}}></div></Nav.Link>
                    </>
                  }
                </Nav>
                <Card bg='glass-w mt-5 mb-4 float-end d-lg-none d-block' style={{'--bs-card-bg': 'none', width: 'min(92vw, 400px)', height: 'calc(100dvh - 85px - 3rem)'}}>
                  <Card.Body className='d-flex flex-column align-items-center justify-content-between pb-5 position-relative' style={{height:'100%'}}>
                    <Nav className='fw-bold w-100 text-center'>
                      <Nav.Link onClick={handleShow} className='mx-4' as={Link} to='/' eventkey='/'>Home</Nav.Link>
                      <Nav.Link onClick={handleShow} className='mx-4' as={Link} to='/blog' eventkey='/blog'>Blog</Nav.Link>
                      {/* <Nav.Link className='mx-4' as={Link} to='/product' eventkey='/product'>Product</Nav.Link>
                      <Nav.Link className='mx-4' as={Link} to='/shop' eventkey='/shop'>Shop</Nav.Link> */}

                      {
                        url.startsWith('/blog') &&
                        <>
                          <hr className='border my-0' style={{'--bs-border-color':'#000'}}/>
                          <Nav.Link onClick={handleShow} className='mx-4' as={Link} to='/blog' eventKey='/blog'>Blog-Home</Nav.Link>
                          <Nav.Link onClick={handleShow} className='mx-4' as={Link} to='/blog/saved-blogs' eventKey='/blog/saved-blogs'>Saved-Blogs</Nav.Link>
                        </>
                      }
                      
                      <div className="position-absolute bottom-0 start-50 translate-middle">
                        {
                          !userLoggedIn ?
                          <Button className='px-5' onClick={handleShowOne}>Login</Button>
                          :
                          <>
                            <Button className='px-5' onClick={logout} >Logout</Button>
                          </>
                        }
                      </div>
                    </Nav>
                  </Card.Body>
                </Card>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {
            url.startsWith('/blog') && 
            <Navbar className='p-0 position-absolute w-100 shadow-lg' expand="lg" variant="dark" style={{zIndex: 1, top: '60px', backgroundColor: "#9DC344"}}>
              <Container fluid className='px-md-5 px-3 d-lg-flex justify-content-center'>
                <Nav activeKey={route} onSelect={(selectedKey) => setRoute(selectedKey)} className='fw-bold d-none d-lg-flex align-items-center'>
                  <Nav.Link className='mx-2' as={Link} to='/blog' eventKey='/blog'>Blog-Home</Nav.Link>
                  <Nav.Link className='mx-2' as={Link} to='/blog/saved-blogs' eventKey='/blog/saved-blogs'>Saved-Blogs</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          }
        </>
      }
      <Outlet />
      <Modal show={showOne} onHide={handleClose} backdrop="static" keyboard={false} centered scrollable style={{"--bs-modal-border-radius":"1.5rem"}}>
        <Modal.Header closeButton className='border-0 px-4 pt-3'>Login</Modal.Header>
        <Modal.Body>
          <Row className='mx-auto'>
            <Button className="w-100 p-2" variant="outline-danger" onClick={signInWithGoogle}>Signin with Google</Button>
          </Row>
          <hr />
          <Form onSubmit={handleSubmit} className="text-end" autoComplete>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" onChange={(event)=>{setCredential((prev)=>({...prev, username: event.target.value }))}} name='username' />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" onChange={(event)=>{setCredential((prev)=>({...prev, password: event.target.value }))}} name='current-password' />
            </FloatingLabel>
            <div className="fs-6 text-center text-danger mt-2">{errorMsg}</div>
            <Button className='rounded-pill p-2 fw-bold' style={{width: '165px'}} variant="primary" type='submit' /* onClick={handleSubmit} */ disabled={disable}>{!disable ? "Login" : <><Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" /> Authenticating</>}</Button>
          </Form>
        </Modal.Body> 
      </Modal>
    </>
  )
}

export default NavbarCustom;