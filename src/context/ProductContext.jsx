import React, { createContext, useContext, useState } from 'react'

const ProductContext=createContext();


export const useProductContext=()=>useContext(ProductContext)

export const ProductContextProvider=(props)=>{
    const [product, setProduct]=useState([]);
    return(
        <ProductContext.Provider value={{product, setProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}