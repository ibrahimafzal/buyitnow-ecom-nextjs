"use client";

import React, { createContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const api = process.env.api_path

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    //  Signup - Register User
    const registerUser = async ({ name, email, password, avatar }) => {
        try {
            console.log("api => ", api)
            console.log("process.env.api_path => ", process.env.api_path)
            const { data } = await axios.post(`${api}/api/auth/register`, { name, email, password, avatar })

            if (data?.user) {
                router.push("/login")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    const clearErrors = () => {
        setError(null)
    };


    //  Create new Address
    const addNewAddress = async (address) => {
        try {
            const { data } = await axios.post(`${api}/api/address`, address)

            if (data) {
                router.push("/me")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };


    //  Update Address
    const updateAddress = async (id, address) => {
        try {
            const { data } = await axios.put(`${api}/api/address/${id}`, address)

            if (data?.address) {
                setUpdated(true)
                // router.replace(`/address/${id}`)
                router.push('/me')
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };


    //  Delete Address
    const deleteAddress = async (id) => {
        try {
            const { data } = await axios.delete(
                `${api}/api/address/${id}`
            )

            if (data?.success) {
                router.replace('/me')
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    const loadUser = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("/api/auth/session?update")

            if (data?.user) {
                setUser(data.user)
                router.replace("/me")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    //  Update Profile
    const updateProfile = async (id, userData) => {
        try {
            setLoading(true)
            const { data } = await axios.put(`${api}/api/admin/users/${id}`, userData)

            if (data?.user) {
                loadUser()
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setError(error?.response?.data?.message)
        }
    };

    //  Update Password
    const updateThePassword = async ({ currentPassword, newPassword }) => {
        try {
            const { data } = await axios.put(`${api}/api/auth/me/update_password`, { currentPassword, newPassword })
            if (data?.success) {
                router.replace('/me')
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    //  Update User
    const updateUser = async (id, userData) => {
        try {
            const { data } = await axios.put(`${api}/api/admin/users/${id}`, { userData })
            if (data?.success) {
                setUpdated(true)
                router.replace(`/admin/users/${id}`)
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };

    //  Delete User
    const deleteUser = async (id) => {
        try {
            const { data } = await axios.delete(`${api}/api/admin/users/${id}`)
            if (data?.success) {
                router.replace(`/admin/users`)
                toast.success("User deleted")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    };



    return <AuthContext.Provider
        value={{
            error,
            user,
            setUser,
            updated,
            setUpdated,
            registerUser,
            clearErrors,
            addNewAddress,
            updateAddress,
            deleteAddress,
            updateProfile,
            loading,
            updateThePassword,
            updateUser,
            deleteUser
        }}
    >
        {children}
    </AuthContext.Provider>
}


export default AuthContext