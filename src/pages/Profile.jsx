import React from 'react'
import Rab from '../image/rab.png'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

const Profile = () => {


    return (
        <div className='container'>
            <h1 className='mt-4 text-center'>Your Profile</h1>
            <Container>
                <Row >
                    <Col >
                        <Image src={Rab} width={300} roundedCircle />
                    </Col>

                    <Col xs lg="2" className='mt-5'>

                        <div className='mb-2'>
                            <h5>Name :</h5>
                        </div>

                        <div className='mb-2'>
                            <h5> Email :</h5>
                        </div>

                        <div className='mb-2'>
                            <h5>Phone Number :</h5>
                        </div>

                        <div className='mb-2'>
                            <h5>City :</h5>
                        </div>

                        <div className='mb-2'>
                            <h5>State :</h5>
                        </div>
                    </Col>
                    <Col xs lg='2' className='mt-5'>
                        <div className='mb-2'>
                            <h5>Rahim</h5>
                        </div>
                        <div className='mb-2'>
                            <h5>rahim@gmail.com</h5>
                        </div>
                        <div className='mb-2'>
                            <h5>1234567890</h5>
                        </div>
                        <div className='mb-2'>
                            <h5>Bareilly</h5>
                        </div>
                        <div className='mb-2'>
                            <h5>UP</h5>
                        </div>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button variant="success" size="lg">
                        Edit Your Info
                    </Button>
                </div>
            </Container>     

        </div>
    )
}

export default Profile