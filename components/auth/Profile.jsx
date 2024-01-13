"use client";

import React, { useContext } from 'react'
import Link from 'next/link'
import AuthContext from '@/context/authContext';
import UserAddresses from '../user/UserAddresses';


const Profile = ({ addresses }) => {
  const { user } = useContext(AuthContext)


  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user?.avatar ? user?.avatar : "/images/default.png"}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg capitalize">{user?.name}</h5>
          <p className='flex flex-col'>
            <span className='text-gray-500 text-sm'>
              <b className='text-black'>Email:</b> {user?.email}
            </span>
            <span className='text-gray-500 text-sm'>
              <b className='text-black'>Joined On:</b> {new Date(user?.createdAt).toLocaleString()}
            </span>
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses addresses={addresses} />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  )
}

export default Profile