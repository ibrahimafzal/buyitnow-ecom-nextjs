import React from 'react'
import axios from 'axios'
import { cookies } from "next/headers"
import UpdateAddress from '@/components/user/UpdateAddress'

const getAddress = async (id) => {

    const api = process.env.api_path

    const nextCookies = cookies()
    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    const { data } = await axios.get(`${api}/api/address/${id}`, {
        headers: {
            cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    })

    return data?.address
}


const UpdateAddressPage = async ({ params }) => {

    const address = await getAddress(params?.id)

    return <UpdateAddress id={params?.id} address={address} />
};

export default UpdateAddressPage