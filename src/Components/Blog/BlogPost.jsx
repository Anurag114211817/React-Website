// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BookmarkPlus, BoxArrowUp, Telegram, Whatsapp } from 'react-bootstrap-icons';
import { Button, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import Preloader from '../Preloader';
import { toast } from 'react-toastify';
import Leaf from '../Assets/leaf.png'
import LeafBlack from '../Assets/leaf-black.png'
import Styles from './Blog.module.css';

function BlogPost() {
  const { id } = useParams();
  const currentUrl = window.location.href;
  const shareUrl = `${currentUrl.substring(0, currentUrl.indexOf('/', 10))}/blog/${id}`;
  const [show, setShow] = useState(false);
  const [first, setFirst] = useState({
    like: true,
    data: true,
    save: true
    // share: true
  })
  const toastifyProps = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const [data, setData] = useState({});
  const [isLiked, setIsLiked] = useState(localStorage.getItem('likedBlogs')?.includes(id) || false);
  const [isSaved, setIsSaved] = useState(localStorage.getItem('savedBlogs')?.includes(id) || false);

  useEffect(() => {
    getDoc(doc(db, 'blogs', id))
    .then((snap) => {
      setData(snap.data())
    })
    .catch((err) => console.log(err))
  }, [id]);

  useEffect(() => {
    if (!first.like) {
      setData(prev => ({...prev, like:prev.like + (isLiked ? 1 : -1)}));
      return
    }
    setFirst(prev => ({...prev, like: false}))
    // eslint-disable-next-line
  }, [isLiked])

  useEffect(() => {
    if (!first.like) {
      setData(prev => ({...prev, save:prev.save + (isSaved ? 1 : -1)}));
      return
    }
    setFirst(prev => ({...prev, save: false}))
    // eslint-disable-next-line
  }, [isSaved])
  
  useEffect(() => {
    if (!first.data) {
      setDoc(doc(db, 'blogs', id), {like: data.like, share: data.share, save: data.save}, { merge: true })
      return
    }
    setFirst(prev => ({...prev, data: false}))
    // eslint-disable-next-line
  }, [data])
  

  const formatDate = (newDate) => {
    const months = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" };
    const d = new Date(+newDate);
    const year = d.getFullYear();
    const date = d.getDate().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const hours = d.getHours().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    const monthName = months[d.getMonth()];
    const formatted = `${monthName} ${date}, ${year} ${hours}:${minutes}:${seconds}`;
    return formatted.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    !isLiked ?
    localStorage.setItem('likedBlogs', [...(localStorage.getItem('likedBlogs') ?? '').split(','), id]) :
    localStorage.setItem('likedBlogs', (localStorage.getItem('likedBlogs').split(',').filter(item => item !== id)));
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    !isSaved ?
    localStorage.setItem('savedBlogs', [...(localStorage.getItem('savedBlogs') ?? '').split(','), id]) :
    localStorage.setItem('savedBlogs', (localStorage.getItem('savedBlogs').split(',').filter(item => item !== id)));
  };

  const handleShare = () => {
    setShow(true);
    setData(prev=> ({...prev, share: prev.share + 1}));
  };

  const handleHide = () => setShow(false);

  const openShare = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.info(<>Copied to clipboard</>, toastifyProps);
  };

  return (
    <>
      <Container fluid bg='light' className="pt-0" style={{ minHeight:'auto' }}>
        <Row className="d-none d-lg-block" style={{height:"100px"}}></Row>
      </Container>
      {
        !data?._id ? <Preloader h={'100px'} /> :
        <>
          <Container fluid bg='light' className="pt-0" style={{ minHeight:'auto' }}>
            <Row style={{ 
              backgroundImage: `url(${data.img1})`, 
              height: '60dvh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              bleed: '100vw'
              // filter: 'blur(5px)'
            }}></Row>
          </Container>
          <Container className='pb-5 px-lg-5'>
            <Row className='mt-5'>
              <div className={`fw-bold h1 ${Styles.h1}`}>{data._heading}.</div>
            </Row>
            <div className='mt-3 d-flex'>
              <img src={data.publisherProfilePic} className='rounded-circle' style={{width: "37px", height: '37px'}} alt="Publisher profile pic" />
              <div className="ms-2">
                <div className="fs-7 fw-bold">{data?._publisher}</div>
                <div className="fs-7 text-black-50">{formatDate(data?.publishTime)}</div>
              </div>
            </div>
            <Row className='mt-4'>
              {
                data.body1.split('**').map((ele, idx) => {
                  return (
                    <p key={idx} className="fs-4 lh-md">{ele}</p>
                  )
                })
              }
            </Row>
            <Row className='mt-3 d-flex justify-content-center'>
              <img src={data.img2} alt="" /* className='d-none d-lg-block' */ style={{width: 'min(100%, 850px)'}} />
              {/* <img src={data.img2} alt="" className='d-lg-none' style={{width: 'min(90dvw, 70%)'}} /> */}
            </Row>
            <Row className='mt-3'>
            {
                data.body2.split('**').map((ele, idx) => {
                  return (
                    <p key={idx} className="fs-4 lh-md">{ele}</p>
                  )
                })
              }
            </Row>
            <Row className='mt-3'>
            {
                data.body3.split('**').map((ele, idx) => {
                  return (
                    <p key={idx} className="fs-4 lh-md">{ele}</p>
                  )
                })
              }
            </Row>
            <div className='d-flex flex-row justify-content-center'>
              <span className={`d-flex align-items-center justify-content-center fs-5 cursor-pointer px-4 py-2 mx-3 ${Styles.hover} ${isLiked ? 'text-black' : `text-black-50 ${Styles.img}`}`} onClick={handleLike}><img src={ isLiked ? Leaf : LeafBlack} alt='like' width={20} className='me-2' /> {data?.like ?? 0}</span>
              <span className={`d-flex align-items-center justify-content-center fs-5 cursor-pointer px-4 py-2 mx-3 ${Styles.hover} text-black-50`} onClick={handleShare}><BoxArrowUp className='me-2' /> {data?.share ?? 0}</span>
              <span className={`d-flex align-items-center justify-content-center fs-5 cursor-pointer px-4 py-2 mx-3 ${Styles.hover} ${isSaved ? 'text-black' : 'text-black-50'}`} onClick={handleSave}><BookmarkPlus className='me-2' /> {data?.save ?? 0}</span>
            </div>
          </Container>
          <Modal show={show} onHide={handleHide} backdrop="static" keyboard={false} centered scrollable style={{"--bs-modal-border-radius":"1.5rem"}}>
            <Modal.Header className='border-0 px-4 pt-3' closeButton>Share</Modal.Header>
            <Modal.Body>
              <Button variant='outline-primary p-2 w-100 mb-3' style={{"--app":"#2dd14a"}} onClick={() => openShare(`https://api.whatsapp.com/send?text=${data._heading}${encodeURIComponent(`\n${shareUrl}`)}&type=custom_url&app_absent=0`)}><Whatsapp className='fs-4'/></Button>
              <Button variant='outline-primary p-2 w-100 mb-3' style={{"--app":"#42a5d9"}} onClick={() => openShare(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${data._heading}`)}><Telegram className='fs-4'/></Button>
              <hr className='my-4'/>
              <InputGroup className="mb-3">
                <Form.Control value={shareUrl} readOnly />
                <Button variant="outline-secondary" onClick={handleCopy} id="button-addon2">Copy</Button>
              </InputGroup>
            </Modal.Body>
          </Modal>
        </>
      }
    </>
  )
}

export default BlogPost;