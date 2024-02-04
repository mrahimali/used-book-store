import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/FirebaseContext';

const BookCard = (props) => {
    const firebase = useFirebase();

    console.log("User Email from Firebase:", firebase.user ? firebase.user.email : "Not logged in");
    console.log("Props Email:", props.email);

    return (
        <div className='me-3'>
            <Card style={{ width: '18rem', height: '22rem' }}>
                <Card.Img variant="top" src={props.img} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.desc}
                        
                        <Card.Title>Author</Card.Title>
                        <p>Price: Rs. {props.price}</p>
                        
                        {firebase.user && firebase.user.email === props.email ? (
                            <div className='d-flex mb-1'>
                                <Button variant='danger' className='me-1'>Delete</Button>
                                <Button variant='success'>Edit</Button>
                            </div>
                        ) : (
                            <Button>Add To Cart</Button>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookCard;
