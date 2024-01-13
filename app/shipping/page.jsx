
import React from 'react'
import axios from 'axios'
import { cookies } from "next/headers"
import Shipping from '@/components/cart/Shipping'

const getAddresses = async () => {

  const api = process.env.api_path

  const nextCookies = cookies()
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

  const { data } = await axios.get(`${api}/api/address`, {
    headers: {
      cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
    }
  })

  return data?.addresses
}


const ShippingPage = async () => {

  const addresses = await getAddresses()

  return <Shipping addresses={addresses} />
};

export default ShippingPage