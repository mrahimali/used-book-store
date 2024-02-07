import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFirebase } from '../context/FirebaseContext';
import { useProductContext } from '../context/ProductContext';


const PlaceOrder = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");
    const [qty, setQty] = useState(null);

    

    const firebase = useFirebase();
    const bookCart = useProductContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const orderPromises = props.product.map(product => {
                return firebase.placeOrder(email, phone, address, pin, product.id, product.qty);
            });

            // Execute all promises concurrently
            const orderResults = await Promise.all(orderPromises);

            // Handle the response from the backend
            console.log(orderResults);
            bookCart.setShow(true);
            props.handleClose();
        } catch (error) {
            // Handle any errors
            console.error("Error placing orders:", error);
        }
    }


    return (
        <div>
            
            <Modal.Header closeButton>
                <Modal.Title>Please Provide Your Shipping Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your contact number"
                            autoFocus
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Your Shipping Address</Form.Label>
                        <Form.Control as="textarea" value={address} onChange={e => setAddress(e.target.value)} rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>PIN Code</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="zip code "
                            autoFocus
                            onChange={e => setPin(e.target.value)}
                            value={pin}
                        />
                    </Form.Group>
                    <Button variant="success" type='submit'>
                        Place Your Order
                    </Button>
                </Form>
            </Modal.Body>
        </div>
    )
}

export default PlaceOrder;
