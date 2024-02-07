import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/FirebaseContext';
import { useProductContext } from '../context/ProductContext';

const BookCard = (props) => {
    const firebase = useFirebase();
    const productContext = useProductContext();
    // const [qty, setQty]=useState(0);


    const addToCart = () => {
        const existingProductIndex = productContext.product.findIndex(prod => prod.id === props.id);
    
        if (existingProductIndex !== -1) {
            // Product is already in the cart, update its quantity
            const updatedCart = [...productContext.product];
            updatedCart[existingProductIndex].qty = 1;
            productContext.setProduct(updatedCart);
        } else {
            // Product is not in the cart, add it with quantity 1
            const data = {
                id: props.id,
                title: props.title,
                author: props.author,
                isbn: props.isbn,
                email:props.email,
                img:props.img,
                price: props.price,
                qty: 1
            };
            productContext.setProduct([...productContext.product, data]);
            // setQty(qty+1)
        }
        
    }
    // useEffect(() => {
    //     console.log(productContext.product);
    // }, [productContext.product]);


    return (
        <div className='me-3 mb-4'>
            <Card style={{ width: '18rem', height: '22rem' }}>
                <p></p>
                <Card.Img variant="top" src={props.img} height={130} />
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
                                <Button variant='primary' className='me-3' onClick={addToCart} >Add To Cart</Button>{props.qty}
                            </div>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookCard;
