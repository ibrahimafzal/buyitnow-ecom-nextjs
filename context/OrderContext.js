"use client";

import React, { createContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderContext = createContext()

const api = process.env.api_path

export const OrderProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [canReview, setCanReview] = useState(false)

    const router = useRouter()

    //  update order
    const updateOrder = async (id, orderData) => {
        try {
            const { data } = await axios.put(`${api}/api/admin/orders/${id}`, orderData)

            if (data?.success) {
                setUpdated(true)
                router.replace(`/admin/orders/${id}`)
                toast.success("Order Updated Successfully")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    //  update order
    const deleteOrder = async (id) => {
        try {
            const { data } = await axios.delete(`${api}/api/admin/orders/${id}`)

            if (data?.success) {
                router.replace(`/admin/orders`)
                toast.success("Order Deleted Successfully")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    //  update order
    const canUserReview = async (id) => {
        try {
            const { data } = await axios.get(`${api}/api/orders/can_review?productId=${id}`)

            if (data?.canReview) {
                setCanReview(data?.canReview)
                toast.warn("Order Deleted Successfully")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    // CLEAR ERRORS
    const clearErrors = () => {
        setError(null)
    };



    return <OrderContext.Provider
        value={{
            error,
            updated,
            setUpdated,
            clearErrors,
            deleteOrder,
            updateOrder,
            canReview,
            canUserReview
        }}
    >
        {children}
    </OrderContext.Provider>
}


export default OrderContext