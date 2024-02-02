import React from 'react'
import Pic from '../image/img.jpg'
import { Button } from 'react-bootstrap'



const BookComp = ({ title, price, isbn }) => {
    return (
        <div>
            <h3>Title: {title}</h3>
            <p>Price: {price}</p>
            <p>ISBN: {isbn}</p>
            {/* Add more JSX to display other book details as needed */}
        </div>
    );
};



// const BookComp = (props) => {

//     return (
//             <div className="d-flex border rounded">
//                 <div>
//                     <img src={Pic} alt="" width={400} className='border rounded p-2' />
//                 </div>
//                 <table className="table table-hover">
//                     <tbody>
//                         <tr className='text-center'>
//                             <td col="2">Title : </td>
//                             <td>{props.title}</td>
//                         </tr>
//                         <tr className='text-center'>
//                             <td col="2">Price : </td>
//                             <td>{props.price}</td>
//                         </tr>
//                         <tr className='text-center'>
//                             <td col="2">ISBN : </td>
//                             <td>{props.isbn}</td>
//                         </tr>
//                         <tr className='text-center'>
//                             <td col="2">Key : </td>
//                             <td>{props.key}</td>
//                         </tr>
//                         <tr className='text-center '>
//                             <td col="2"><Button variant='success'>Edit Book</Button></td>
//                             <td><Button variant='danger'>Delete Book</Button></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//     )
// }

export default BookComp