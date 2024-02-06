import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import img from '../image/img.jpg'
import img2 from '../image/imgg.jpg'
import img3 from '../image/imggg.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFirebase } from '../context/FirebaseContext'

const Home = () => {

    const firebase=useFirebase();
    const [books, setBooks]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await firebase.getAllBooks();
                // console.log("Result :",books.docs[1].data())
                const booksData = books.docs.map(doc => {
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
    }, []);


    return (
        <div className="container d-flex flex-wrap">
                        {
                            books.map((book)=>(
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
                                qty={null}
                                 />
                            ))
                        }
        </div>
    )
}

export default Home