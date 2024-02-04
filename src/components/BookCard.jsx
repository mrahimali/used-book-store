import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/FirebaseContext';
import { useProductContext } from '../context/ProductContext';

const BookCard = (props) => {
    const firebase = useFirebase();
    const productContext=useProductContext();

    // const [prod, setProd]=useState({});

    console.log("User Email from Firebase:", firebase.user ? firebase.user.email : "Not logged in");
    console.log("Props Email:", props.email);
    // const [prod, setProd]=useState({});

    const addToCart=()=>{
        const data={
            id: props.id,
            title: props.title,
            author: props.author,
            isbn: props.isbn,
            price: props.price,
            qty:1
        }
        productContext.setProduct([...productContext.product, data ])
    }

    return (
        <div className='me-3'>
            <Card style={{ width: '18rem', height: '22rem' }}>
                <p></p>
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
                            <Button onClick={addToCart}>Add To Cart</Button>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookCard;
