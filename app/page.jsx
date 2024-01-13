import React from 'react'
import axios from 'axios'
import ListProducts from '@/components/products/ListProducts'
import queryString from 'query-string'

const api = process.env.api_path

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams?.keyword,
    page: searchParams?.page,
    category: searchParams?.category,
    "price[gte]": searchParams?.min,
    "price[lte]": searchParams?.max,
    "ratings[gte]": searchParams?.ratings,

  }

  const searchQuery = queryString.stringify(urlParams)
  const { data } = await axios.get(
    `${api}/api/products?${searchQuery}`
  )
  return data
}

// This is home Page where Components will be show
const HomePage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams)
  return <ListProducts data={productsData} />
}

export default HomePage