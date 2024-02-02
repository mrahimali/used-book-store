import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const SignUpModel = (props) => {

    const navigate=useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");

    const firebase = useFirebase();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creating User......");
    
        try {
            const res = await firebase.signUpUserWithEmailAndPassword(name,email, password,phone, city, state);
            setEmail("");
            setPassword("");
            navigate('/');
            props.handleSignUpClose();
        } catch (error) {
            console.error("Error creating user: ", error.message);
        }
    }
    



    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter your name"
                            autoFocus
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password...."
                            autoFocus
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your phone number..."
                            autoFocus
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="your city...."
                            autoFocus
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="State..."
                            autoFocus
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        Create Account
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleSignUpClose}>
                    Close
                </Button>

            </Modal.Footer>
        </>
    )
}

export default SignUpModel