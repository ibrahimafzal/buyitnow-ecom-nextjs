import React from "react";

const OrderItem = ({ order }) => {
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold flex items-center">
            <span className="mr-6">Order ID: {order?._id} </span>
            <span className="rounded-full bg-black w-2 h-2"></span>
            {
              order?.orderStatus == 'Processing' ? (
                <span className="text-red-500 ml-1">
                  {order?.orderStatus.toUpperCase()}
                </span>
              ) : (
                <span className="text-green-500">
                  {order?.orderStatus.toUpperCase()}
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
        <figure className="flex flex-row mb-4">
          <div>
            <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
              <img src={oi.image ? oi.image : "/images/default_product.png"} height="60" width="60" alt="Title" />
            </div>
          </div>
          <figcaption className="ml-3">
            <p>{oi.name.substring(0,25)}</p>
            <p className="mt-1 font-semibold">{oi?.quantity}x = ${oi.price * oi.quantity}</p>
          </figcaption>
        </figure>
        ))}
      </div>
    </article>
  );
};

export default OrderItem;
