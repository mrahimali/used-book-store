import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/FirebaseContext';
import { useProductContext } from '../context/ProductContext';

const BookCard = (props) => {
    const firebase = useFirebase();
    const productContext = useProductContext();

    const [clicked, setClicked] = useState(false);

    const addToCart = () => {
        productContext.product.map(prod => {
            if (prod.id == props.id) {
                prod.qty += 1
            }
        })
        const data = {
            id: props.id,
            title: props.title,
            author: props.author,
            isbn: props.isbn,
            price: props.price,
            qty: 1
        }
        productContext.setProduct([...productContext.product, data])


        
    }


    const reduceFromCart = () => {

    }


    return (
        <div className='me-3 mb-4'>
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

                            <div>
                                <Button variant='secondary' className='me-3' onClick={addToCart} >+</Button>
                                <Button variant='secondary' onClick={reduceFromCart} >-</Button>
                            </div>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookCard;
