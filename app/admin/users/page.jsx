import React from 'react'
import axios from 'axios'
import { cookies } from "next/headers"
import queryString from 'query-string'
import Users from '@/components/admin/Users'

const getUsers = async (searchParams) => {

  const api = process.env.api_path

  const nextCookies = cookies()
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

  const urlParams = {
    page: searchParams.page || 1
  }

  const searchQuery = queryString.stringify(urlParams)

  const { data } = await axios.get(
    `${api}/api/admin/users?${searchQuery}`,
    {
      headers: {
        cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
      }
    })

  return data
}


const AdminUsersPage = async ({ searchParams }) => {

  const users = await getUsers(searchParams)

  return <Users users={users} />
};

export default AdminUsersPage