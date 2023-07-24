import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, FloatingLabel, Modal, Row, Spinner, ProgressBar, InputGroup } from 'react-bootstrap'
import BackgroundVideo from '../Assets/background-video/bg-video.mp4';
import BackgroundImage from '../Assets/background-video/bg-img.png';
import { PencilSquare, Share, Telegram, Trash3, Whatsapp } from "react-bootstrap-icons";
import Styles from './BlogAdmin.module.css';
import AdminForm from './BlogAdminForm';
import { storage, db, auth } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, deleteObject, ref } from "firebase/storage";
import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import { SocialIcon } from 'react-social-icons';

function Admin() {
  document.title = 'Ouranos Robotics | Admin';
  const currentUrl = window.location.href;
  const mainUrl = currentUrl.substring(0, currentUrl.indexOf('/', 10))
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
  const [yHeight, setYHeight] = useState(0);
  const [length, setLength] = useState(0)
  const [adminData, setAdminData] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [show, setShow] = useState({ 
    profile: false,
    share: false
  });
  const [percent, setPercent] = useState(0);
	const [upload, setUpload] = useState(false);
  const [del, setDel] = useState(false);
  const [data, setData] = useState({
    _id: "",
    _heading: "",
    _publisher: "",
    body1: "",
    body2: "",
    body3: "",
    img1: "",
    img2: "",
    publishTime: "",
    like: 0,
    share: 0,
    save: 0
  });
  const [userCred, setUserCred] = useState({
    displayName: "",
    photoURL: ""
  });
  const [disable, setDisable] = useState({
		empty: false,
		post: false,
    profile: false
	});
  const [updation, setUpdation] = useState({
    update: false,
    ref: '',
    idx: 0
  });
  const [date, setDate] = useState(Date.now);
  const [i, setI] = useState(false);
  const [imgHolder, setImgHolder] = useState({
    img1: '',
    img2: ''
  })
  const img1 = useRef(null);
  const [blogId, setBlogId] = useState('')
  const img2 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setYHeight(`${window.innerHeight - 60}px`);
    window.addEventListener('resize', ()=>{setYHeight(window.innerHeight)});
  }, [yHeight]);
  
  useEffect(() => {
    if (auth.currentUser.displayName === null || auth.currentUser.photoURL === null) {
      setShow((prev) => ({...prev, profile: true}));
    }
    console.log(auth.currentUser.displayName)
    getData();
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if (i) {
      setDoc(doc(db, 'admin', auth?.currentUser?.email), {blogs: adminData})
      .then(() => {
        setDisable((prev) => ({...prev, post: false}));
        toast.success(<>Data {del ? "Deleted" : "uploaded"} Successfully</>, toastifyProps);
        if (!del) {
          setShow((prev) => ({...prev, share: true}))
          setUpdation({ update: false, ref: '', idx: 0 })
        }
      })
      .catch((err) => {
        console.log(err);
      });
      setDel(false);
      setI(false);
    }
    setLength(adminData.length);
    // eslint-disable-next-line
  }, [adminData]);

  const reset = () => {
    setData((prev)=>{ return Object.keys(prev).reduce((a, b) => ({ ...a, [b]:'' }), {}) });
    img1.current.value = null;
    img2.current.value = null;
  }
  
  const getData = () => {
    getDoc(doc(db, "admin", auth.currentUser.email))
      .then( doc => {
        setAdminData(doc.data()?.blogs || [])
        if (!adminData.length) setEmpty(true);
      })
      .catch( err => {
        setEmpty(true);
        setAdminData([]);
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    
    updateProfile(auth.currentUser, userCred)
    .then(()=>{
      setShow(false); 
      toast.success(<>Data Updated Successfully</>, toastifyProps);
    })
      .catch((err)=>{console.warn({err})});
  };

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

  const handlePublish = () => {
    setI(true);
    setDisable((prev) => ({...prev, post: true}));
    getDoc(doc(db, "admin", "_Counter"))
    .then((snapshot)=>{
      setDate(Date.now());
      addDoc(collection(db, 'blogs'), {
        ...data,
        _heading: data._heading.toLowerCase(),
        _id: +snapshot.data().blogCount + 1,
        _publisher: auth.currentUser.displayName,
        publishTime: date,
        publisherProfilePic: auth.currentUser.photoURL
      })
      .then((ref)=>{
        setAdminData([{ ...imgHolder, _id: +snapshot.data().blogCount + 1, heading: data._heading, publishTime: date, ref: `${ref.id}` }, ...adminData]) 
        updateDoc(doc(db, "admin", "_Counter"), {blogCount: +snapshot.data().blogCount + 1});
        setShareUrl(`${mainUrl}/blog/${ref.id}`);
        setBlogId(ref.id)
      })
      .catch((err) => {
        console.log(err)
        setDisable((prev) => ({...prev, post: false}));
        toast.error(<>Admin Upload Failed</>, toastifyProps);
      })
    })
    .catch((err) => {
      console.log(err)
      setDisable((prev) => ({...prev, post: false}));
      toast.error(<>Get Count Failed</>, toastifyProps);
    })
  };

  const fileUploadHandler = (e) => {
		const file = e.target.files[0];
		const maxSize = 1048576
		if (file.size > maxSize) {
			toast.warning(<>Max size should be 1 mb <br />File size is {(file.size/maxSize).toFixed(2)} mb</>, toastifyProps);
			e.target.value = null;
			return;
		}
		const storageRef = ref(storage,`/Admin/${file.name}`)
		const uploadTask = uploadBytesResumable(storageRef, file);
    setUpload(true);
		console.log({file, storageRef, uploadTask});

		uploadTask.on(
      "state_changed",
			(snapshot) => {
        // update progress
				let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percentage)
			},
			(err) => {
        setUpload(false);
				console.error(err)
			},
			() => {
        // download url
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUpload(false);
          setPercent(0);
					setUserCred((prev)=> ({...prev, photoURL:url }));
				});
			}
    );
  };

  const handleEdit = (id) => {
    setUpdation({update: true, ref: adminData[id].ref, idx: id})
    getDoc(doc(db, 'blogs', adminData[id]?.ref))
    .then((snap) => {setData(prev=>({...prev, ...snap.data()}))})
    .catch((err) => {toast.error(err, toastifyProps)})
  };

  const handleHide = () => {
    reset();
    setShow((prev) => ({...prev, share: false}))
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.info(<>Copied to clipboard</>, toastifyProps);
  };

  const handleUpdate = () => {
    setI(true);
    setDisable((prev) => ({...prev, post: true}));
    setDate(Date.now());
    updateDoc(doc(db, 'blogs', updation.ref), {
      ...data,
      _publisher: auth.currentUser.displayName,
      publisherProfilePic: auth.currentUser.photoURL,
      publishTime: date
    })
    .catch(() =>{
      toast.error(<>blog Update Failed</>, toastifyProps);
    });

    setAdminData(adminData.map((element, idx) => {
      if (idx !== updation.idx) return element;
      return { _id: element._id, heading: data._heading, publishTime: date, ref: element.ref, img1: imgHolder?.img1, img2: imgHolder?.img2 };
    }))

    setShareUrl(`${mainUrl}/blog/${updation.ref}`);
    setBlogId(updation.ref);
  };

  const handleDelete = (idx) => {
    setI(true);
    setDel(true);
    deleteDoc(doc(db, 'blogs', adminData.find(ele => ele._id === idx).ref))
    let images = {img1: adminData.find(ele => ele._id === idx).img1, img2: adminData.find(ele => ele._id === idx)?.img2}
    deleteObject(ref(storage, images.img1))
    .catch((err) => console.log(err))
    if (images?.img2) {
      deleteObject(ref(storage, images.img2))
      .catch((err) => console.log(err))
    }
    setAdminData(adminData.filter(ele => ele._id !== idx))
  };

  const openShare = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  };

  return (
    <>
      <Container fluid className='p-0'>
        <div className='video-container'></div>
        <video autoPlay muted loop className='bg-video' poster={BackgroundImage} preload="metadata" style={{"--height": "100dvh"}}>
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
        <Row style={{height: '60px'}}></Row>
        <Row style={{height: yHeight, "--bs-gutter-x": 0}}>
          <Col xs={3} style={{maxHeight: yHeight, overflowY: "scroll", zIndex:1}}>
            {
              !adminData?.length ?
                empty ? 
                  <Card bg="glass-w" className="m-3 rounded-4 overflow-hidden" style={{'--bs-card-bg': 'none'}}>
                    <Card.Body bg="glass-w" className='text-center'>
                      <div className='text-white-50 fw-bold'>No posts yet</div>
                    </Card.Body>
                  </Card> 
                : 
                  <Card bg="glass-w" className="m-3 rounded-4 overflow-hidden" style={{'--bs-card-bg': 'none'}}>
                    <Card.Body bg="glass-w" className='text-center'>
                      <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" />
                    </Card.Body>
                  </Card> 
              :
                adminData.map(( element, idx) => {
                  return (
                    <Card key={idx} bg="glass-w" className="m-3 rounded-4 position-relative overflow-hidden" style={{'--bs-card-bg': 'none'}}>
                      <Card.Body bg="glass-w">
                        <Row>
                          <Col>
                            <div className="text-white" style={{fontSize: '11px'}}>id: {element?._id}</div>
                          </Col>
                          <Col className="text-end">
                            <div className="text-white" style={{fontSize: '11px'}}>{formatDate(element?.publishTime)}</div>
                          </Col>
                        </Row>
                        <Row>
                          <div className="text-white" style={{fontSize: '14px'}}>{element?.heading?.length > 90 ? element?.heading?.substring(0, 90)+'..' : element?.heading}.</div>
                        </Row>
                      <Row className={`${Styles.cover} d-flex align-items-end`}>
                        <ul className="list-unstyled d-flex justify-content-end mb-1">
                          <li onClick={() => handleEdit(idx)} className="p-2 m-1 mb-0 btn btn-outline-light border-0 d-flex justify-content-center align-items-center" style={{"--i":".1s"}}><PencilSquare /></li>
                          <li onClick={() => { setShareUrl(`${mainUrl}/blog/${element.ref}`); setBlogId(element.ref); setShow((prev) => ({...prev, share: true})); }} className="p-2 m-1 mb-0 btn btn-outline-light border-0 d-flex justify-content-center align-items-center" style={{"--i":".2s"}}><Share /></li>
                          <li onClick={() => handleDelete(element._id)} className="p-2 m-1 mb-0 btn btn-outline-danger border-0 d-flex justify-content-center align-items-center" style={{"--i":".3s"}}><Trash3 /></li>
                        </ul>
                      </Row>
                      </Card.Body>
                    </Card>
                  )
                })
            }
          </Col>
          <Col>
            <AdminForm {...{ yHeight, adminData, data, setData, disable, handlePublish, setDisable, updation, handleUpdate, img1, img2, setImgHolder, length }} />
          </Col>
        </Row>
      </Container>
      <Modal show={show.profile} backdrop="static" keyboard={false} centered scrollable style={{"--bs-modal-border-radius":"1.5rem"}}>
        <Modal.Header className='border-0 px-4 pt-3'>Profile Information</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="text-end">
            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
              <Form.Control type="text" placeholder="Name" onChange={(event)=>{setUserCred((prev)=>({...prev, displayName: event.target.value }))}} />
            </FloatingLabel>
            <Form.Group controlId="image2" className='mb-3 text-start'>
              <Form.Label className="mb-0">Upload image 2 here</Form.Label>
              <Form.Control accept='image/*' type="file" size="sm" onChange={ (e) => { fileUploadHandler(e) } } />
            </Form.Group>
            {
              upload &&
              <ProgressBar className='my-3' striped now={percent} label={`${percent}%`} />
            }
            <Button className='rounded-pill p-2 fw-bold' style={{width: '165px'}} variant="primary" type='submit' disabled={disable.profile}>{!disable.profile ? <>Update</> : <><Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" /> Updating</>}</Button>
          </Form>
        </Modal.Body> 
      </Modal>
      <Modal show={show.share} onHide={(e) => handleHide(e)} backdrop="static" keyboard={false} centered scrollable style={{"--bs-modal-border-radius":"1.5rem"}}>
        <Modal.Header className='border-0 px-4 pt-3' closeButton>Share</Modal.Header>
        <Modal.Body>
          <Button variant='outline-primary p-2 w-100 mb-3' style={{"--app":"#2dd14a"}} onClick={() => openShare(`https://api.whatsapp.com/send?text=${data._heading}${encodeURIComponent(`\n${shareUrl}`)}&type=custom_url&app_absent=0`)}><Whatsapp className='fs-4'/></Button>
          <Button variant='outline-primary p-2 w-100 mb-3' style={{"--app":"#42a5d9"}} onClick={() => openShare(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${data._heading}`)}><Telegram className='fs-4'/></Button>
          <Button variant='outline-primary p-2 w-100' style={{"--app":"#000"}} onClick={() => navigate(`/blog/${blogId}`)}>Open Blog</Button>
          <hr className='my-4'/>
          <InputGroup className="mb-3">
            <Form.Control value={shareUrl} onChange={(e) => setShareUrl(e.target.value)} />
            <Button variant="outline-secondary" onClick={handleCopy} id="button-addon2">Copy</Button>
          </InputGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Admin;