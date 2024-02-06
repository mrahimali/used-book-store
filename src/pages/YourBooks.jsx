import React, { useEffect, useState } from 'react'
// import BookComp from '../components/BookComp'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { Container } from 'react-bootstrap';


const YourBooks = () => {
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [isbn, setIsbn] = useState("");
    const [author, setAuthor] = useState("");
    const [img, setImg] = useState("");
    const [city, setCity] = useState("");
    const [stat, setStat] = useState("");
    const [zip, setZip] = useState("");
    const [flag, setFlag] = useState(false);

    const [books, setBooks] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const firebase = useFirebase();


    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await firebase.getBooksByUserEmail();
                // console.log("Result :",res.doc)
                const booksData = res.docs.map(doc => {
                    // console.log("Id:  ",doc.id);
                    return doc;
                });
                setBooks(booksData); // Clear existing data and set with new data
                // console.log("Books : ", booksData);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };


        fetchData();
    }, [flag]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        try {
            const res = await firebase.addBookToSell(title, price, isbn, author, img, city, stat, zip);
            console.log("Result : ", res);
            if (flag) {
                setFlag(false)
            } else {
                setFlag(true)
            }
            setTitle("")
            setAuthor("")
            setCity("")
            setZip("")
            setImg(null)
            setIsbn("")
            setPrice("")
            setStat("")

            handleClose();


        } catch (error) {
            console.error("Error adding book:", error);
        }
    };



    return (
        <div className='container mt-2'>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className='text-center'>Your Books</h1>
                </div>
                <div>

                    <Button onClick={handleShow}>Add Book</Button>
                </div>

            </div>
            <div className="container d-flex flex-wrap ">
                {books.map((book) => (
                        <BookCard
                        id={book.id}
                        title={book.data().title}
                        price={book.data().price}
                        isbn={book.data().isbn}
                        desc={book.data().Description}
                        city={book.data().city}
                        email={book.data().email}
                        zip={book.data().zip}
                        img={book.data().imgDownloadUrl}
                    />
                    )
                )}
            </div>





            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Your Book Here!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title Of Book</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="title..."
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group className="me-5" as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="set price for you book"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="ISBN number..."
                                    value={isbn}
                                    onChange={e => setIsbn(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Description..."
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                required
                                type="file"
                                onChange={e => setImg(e.target.files[0])}
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" >
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    required
                                    value={city}
                                    onChange={e => setCity(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" >
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="State"
                                    required
                                    value={stat}
                                    onChange={e => setStat(e.target.value)}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="3" >
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Zip"
                                    required
                                    value={zip}
                                    onChange={e => setZip(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid zip.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit" className='me-4'>Add Book</Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default YourBooks