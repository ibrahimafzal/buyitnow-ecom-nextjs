import React, { useContext } from 'react'
import Link from 'next/link'
import CartContext from '@/context/CartContext'
import dynamic from 'next/dynamic';

const DynamicStarRatings = dynamic(() => import('react-star-ratings'), {
    ssr: false,
});

const ProductItem = ({ product }) => {

    const { addItemToCart } = useContext(CartContext)

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

    const calculatePercentageDecrease = (oldPrice, newPrice) => {
        const percentageDecrease = ((newPrice - oldPrice) / oldPrice) * 100;
        return Math.round(percentageDecrease);
    };

    const oldPrice = product?.price;
    const newPrice = product?.price + 30;

    // Calculate discount percentage
    const discountPercentage = calculatePercentageDecrease(oldPrice, newPrice);


    return (
        <>
            <div className="relative mb-3 h-[14.5rem] flex w-full max-w-[10rem] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <Link href={`/product/${product?._id}`} className="relative flex justify-center overflow-hidden rounded-xl">
                    <img
                        className="object-cover h-[8rem]"
                        src={product?.pics[0] ? product?.pics[0] : "/images/default_product.png"}
                        alt="product image"
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
                        {discountPercentage}% OFF
                    </span>
                </Link>
                <div className="mt-1 mx-1">
                    <a href="#">
                        <h5 className="tracking-tight text-slate-900 text-sm">{product?.name.substring(0, 20)}</h5>
                    </a>
                    <div className="mt-2">
                        <div className="flex justify-between items-center">
                            <p className='mb-1'>
                                <span className="text-sm font-semibold text-slate-900">${product?.price}</span>
                                <span className="text-xs text-red-500 line-through ml-1">${Math.round(product?.price + 30)}</span>
                            </p>
                            <p className='text-center text-[6px] bg-green-100 px-[1px] rounded-sm border border-green-500 border-1'>Free Delivery</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className='flex'>
                                <DynamicStarRatings
                                    rating={product.ratings}
                                    starRatedColor="#ffb829"
                                    numberOfStars={5}
                                    starDimension="15px"
                                    starSpacing="1px"
                                    name="rating"
                                />
                            </div>
                            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product?.ratings}/5</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem