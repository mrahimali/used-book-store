import React from 'react'
import BookCard from '../components/BookCard'
import img from '../image/img.jpg'
import img2 from '../image/imgg.jpg'
import img3 from '../image/imggg.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {



    return (
        <div className='container d-flex'>
            <Container>
                <Row className='mt-3'>
                    <Col><BookCard value={img} /></Col>
                    <Col><BookCard value={img2} /></Col>
                    <Col><BookCard value={img3} /></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home