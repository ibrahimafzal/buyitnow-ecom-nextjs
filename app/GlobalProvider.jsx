"use client";

import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/authContext"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";
import { ProductProvider } from "@/context/productContext";
import { OrderProvider } from "@/context/OrderContext";


export const GlobalProvider = ({ children }) => {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
            />
            <AuthProvider>
                <CartProvider>
                    <OrderProvider>
                        <ProductProvider>
                            <SessionProvider>{children}</SessionProvider>
                        </ProductProvider>
                    </OrderProvider>
                </CartProvider>
            </AuthProvider>
        </>
    )
}