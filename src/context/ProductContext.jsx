import React, { createContext, useContext, useState } from 'react'

const ProductContext=createContext([]);


export const useProductContext=()=>useContext(ProductContext)

export const ProductContextProvider=(props)=>{
    const [product, setProduct]=useState([]);
    const [show, setShow] = useState(true);


    return(
        <ProductContext.Provider value={{product, setProduct, show, setShow}}>
            {props.children}
        </ProductContext.Provider>
    )
}