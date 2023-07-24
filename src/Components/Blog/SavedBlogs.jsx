import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import BlogsCard from './BlogsCard';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

function SavedBlogs() {
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [blogList, setBlogList] = useState([])
  
  const fetchDocuments = async (keys) => {
    const documents = [];
  
    for (const key of keys) {
      const documentRef = doc(db, 'blogs', key);
      const documentSnapshot = await getDoc(documentRef);
  
      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        documents.push(documentData);
      }
    }
  
    return documents;
  };
  

  useEffect(() => {    
    setBlogList((localStorage.getItem('savedBlogs')?.split(',') ?? []).filter(ele => ele !== ''));
  }, [])
  
  useEffect(()=>{
    if (!blogList.length) {
      setEmpty(true);
      return;
    }
    setEmpty(false);
    fetchDocuments(blogList)
      .then((documents) => {
        setData(documents);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      });
    // eslint-disable-next-line
  }, [blogList])  
  
  return (
    <Container className='pb-4'>
      <Row className="d-none d-lg-block" style={{height:"100px"}}></Row>
      <Row className="d-lg-none d-block" style={{height:"80px"}}></Row>
      <Row className='mt-3'>
        <BlogsCard {...{data, empty, height: '20dvh'}} />
      </Row>
    </Container>
  )
}

export default SavedBlogs