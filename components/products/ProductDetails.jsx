"use client";

import Image from 'next/image';
import React, { useRef, useContext, useEffect } from 'react'
import StarRatings from 'react-star-ratings'
import BreadCrumbs from '../layout/BreadCrumbs';
import CartContext from '@/context/CartContext';
import NewReview from '../reviews/NewReview';
import OrderContext from '@/context/OrderContext';
import Reviews from '../reviews/Reviews';
import dynamic from 'next/dynamic';

const DynamicStarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const ProductDetails = ({ product }) => {
  const inStock = product?.stock >= 1

  const imgRef = useRef(null)

  const { addItemToCart } = useContext(CartContext)
  const { canReview, canUserReview } = useContext(OrderContext)

  useEffect(() => {
    canUserReview(product?._id)
  })

  const addToCartHandler = () => {
    addItemToCart({
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.pics,
      stock: product?.stock,
      seller: product?.seller,
    })
  }

  const setImgPreview = (url) => {
    imgRef.current.src = url
  }

  const breadCrumps = [
    { name: 'Home', link: '/' },
    { name: `${product?.name.substring(0, 100)} ...`, link: `/product/${product?._id}` },
  ]

  return (
    <>
      <BreadCrumbs breadCrumps={breadCrumps} />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  className="object-fill hover:object-none inline-block"
                  src={product?.pics[0] ? product?.pics[0] : "/images/default_product.png"}
                  alt={product.name}
                  width="340"
                  height="340"
                  ref={imgRef}
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {
                  product?.pics?.map((img, idx) => (
                    <a key={idx} className="inline-block border border-gray-200 p-1 rounded-md cursor-pointer"
                      onClick={() => setImgPreview(img)}
                    >
                      <img
                        className="w-14 h-14"
                        src={product?.pics ? img : "/images/default_product.png"}
                        alt="Product title"
                        width="500"
                        height="500"
                      />
                    </a>
                  ))
                }
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <DynamicStarRatings
                    rating={product?.ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{product?.ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#22C55E" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4 font-semibold text-xl">${product?.price}</p>

              <p className="mb-4 text-gray-500 text-sm">
                {product?.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button className="flex items-center px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  onClick={addToCartHandler}
                  disabled={!inStock}
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {inStock ?
                    <span className='text-green-500'>In Stock</span> :
                    <span className='text-red-500'>Out of Stock</span>
                  }
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">
                    Seller / Brand:
                  </b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>

          {/* Post New Review */}
          {canReview && <NewReview product={product} />}
          <hr />
          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Customers Reviews
            </h1>
            {/* <Reviews /> */}
            {product?.reviews.length > 0 ? (
              <Reviews reviews={product?.reviews} />
            ) : (
              <p className='text-gray-600'>No reviews</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetails