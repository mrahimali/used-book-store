import React from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';

const CartCard = () => {
    const cartProduct = useProductContext();

    if (cartProduct.product.length === 0) {
        return <p>Your cart is empty</p>;
    }
    const increaseQty = (productId) => {
        const updatedCart = cartProduct.product.map(product => {
            if (product.id === productId) {
                return { ...product, qty: product.qty + 1 };
            }
            return product;
        });
        cartProduct.setProduct(updatedCart);
    };

    const decreaseQty = (productId) => {
        const updatedCart = cartProduct.product.map(product => {
            if (product.id === productId && product.qty > 1) {
                return { ...product, qty: product.qty - 1 };
            }
            return product;
        });
        cartProduct.setProduct(updatedCart.filter(product => product.qty > 0));
    };

    const removeProd = (productId) => {
        const updatedCart = cartProduct.product.filter(product => product.id !== productId);
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
                                        <Button variant='secondary' size='sm' className='me-2' onClick={() => increaseQty(product.id)}>
                                            +
                                        </Button>
                                        <span className='fw-bold'>{product.qty}</span>
                                        <Button variant='secondary' size='sm' className='ms-2' onClick={() => decreaseQty(product.id)}>
                                            -
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={3} className='text-center'>
                                    <div className='mb-3'>
                                        <p>Total:</p>
                                        <strong>Rs.{product.price * product.qty}</strong>
                                    </div>
                                    <Button variant='danger' size='sm' onClick={() => removeProd(product.id)}>
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    )


                })
            }
            <div className='text-center'>
                <h5 >Total Payable Ammount : {grossTotal}</h5>
                <Button variant='success' className='alig'>Pay</Button>
            </div>
        </div>
    )
}

export default CartCard;
