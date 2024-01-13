"use client";

import Link from "next/link";
import React, { useContext } from "react";
import CustomPagination from "../layout/CustomPagination";
import ProductContext from "@/context/productContext";

const Products = ({ data }) => {

    const { deleteProduct } = useContext(ProductContext)

    const deleteHandler = (id) => {
        deleteProduct(id)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">{data?.productCount} Products</h1>
            <table className="w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((product) => (
                        <tr className="bg-white" key={product._id}>
                            <td className="px-6 py-2 flex gap-2">
                                <img
                                    src={product?.pics[0] ? product?.pics[0] : "/images/default_product.png"}
                                    alt={product?.name}
                                    className="block w-10 h-10 rounded border border-gray-200"
                                />
                                {product?.name}</td>
                            <td className="px-6 py-2">{product?.stock}</td>
                            <td className="px-6 py-2">${product?.price}</td>
                            <td className="px-6 py-2">
                                <div className="flex">
                                    <Link
                                        href={`/admin/products/${product?._id}`}
                                        className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                    >
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(product?._id)}
                                        className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    >
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mb-6">
                <CustomPagination
                    resPerPage={data?.resPerPage}
                    productsCount={data?.filteredProductCount}
                />
            </div>
        </div>
    );
};

export default Products;