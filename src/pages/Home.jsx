import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import img from '../image/img.jpg'
import img2 from '../image/imgg.jpg'
import img3 from '../image/imggg.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFirebase } from '../context/FirebaseContext'
import { Form, InputGroup } from 'react-bootstrap'

const Home = () => {
    const [val, setVal]=useState("");

    const firebase=useFirebase();
    const [books, setBooks]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const books = await firebase.getAllBooks();
            //     // console.log("Result :",books.docs[1].data())
            //     const booksData = books.docs.map(doc => {
            //         // console.log("Id:  ",doc.id);
            //         return doc;
            //     });
            //     setBooks(booksData); // Clear existing data and set with new data
            //     // console.log("Books : ", booksData);
            // } catch (error) {
            //     console.error("Error fetching books:", error);
            // }


            try {
                const books = await firebase.getAllBooks();
                const booksData = books.docs.map(doc => doc.data());
                setBooks(booksData); // Update state with filtered books
                console.log("Books : ", booksData);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };


        fetchData();
    }, []);
    const handleSearch = async (e) => {
        const searchVal = e.target.value.toLowerCase(); // Convert search value to lowercase
        setVal(searchVal); // Update state with the search value

        try {
            const books = await firebase.getAllBooks();
            const booksData = books.docs
                .map(doc => doc.data())
                .filter(book => book.title.toLowerCase().includes(searchVal));
            setBooks(booksData); // Update state with filtered books
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    return (
        <div className="container d-flex flex-wrap">
            <h1 className='mt-3'>Search Your book here !</h1>
             <InputGroup className='mt-3 mb-3'>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Search your book....'
                    value={val}
                    onChange={e => handleSearch(e)}
                />
            </InputGroup>
                        {
                            books.map((book)=>(
                                <BookCard
                                id={book.id}
                                title={book.title}
                                price={book.price}
                                isbn={book.isbn}
                                desc={book.Description}
                                city={book.city}
                                email={book.email}
                                zip={book.zip}
                                img={book.imgDownloadUrl}
                                qty={null}
                                 />
                            ))
                        }
        </div>
    )
}

export default Home