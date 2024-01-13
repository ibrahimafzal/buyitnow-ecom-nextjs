"use client";

import OrderContext from "@/context/OrderContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateOrder = ({ order }) => {

  const { updateOrder, error, clearErrors, updated, setUpdated } = useContext(OrderContext)

  const [orderStatus, setOrderStatus] = useState(order?.orderStatus)

  useEffect(() => {
    if (updated) {
      setUpdated(false)
      toast.success("Order Updated Successfully")
    }

    if (error) {
      toast.error(error)
      clearErrors()
    }
  }, [error, updated])

  // submit handler
  const submitHandler = () => {
    const orderData = { orderStatus }
    updateOrder(order?._id, orderData)
  }

  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold flex items-center">
            <span className="mr-6">Order ID: {order?._id} </span>
            <span className="rounded-full bg-black w-2 h-2 mr-1"></span>
            {
              order?.orderStatus == 'Processing' ? (
                <span className="text-red-500 ml-1">
                  {order?.orderStatus.toUpperCase()}
                </span>
              ) : (
                <span className="text-green-500">
                  {order?.orderStatus}
                </span>
              )
            }
          </p>
          <p className="text-gray-500">{new Date(order?.createdAt).toLocaleString()} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Person</p>
          <ul className="text-gray-600">
            <li className="capitalize">{order?.user?.name}</li>
            <li>Phone: {order?.shippingInfo.phoneNo}</li>
            <li>Email: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>{order?.shippingInfo?.street}</li>
            <li>{order?.shippingInfo?.city}, {order?.shippingInfo?.state}, {order?.shippingInfo?.zipCode}</li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Payment</p>
          <ul className="text-gray-600">
            <li className="text-green-400 capitalize">{order?.paymentInfo?.status}</li>
            <li>Tax paid: ${order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((oi) => (
          <figure className="flex flex-row mb-4" key={oi?._id}>
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={oi.image ? oi.image : "/images/default_product.png"}
                  height="60"
                  width="60"
                  alt="Title"
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{oi.name.substring(0, 25)}</p>
              <p className="mt-1 font-semibold">{oi?.quantity}x = ${oi.price * oi.quantity}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <hr />

      <div className="my-8">
        <label className="block mb-3"> Update Order Status </label>
        <div className="relative">
          <select
            className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="category"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          >
            {["Processing", "Shipped", "Delivered"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg width="22" height="22" className="fill-current" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
      </div>

      <button
        type="submit"
        onClick={submitHandler}
        className="mb-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        Update Order
      </button>
    </article>
  );
};

export default UpdateOrder;
