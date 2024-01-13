"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layout/CustomPagination";
import AuthContext from "@/context/authContext";

const Users = ({ users }) => {

  const { error, deleteUser, clearErrors } = useContext(AuthContext)

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearErrors()
    }
  }, [error])

  const deleteHandler = (id) => {
    deleteUser(id)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">{users?.usersCount} {users?.usersCount > 1 ? "Users" : "User"}</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map((user) => (
            <tr className="bg-white" key={user?._id}>
              <td className="px-6 py-2 capitalize">{user?.name}</td>
              <td className="px-6 py-2">{user?.email}</td>
              <td className="px-6 py-2 capitalize">{user?.role}</td>
              <td className="px-6 py-2">
                <div className="flex">
                  <Link
                    href={`/admin/users/${user?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    onClick={() => deleteHandler(user?._id)}
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users?.usersCount > 7 && (
        <div className="mb-6">
          <CustomPagination
            resPerPage={users?.resPerPage}
            usersCount={users?.usersCount}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
