import React from 'react'
import ProductDetails from '@/components/products/ProductDetails'
import axios from 'axios'
import mongoose from 'mongoose'
import { redirect } from 'next/navigation'

const getProductDetails = async(id) => {
    const api = process.env.api_path

    const { data } = await axios.get(`${api}/api/products/${id}`)
    return data?.product;
}


const ProductDetailsPage = async ({ params }) => {

    const isValidId = mongoose.isValidObjectId(params?.id)

    if(!isValidId) {
        return redirect("/page_not_found")
    }
    const product = await getProductDetails(params?.id)
    return (
        <div>
            <ProductDetails product={product} />
        </div>
    )
}

export default ProductDetailsPage