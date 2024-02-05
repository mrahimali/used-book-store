import React from 'react'
import Rab from '../image/rab.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';



const CartCard = () => {
    return (
        <div>
            <Container className='mt-4'>
                
                <Row className='border p-3'>
                    <Col md={3} className='text-center'>
                        <Image src={Rab} roundedCircle alt='Product Image' width={100} className='mb-3' />
                        <p>Price: $200</p>
                    </Col>
                    <Col md={6} className='d-flex flex-column justify-content-between'>
                        <div>
                            <h4>Title</h4>
                            <p>Author: Author Name</p>
                            <p>ISBN Number: 123456789</p>
                            <p>Owner's Contact: 9876543210</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <Button variant='secondary' size='sm' className='me-2'>
                                +
                            </Button>
                            <span className='fw-bold'>1</span>
                            <Button variant='secondary' size='sm' className='ms-2'>
                                -
                            </Button>
                        </div>
                    </Col>
                    <Col md={3} className='text-center'>
                        <div className='mb-3'>
                            <p>Total:</p>
                            <strong>$200</strong>
                        </div>
                        <Button variant='danger' size='sm'>
                            Remove
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CartCard