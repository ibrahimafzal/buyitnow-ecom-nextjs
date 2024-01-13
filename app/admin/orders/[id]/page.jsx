import React from 'react'
import axios from 'axios'
import { cookies } from "next/headers"
import UpdateOrder from '@/components/admin/UpdateOrder'

const getOrder = async (id) => {

  const api = process.env.api_path

  const nextCookies = cookies()
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

  const { data } = await axios.get(
    `${api}/api/admin/orders/${id}`,
    {
      headers: {
        cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
      }
    })

  return data.order
}


const AdminOrderDetailsPage = async ({ params }) => {

  const order = await getOrder(params?.id)

  return <UpdateOrder order={order} />
};

export default AdminOrderDetailsPage