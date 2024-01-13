"use client";

import React from 'react'
import Filters from '../layout/Filters'
import ProductItem from './ProductItem';
import Pagination from '../layout/CustomPagination';
import CarouselComponent from '../layout/CarouselComponent';

const ListProducts = ({ data }) => {
    return (
        <>
            <section className="py-6 md:py-12">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <Filters />

                        <main className="relative flex flex-col md:w-2/3 lg:w-3/4 px-3">
                            <CarouselComponent />
                            <div className='flex gap-[16px] flex-wrap mt-3'>
                                {
                                    data?.products?.map((product) => (

                                        <ProductItem key={product?._id} product={product} />
                                    ))
                                }
                            </div>
                        </main>
                    </div>
                    <Pagination
                        resPerPage={data?.resPerPage}
                        productsCount={data?.filteredProductCount}
                    />
                </div>
            </section>
        </>
    )
}

export default ListProducts