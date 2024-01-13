"use client";

import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import Products from '@/components/admin/Products'

const api = process.env.api_path


const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams?.page,
  }

  const searchQuery = queryString.stringify(urlParams)

  const { data } = await axios.get(
    `${api}/api/products?${searchQuery}`
  )
  return data
}

// This is home Page where Components will be show
const HomePage = async ({ searchParams }) => {
  const data = await getProducts(searchParams)
  return <Products data={data} />
}

export default HomePage