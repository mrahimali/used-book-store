import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import CartCard from './CartCard';

const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
    const cartContext = useProductContext();

    useEffect(() => {
        setProducts(cartContext.product);
    }, [cartContext.product]);

    return (
        <div className='container'>
            <h1 className='text-center mb-4'>Your Cart</h1>
                <CartCard />
        </div>
    );
};

export default ShoppingCart;
