import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { collection, query, getDocs, orderBy, limit, startAfter, where} from "firebase/firestore";
import KrishiTalks from '../Assets/logo/krishiTalks.svg'
import { Search } from "react-bootstrap-icons";
import { useState } from "react";
import { db } from '../../firebase';
import BlogsCard from "./BlogsCard";

function Blog() {
  document.title = "Ouranos Robotics | Blog";
  const [que, setQue] = useState('');
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    getDocs(query(collection(db, 'blogs'), orderBy("publishTime", "desc"), limit(6)))
    .then((snapshot) => {
      setData(snapshot.docs.map(doc => ({...doc.data(), docRef: doc.id})) || [])
      if(!data.data)setEmpty(true);
    })
    .catch(() => {
      setEmpty(true);
      setData([]);
    })
    // eslint-disable-next-line
  }, [])

  const getData = async() => {
    const lastVisible = data[data?.length - 1];
    const snap = await getDocs(query(collection(db, 'blogs'), orderBy("publishTime", "desc"), startAfter(lastVisible.publishTime), limit(6)))
    const arr = snap.docs.map(doc => ({...doc.data(), docRef: doc.id})) ?? []
    setData([...data, ...arr ])
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight && !que) {
        try {
          getData();
        } catch (error) {
          console.log(error)
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [data])

  const searchFirebase = async() => {
    const q = query(collection(db, "blogs"), where("_heading", ">=", que), where("_heading", "<=", que + '\uf8ff'));

    const querySnapshot = await getDocs(q);
    let arr = []
    querySnapshot.forEach((doc) => {
      const d = {...doc.data(), docRef: doc.id}
      arr.push(d)
    });
    setData(arr)

  };

  useEffect(() => {
    if (que) searchFirebase();
    // eslint-disable-next-line
  }, [que])
    
  return (
    <Container bg='light' className="pb-5">
      <Row className="d-none d-lg-block" style={{height:"100px"}}></Row>
      <Row className="d-lg-none d-block" style={{height:"80px"}}></Row>
      <Row className="pt-5 text-center d-block">
        <img src={KrishiTalks} height={50} alt="KrishiTalks logo" />
        <h3 className="mt-3" style={{color: "#005718"}}>Find some of the most insteresting <span style={{color: "#9DC344"}}>Agro-Technical</span> Blogs here!</h3>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Row className="shadow-lg rounded-pill p-2" style={{width: "min(80dvw, 500px)"}}>
          <Col xs={1}>
            <Search />
          </Col>
          <Col>
            <input type="text" value={que} onChange={(e)=>setQue(e.target.value)} placeholder="Search" className="w-100 border border-0" style={{outline:"none"}} />
          </Col>
        </Row>
      </Row>
      <Row className="mt-5">
        <BlogsCard {...{data, empty, height: '40dvh'}} />
      </Row>
      {!que && <Row className="d-lg-none d-flex justify-content-center">
        <Button variant="outline-primary" style={{width:'150px', '--app': '#00C170'}} onClick={getData}> Load more</Button>
      </Row>}
    </Container>
  );
}

export default Blog;
