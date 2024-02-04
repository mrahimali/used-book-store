import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { useFirebase } from '../context/FirebaseContext';
import { useProductContext } from '../context/ProductContext';


const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const firebase = useFirebase();
    const cartContext = useProductContext();
    const [clicked, setClicked] = useState(false);

    const login = firebase.isLoggedIn;

    let noOfItem = 0;
    cartContext.product.map(item => noOfItem += 1)

    // const name=
    console.log("User Name : ", firebase.user)

    const handleLoginClose = () => setShowLogin(false);
    const handleLoginShow = () => setShowLogin(true);



    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignUpClose = () => setShowSignUp(false);
    const handleSignUpShow = () => setShowSignUp(true);

    const handleLogOut = () => firebase.logOutuser();

    const handleCart = () => {
        setClicked(true);
        console.log("Clicked state:", clicked);
    }
    
    
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">OldBookHouse</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link><Link className='text-decoration-none text-white' to={'/'}>Home</Link></Nav.Link>
                        <Nav.Link><Link className='text-decoration-none text-white' to={'/profile'}>Profile</Link></Nav.Link>
                        <Nav.Link><Link className='text-decoration-none text-white' to={'/book'}>Books</Link></Nav.Link>
                        <Nav.Link><Link className='text-decoration-none text-white' to={'/orders'}>Orders</Link></Nav.Link>
                    </Nav>
                </Container>
                <InputGroup >
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder='search your book....'
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                </InputGroup>
                {
                    login == false ? <div className='d-flex'><Button variant="primary m-1" onClick={handleLoginShow}>SignIn</Button> <Button variant="secondary m-1" onClick={handleSignUpShow}>SignUp</Button></div> : <Button variant="primary m-1" onClick={handleLogOut}>Logout</Button>
                }
                <Button variant="outline-info me-4" onClick={handleCart} disabled>Cart {noOfItem}</Button>


            </Navbar>



            <>

                {/* Login model */}

                <Modal show={showLogin} onHide={handleLoginClose}>
                    <LoginModal handleLoginClose={handleLoginClose} />
                </Modal>
            </>




            <>

                {/* SignUp model */}

                <Modal show={showSignUp} onHide={handleSignUpClose}>
                    <SignUpModal handleSignUpClose={handleSignUpClose} />
                </Modal>
            </>
        </div>
    )
}

export default NavBar