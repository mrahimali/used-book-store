import React from 'react'
import Pic from '../image/img.jpg'
import { Button } from 'react-bootstrap'

const Orders = () => {
    return (
    <div className=" container mt-3">
        <h1>Orders</h1>
        <div className=" d-flex border rounded">

            <div>
                <img src={Pic} alt="" width={300} className='border rounded p-2' />
            </div>
            <table className="table table-hover">
                <tbody>
                    <tr className='text-center'>
                        <td colspan="2">Title : </td>
                        <td>Akkllpdodmc</td>
                    </tr>
                    <tr className='text-center'>
                        <td colspan="2">Title : </td>
                        <td>Akkllpdodmc</td>
                    </tr>
                    <tr className='text-center'>
                        <td colspan="2">Title : </td>
                        <td>Akkllpdodmc</td>
                    </tr>
                    <tr className='text-center'>
                        <td colspan="2">Title : </td>
                        <td>Akkllpdodmc</td>
                    </tr>
                </tbody>

            </table>

        </div>
        <div className="d-grid gap-2 container mt-3">
            <Button variant="danger" size="lg">
                Cancel Order
            </Button>
        </div>
    </div>
    )
}

export default Orders