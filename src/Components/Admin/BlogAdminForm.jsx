import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, ProgressBar, Row, Spinner } from 'react-bootstrap';
import { storage } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

function AdminForm({ yHeight, data, setData, handlePublish, disable, setDisable, updation, handleUpdate, img1, img2, setImgHolder, length }) {
  
	const [percent, setPercent] = useState(0);
	const [upload, setUpload] = useState({
		img1: false,
		img2: false
	});
	
	useEffect(() => {
    if (!data?._heading || !data?.body1 || data?.body1?.length < 200|| data?._heading?.length < 40 || !data?.body2 || !data?.img1) {
      setDisable((prev)=>({...prev, empty:true}));
      return ;
    }
		setDisable((prev)=>({...prev, empty:false}));
    // eslint-disable-next-line
  }, [data]);

	const fileUploadHandler = (setUpload, e, img) => {
		const file = e.target.files[0];
		const maxSize = 1048576
		if (file.size > maxSize) {
			toast.warning(<>Max size should be 1 mb <br />File size is {(file.size/maxSize).toFixed(2)} mb</>, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
			e.target.value = null;
			return;
		}
		const storageRef = ref(storage,`/Blogs/${file.name}`)
		const uploadTask = uploadBytesResumable(storageRef, file);
		setUpload((prev) => ({...prev, [img]:true}));
		setImgHolder((prev) => ({...prev, [img]:`Blogs/${file.name}`}));

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// update progress
				let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				setPercent(percentage);
				// console.log(percentage)
			},
			(err) => {
				console.error(err)
				setUpload(false);
			},
			() => {
				// download url
				setUpload(false);
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setData((prev)=> ({...prev, [img]:url }));
				});
			}
		);
	};

  return (
    <Card className="rounded-0" style={{height:"100%", maxHeight: yHeight, overflowY: "scroll"}}>
			<Card.Body>
				<Row>
					<Form>
						<Form.Group className="mb-2" controlId="Heading">
							<Form.Label className="mb-0">Heading <span className='text-danger'>*</span></Form.Label>
							<Form.Control value={data?._heading} onChange={ (e) => { setData( (prev) => ({...prev, _heading:e.target.value }) ) } } maxLength="150" type="email" size="sm" />
							<div className='text-end'>{data?._heading?.length}/150</div>
						</Form.Group>
						<Row>
							<Col>
								<Form.Group controlId="image1">
									<Form.Label className="mb-0">Upload image 1 here <span className='text-danger'>*</span></Form.Label>
									<Form.Control ref={img1} accept='image/*' type="file" size="sm" onChange={ (e) => { fileUploadHandler(setUpload, e, "img1") } } />
								</Form.Group>
								{
									upload.img1 &&
									<ProgressBar className='mt-3' striped now={percent} label={`${percent}%`} />
								}
								{
									data.img1 && 
									<img src={data.img1} alt="Url Not Found" height={60} className='mt-3' />
								}
							</Col>
							<Col>
								<Form.Group controlId="body1">
									<Form.Label className="mb-0">Body 1 <span className='text-danger'>*</span></Form.Label>
									<Form.Control value={data?.body1} onChange={ (e) => { setData( (prev) => ({ ...prev, body1:e.target.value }) ) } } maxLength='1500' as="textarea" rows={4} size="sm"/>
								</Form.Group>
								<div className='text-end'>{data?.body1.length}/1500</div>
							</Col>
						</Row>
						<hr className='my-2' />
						<Row>
							<Col>
								<Form.Group controlId="image2">
									<Form.Label className="mb-0">Upload image 2 here</Form.Label>
									<Form.Control ref={img2} accept='image/*' type="file" size="sm" onChange={ (e) => { fileUploadHandler(setUpload, e, "img2") } } />
								</Form.Group>
								{
									upload.img2 &&
									<ProgressBar className='mt-3' striped now={percent} label={`${percent}%`} />
								}
								{
									data.img2 && 
									<img src={data.img2} alt="Url Not Found" height={60} className='mt-3' />
								}
							</Col>
							<Col>
								<Form.Group controlId="body2">
									<Form.Label className="mb-0">Body 2 <span className='text-danger'>*</span></Form.Label>
									<Form.Control value={data?.body2} onChange={ (e) => { setData( (prev) => ({...prev, body2:e.target.value }) ) } } as="textarea" rows={4} size="sm"/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group controlId="body3">
							<Form.Label className="mb-0">Body 3</Form.Label>
							<Form.Control value={data?.body3} onChange={ (e) => { setData( (prev) => ({...prev, body3:e.target.value }) ) } } as="textarea" rows={4} size="sm"/>
						</Form.Group>
						<Row className='my-3'>
							<Col xs={4} className='offset-2'>
								<Button variant='outline-dark' className='w-100 rounded-pill fw-bold'>Save As Draft</Button>
							</Col>
							<Col xs={4}>
								{
									updation.update
									?
									<Button className='w-100 rounded-pill fw-bold' disabled={disable.empty||disable.post} onClick={handleUpdate}>{!disable.post ? <>Update</> : <><Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" className='me-2' /> Updating</>}</Button>
									:
									<Button className='w-100 rounded-pill fw-bold' disabled={disable.empty||disable.post} onClick={handlePublish}>{!disable.post ? <>Publish</> : <><Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" className='me-2' /> Publishing</>}</Button>
								}
							</Col>
						</Row>
						<div className='text-center'> Total Posts: {length}</div>
					</Form>
				</Row>
			</Card.Body>
    </Card>
  );
}

export default AdminForm;