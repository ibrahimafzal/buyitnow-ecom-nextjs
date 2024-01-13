"use client"; 

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layout/CustomPagination";
import OrderContext from "@/context/OrderContext";
import { toast } from "react-toastify";

const Orders = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useContext(OrderContext)

  useEffect(() => {
    if(error) {
      toast.error(error)
      clearErrors()
    }
  },[error])

  const deleteHandler = (id) => {
    deleteOrder(id)
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">{orders?.ordersCount} {orders?.ordersCount > 1 ? "Orders" : "Order"}</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700">
          <tr>
            <th scope="col" className="md:px-6 px-1 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr className="bg-white" key={order?._id}>
              <td className="md:px-6 px-1 py-2">{order?._id}</td>
              <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
              <td className="px-6 py-2">{order?.orderStatus}</td>
              <td className="px-6 py-2">
                <div className="flex">
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    onClick={() => deleteHandler(order?._id)}
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <CustomPagination
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
        />
      </div>
    </div>
  );
};

export default Orders;
