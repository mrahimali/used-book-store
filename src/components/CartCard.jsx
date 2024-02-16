import React, { useState } from 'react';
import { Button, Container, Row, Col, Image, Nav } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import PlaceOrder from './PlaceOrder';





const CartCard = () => {



    const cartProduct = useProductContext();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (cartProduct.product.length === 0) {
        return <p>Your cart is empty</p>;
    }
    const increaseQty = (productIsbn) => {
        const updatedCart = cartProduct.product.map(product => {
            if (product.isbn === productIsbn) {
                return { ...product, qty: product.qty + 1 };
            }
            return product;
        });
        cartProduct.setProduct(updatedCart);
    };

    const decreaseQty = (productIsbn) => {
        const updatedCart = cartProduct.product.map(product => {
            if (product.isbn === productIsbn && product.qty > 1) {
                return { ...product, qty: product.qty - 1 };
            }
            return product;
        });
        cartProduct.setProduct(updatedCart.filter(product => product.qty > 0));
    };

    const removeProd = (productIsbn) => {
        const updatedCart = cartProduct.product.filter(product => product.isbn !== productIsbn);
        cartProduct.setProduct(updatedCart);
    };

    let grossTotal = 0;

    return (
        <div>
            {
                cartProduct.product.map(product => {
                    grossTotal = grossTotal + (product.qty * product.price)
                    return (
                        <Container className='mt-4' key={product.id}>
                            <Row className='border p-3'>
                                <Col md={3} className='text-center'>
                                    <Image src={product.img} alt='Product Image' width={200} className='mb-3' />
                                    <p>Price: ${product.price}</p>
                                </Col>
                                <Col md={6} className='d-flex flex-column justify-content-between'>
                                    <div>
                                        <h4>{product.title}</h4>
                                        <p>Author: Author Name</p>
                                        <p>ISBN Number: {product.isbn}</p>
                                        <p>Owner's Contact: {product.email}</p>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <Button variant='secondary' size='sm' className='me-2' onClick={() => increaseQty(product.isbn)}>
                                            +
                                        </Button>
                                        <span className='fw-bold'>{product.qty}</span>
                                        <Button variant='secondary' size='sm' className='ms-2' onClick={() => decreaseQty(product.isbn)}>
                                            -
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={3} className='text-center'>
                                    <div className='mb-3'>
                                        <p>Total:</p>
                                        <strong>Rs.{product.price * product.qty}</strong>
                                    </div>
                                    <Button variant='danger' size='sm' onClick={() => removeProd(product.isbn)}>
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    )


                })
            }
            <div className='text-center mb-5'>
                <h5 >Total Payable Ammount : {grossTotal}</h5>
                <Button onClick={handleShow} >Place Your Order</Button>
            </div>



            <Modal show={show} onHide={handleClose}>
                <PlaceOrder handleClose={handleClose} product={cartProduct.product}/>
            </Modal>
        </div>
    )
}

export default CartCard;
