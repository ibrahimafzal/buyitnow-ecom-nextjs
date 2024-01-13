"use client";

import React, { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CustomPagination from "../layout/CustomPagination";
import CartContext from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const ListOrders = ({ orders }) => {

  const params = useSearchParams()
  const router = useRouter()

  const { clearCart } = useContext(CartContext)

  const orderSuccess = params.get("order_success")

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart()
      router.replace("/me/orders")
    }
  }, [])
  return (
    <>
      {orders?.orders.length > 0 ? (
        orders?.orders?.map((order) => (
          <div>
            <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
            <OrderItem key={order?.id} order={order} />
          </div>
        ))) : (
        <>
          <div className="flex items-center">
            <div>
              <h3 className="text-xl text-red-600 font-semibold mb-5">Ooops... No Orders yet</h3>
              <p className="mb-12 text-gray-600 dark:text-white">You have not made any orders yet.</p>
            </div>

            <div>
              <img src="/images/emptycart.png" alt="empty-cart-image" />
            </div>

          </div>
          <Link href={"/"}>
            <button className="w-full hidden text-xs px-3 py-2 md:inline-block text-white bg-blue-600 shadow-sm border border-gray-200 rounded-md hover:bg-blue-700 cursor-pointer">
              Start Shopping
            </button>
          </Link>
        </>
      )
      }

      {orders?.orders.length > 0 &&
        <CustomPagination
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
        />}
    </>
  );
};

export default ListOrders;