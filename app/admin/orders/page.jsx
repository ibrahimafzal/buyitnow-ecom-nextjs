import React from 'react'
import axios from 'axios'
import { cookies } from "next/headers"
import queryString from 'query-string'
import Orders from '@/components/admin/Orders'

const getOrders = async (searchParams) => {

  const api = process.env.api_path

  const nextCookies = cookies()
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

  const urlParams = {
    page: searchParams.page || 1
  }

  const searchQuery = queryString.stringify(urlParams)

  const { data } = await axios.get(
    `${api}/api/admin/orders?${searchQuery}`,
    {
      headers: {
        cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
      }
    })

  return data
}


const AdminOrdersPage = async ({ searchParams }) => {

  const orders = await getOrders(searchParams)

  return <Orders orders={orders} />
};

export default AdminOrdersPage