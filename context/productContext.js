"use client";

import React, { createContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

    const api = process.env.api_path

    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    //  create new product
    const newProduct = async (product) => {
        try {
            const { data } = await axios.post(`${api}/api/admin/products`, product)

            if (data) {
                router.replace("/admin/products")
                toast.success("Product Created Successfully")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

     //  update product
     const updateProduct = async (product, id) => {
        try {
            setLoading(true)
            const { data } = await axios.put(`${api}/api/admin/products/${id}`, product)

            if (data) {
                setUpdated(true)
                setLoading(false)
                router.replace(`/admin/products/${id}`)
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

     //  delete product
     const deleteProduct = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`${api}/api/admin/products/${id}`)

            if (data?.success) {
                router.replace(`/admin/products`)
                toast.success("Product Deleted Successfully")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    //  Post Review // Create Review
    const postReview = async (reviewData) => {
        try {
            setLoading(true)
            const { data } = await axios.put(`${api}/api/products/review`, reviewData)

            if (data?.success) {
                router.replace(`/product/${reviewData?.productId}`)
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    const clearErrors = () => {
        setError(null)
        
    };



    return <ProductContext.Provider
        value={{
            error,
            loading,
            updated,
            setUpdated,
            clearErrors,
            newProduct,
            updateProduct,
            deleteProduct,
            postReview
        }}
    >
        {children}
    </ProductContext.Provider>
}


export default ProductContext