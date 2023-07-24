import React from 'react'
import Preloader from '../Preloader'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BookmarkPlus, BoxArrowUp } from 'react-bootstrap-icons';
import LeafBlack from '../Assets/leaf-black.png'

function BlogsCard({data, empty, height}) {

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

  return (
    <>
      {
        !data.length? 
          empty? 
          <div className="text-black-50 text-center fs-4 mt-5">
            No blogs found.
          </div>
          :
          <Preloader h={height} /> :
        data.map((element, idx) => {
          return (
            <Col lg={4} md={6} xs={12} key={idx}>
              <Card as={Link} to={`/blog/${element?.docRef}`} className="shadow-lg card-rounded mb-3 text-decoration-none text-black" bg='light' style={{minHeight:'450px'}}>
                <Card.Img variant='top' src={element?.img1} style={{height: '200px'}} loading="lazy" />
                <Card.Body>
                  <h6 className="fw-bold text-justify">{element?._heading?.length > 70 ? element?._heading?.substring(0, 70)+'..' : element?._heading}.</h6>
                  <div className='mt-3 d-flex'>
                    <img src={element.publisherProfilePic} className='rounded-circle' style={{width: "37px", height: '37px'}} alt="Publisher profile pic" />
                    <div className="ms-2">
                      <div className="fs-7 fw-bold">{element?._publisher}</div>
                      <div className="fs-7 text-black-50">{formatDate(element?.publishTime)}</div>
                    </div>
                  </div>
                  <Card.Text className="lh-sm my-2">
                    {element?.body1?.length > 190 ? element?.body1?.substring(0, 190)+'..' : element?.body1}.<b>read more.</b>
                    {/* {element?.body1}. */}
                  </Card.Text>
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="fs-6 mx-2 d-flex align-items-center">
                      <img src={LeafBlack} width={16} alt="like" className='me-1' /> {element?.like}</div>
                    <div className="fs-6 mx-2 d-flex align-items-center">
                      <BoxArrowUp className='me-1' /> {element?.share}
                    </div>
                    <div className="fs-6 mx-2 d-flex align-items-center">
                      <BookmarkPlus className='me-1' /> {element?.save}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      }
    </>
  )
}

export default BlogsCard