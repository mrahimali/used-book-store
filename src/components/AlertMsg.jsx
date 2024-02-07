import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useProductContext } from '../context/ProductContext';

function AlertMsg(props) {

  const prodContext=useProductContext();

  return (
    <>
      <Alert show={props.show} variant="success">
        <p>Success!
        </p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => prodContext.setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertMsg;