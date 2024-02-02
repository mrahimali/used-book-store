import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const LoginModel = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Firebase = useFirebase();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Please Wait......");

        try {
            const result = await Firebase.loginWithEmailAndPassword(email, password);

            if (result.userInfo === null) {
                // Handle case where user information is not found in Firestore
                console.warn("User information not found in Firestore");
            }

            console.log("Login Successfully", result);
            navigate('/');
            props.handleLoginClose();
        } catch (error) {
            console.error("Error Login : ", error.message);
        }
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Login Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                            placeholder="password...."
                            autoFocus
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        Login
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleLoginClose}>
                    Close
                </Button>

            </Modal.Footer>
        </>
    )
}

export default LoginModel