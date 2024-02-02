import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


const BookCard = (props) => {
    return (
        <div className=''>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.value} />
                <Card.Body>
                    <Card.Title>Book Name</Card.Title>
                    <Card.Text>
                        Here we will show description of the book saved in our database.
                        
                        <Card.Title>Author</Card.Title>
                        <p>Price : Rs. 500</p>
                        <Button>Add To Cart</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BookCard