import React from 'react'
import axios from 'axios'
import { cookies } from "next/headers"
import UpdateUser from '@/components/admin/UpdateUser'

const getUser = async (id) => {

  const api = process.env.api_path

  const nextCookies = cookies()
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

  const { data } = await axios.get(
    `${api}/api/admin/users/${id}`,
    {
      headers: {
        cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
      }
    })

  return data?.user
}


const AdminUserDetailsPage = async ({ params }) => {

  const user = await getUser(params?.id)

  return <UpdateUser user={user} />
};

export default AdminUserDetailsPage