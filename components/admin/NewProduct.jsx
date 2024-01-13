"use client";

import ProductContext from "@/context/productContext";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const NewProduct = () => {

    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Office Decors",
        "Skin care & Beauty",
        "Accessories",
        "Headphones",
        "Sports",
        "Toys",
        "Home Decors",
        "Women's Fashion",
        "Men's Fashion",
        "Watch",
        "Smart watch"
    ];

    const { newProduct } = useContext(ProductContext)

    const [product, setProduct] = useState({
        name: "",
        description: "",
        seller: "",
        price: "",
        stock: "",
        category: "",
        pics: []
    })

    // get all the values from product to put in inputs
    const { name, description, price, seller, stock, category, pics } = product

    // upload product products starts //
    const postDetails = (files) => {
        if (!files || files.length === 0) {
            toast("Please select image(s)!");
            return;
        }

        const uploadedUrls = [];

        // Process each selected file
        const uploadPromises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'upload');
                    formData.append('cloud_name', 'cloudinaryphoto');

                    fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
                        method: 'post',
                        body: formData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            uploadedUrls.push(res.url.toString());
                            resolve();
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                } else {
                    reject("Please select images in JPEG/JPG or PNG format only!");
                }
            });
        });

        Promise.all(uploadPromises)
            .then(() => {
                // All uploads completed, update the pics array
                setProduct({ ...product, pics: [...product.pics, ...uploadedUrls] });
            })
            .catch((error) => {
                toast(error);
            });
    };
    // upload product products ends //

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }


    const submitHandler = (e) => {
        e.preventDefault()
        newProduct(product)
    }

    return (
        <section className="container max-w-3xl p-6 mx-auto">
            <h1 className="text-xl md:text-3xl font-semibold text-black mb-8">
                Create New Product
            </h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block mb-1"> Name </label>
                    <input
                        type="text"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Product name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-4 mt-5">
                    <label className="block mb-1"> Description </label>
                    <textarea
                        rows="4"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        placeholder="Product description"
                        name="description"
                        value={description}
                        onChange={onChange}
                        required
                    ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-x-2 mt-5">
                    <div className="mb-4">
                        <label className="block mb-1"> Price </label>
                        <div className="relative">
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                    placeholder="0.00"
                                    name="price"
                                    value={price}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1"> Category </label>
                        <div className="relative">
                            <select
                                className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                name="category"
                                onChange={onChange}
                                value={category}
                                required
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                                <svg
                                    width="22"
                                    height="22"
                                    className="fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M7 10l5 5 5-5H7z"></path>
                                </svg>
                            </i>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-2 mt-5">
                    <div className="mb-4">
                        <label className="block mb-1"> Seller / Brand </label>
                        <input
                            type="text"
                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            placeholder="Seller or brand"
                            name="seller"
                            onChange={onChange}
                            value={seller}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1"> Stock </label>
                        <div className="relative">
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                    placeholder="0"
                                    name="stock"
                                    onChange={onChange}
                                    value={stock}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Upload Pictures </label>
                    <input
                        type="file"
                        className="appearance-none mb-3 border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        name="pics"
                        onChange={(e) => postDetails(e.target.files)}
                        multiple
                        required
                    />

                    <div className="flex gap-2">
                        {product?.pics && product?.pics?.map((pic, idx) => (
                            <img
                                key={idx}
                                className="w-20 border p-1 rounded-md"
                                src={pic}
                                alt="pppp"
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
                >
                    Create Product
                </button>
            </form>
        </section>
    );
};

export default NewProduct;