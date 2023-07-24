import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'

function Preloader({h}) {
  return (
    <Container fluid className='m-0 p-0'>
        <Row className="d-flex justify-content-center align-items-center m-0 p-0" style={{height: `calc(100dvh - ${h})`}}>
            <Spinner animation="grow" style={{color: "#00C170"}} />
        </Row>
    </Container>
  )
}

export default Preloader;