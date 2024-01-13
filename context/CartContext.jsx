"use client";

import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const router = useRouter()

    useEffect(() => {
        setCartToState()
    }, [])

    const setCartToState = () => {
        setCart(
            localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) :
                []
        )
    }

    //  Add Item To Cart
    const addItemToCart = async ({ product, name, price, image, stock, seller, quantity = 1 }) => { //product means product_id  e.g (_id: 347575383fufjuw283)
        const item = { product, name, price, image, stock, seller, quantity }
        const isItemExist = cart?.cartItems?.find((i) => i.product === item.product)

        let newCartItems;

        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) =>
                i.product === isItemExist.product ? item : i
            )
        } else {
            newCartItems = [...(cart?.cartItems || []), item];
        }

        localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }))
        setCartToState()
    }

    //  Delete Item from Cart
    const deleteItemFromCart = (id) => {
        const newCartItems = cart?.cartItems?.filter((c) => c.product !== id)
        localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }))
        setCartToState()
    }

    //  Checkout Handler
    const saveOnCheckout = ({ amount, tax, totalAmount }) => {
        const checkoutInfo = { amount, tax, totalAmount }

        const newCart = { ...cart, checkoutInfo }

        localStorage.setItem('cart', JSON.stringify(newCart))
        setCartToState()
        router.push("/shipping")
    }

    // clear cart
    const clearCart = () => {
        localStorage.removeItem("cart")
        setCartToState()
    }






    return <CartContext.Provider value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        saveOnCheckout,
        clearCart
    }}
    >
        {children}
    </CartContext.Provider>
}


export default CartContext