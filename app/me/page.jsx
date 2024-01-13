
import React from 'react'
import axios from 'axios'
import Profile from '@/components/auth/Profile'
import { cookies } from "next/headers"

const getAddresses = async () => {

  const api = process.env.api_path

  const nextCookies = cookies()
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token')
  console.log("nextAuthSessionToken => ", nextAuthSessionToken)

  const headers = nextAuthSessionToken ? { cookie: `next-auth.session-token=${nextAuthSessionToken?.value}` } : {};

  const { data } = await axios.get(`${api}/api/address`, {
    headers,
  });


  // const { data } = await axios.get(`${api}/api/address`, {
  //   headers: {
  //     cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
  //   }
  // })

  return data?.addresses
}


const ProfilePage = async () => {

  const addresses = await getAddresses()

  return <Profile addresses={addresses} />
};

export default ProfilePage