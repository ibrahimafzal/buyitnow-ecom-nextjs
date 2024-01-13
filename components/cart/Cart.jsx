"use client"

import React, { useContext } from "react";
import CartContext from "@/context/CartContext";
import Link from "next/link";

const Cart = () => {
  const { cart, addItemToCart, deleteItemFromCart, saveOnCheckout } = useContext(CartContext)

  const increaseQuantity = (cartItem) => {
    const newQty = cartItem?.quantity + 1
    const item = { ...cartItem, quantity: newQty }

    if (newQty > Number(cartItem?.stock)) return;
    addItemToCart(item)
  }

  const decreaseQuantity = (cartItem) => {
    const newQty = cartItem?.quantity - 1
    const item = { ...cartItem, quantity: newQty }
    if (newQty <= 0) return;
    addItemToCart(item)
  }

  const amountWithoutTax = cart?.cartItems?.reduce((acc, item) => acc + item.quantity * item?.price, 0).toFixed(2)

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2)

  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2)

  const totalUnits = cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0)

  const checkoutHandler = () => {
    const data = {
      amount: amountWithoutTax,
      tax: taxAmount,
      totalAmount
    }
    saveOnCheckout(data)
  }

console.log("cart => ", cart)

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">{cart?.cartItems?.length || 0} {cart?.cartItems?.length > 0 ? "Item(s)" : "Item"} in Cart</h2>
        </div>
      </section>

      {
        cart?.cartItems?.length > 0 && (
          <section className="py-10">
            <div className="container max-w-screen-xl mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4">
                <main className="md:w-3/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    {cart?.cartItems?.map((c, idx) => (
                      <div key={idx}>
                        <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                          <div className="w-full lg:w-2/5 xl:w-2/4">
                            <figure className="flex leading-5">
                              <div>
                                <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                  <img src={c?.image[0] || "/images/default_product.png"} alt="Title" className="h-full object-cover" />
                                </div>
                              </div>
                              <figcaption className="ml-3">
                                <p>
                                  <a href="#" className="hover:text-blue-600">
                                    {c?.name}
                                  </a>
                                </p>
                                <p className="mt-1 text-gray-400"> Seller: {c?.seller}</p>
                              </figcaption>
                            </figure>
                          </div>
                          <div className="w-24">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button
                                data-action="decrement"
                                onClick={() => { decreaseQuantity(c) }}
                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              >
                                <span className="m-auto text-2xl font-thin">−</span>
                              </button>
                              <input
                                type="number"
                                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                                name="custom-input-number"
                                value={c?.quantity || 1}
                                readOnly
                              />
                              <button
                                data-action="increment"
                                onClick={() => { increaseQuantity(c) }}
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              >
                                <span className="m-auto text-2xl font-thin">+</span>
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="leading-5">
                              <p className="font-semibold not-italic">${(c?.price * c?.quantity).toFixed(2)}</p>
                              <small className="text-gray-400">
                                {" "}
                                ${c?.price} / per item{" "}
                              </small>
                            </div>
                          </div>
                          <div className="flex-auto">
                            <div className="float-right">
                              <button className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() => deleteItemFromCart(c?.product)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        <hr className="my-4" />
                      </div>
                    ))}
                  </article>
                </main>
                <aside className="md:w-1/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <ul className="mb-5">
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Amount before Tax:</span>
                        <span>${amountWithoutTax}</span>
                      </li>
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Total Units:</span>
                        <span className="text-green-500">{totalUnits} {totalUnits > 1 ? "(Units)" : "(Unit)"}</span>
                      </li>
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>TAX:</span>
                        <span>${taxAmount}</span>
                      </li>
                      <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                        <span>Total price:</span>
                        <span>${totalAmount}</span>
                      </li>
                    </ul>

                    <button
                      onClick={checkoutHandler}
                      className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                      Continue
                    </button>

                    <Link
                      href="/"
                      className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                    >
                      Back to shop
                    </Link>
                  </article>
                </aside>
              </div>
            </div>
          </section>
        )}
    </>
  );
};

export default Cart;
