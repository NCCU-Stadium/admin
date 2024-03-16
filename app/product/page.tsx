'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

enum Category {
  racket = 'racket',
  shoes = 'shoes',
  rubber = 'rubber',
  jersey = 'jersey',
  others = 'others',
}
interface IProduct {
  _id: string
  name: string
  brand: string
  price: number
  description: string
  color: string[] | null
  size: string[] | null
  category: Category
  amount: number
  sold: number
  images: string[]
}

async function deleteById(_id: string) {
  try {
    await axios.delete(`${API_URL}/product/delete-byid?_id=${_id}`)
    window.location.reload()
  } catch (e) {
    console.log(e)
  }
}

export default function Page() {
  const [products, setProducts] = React.useState<IProduct[]>([])
  React.useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`${API_URL}/product/get-all`)
      setProducts(data)
    }
    getProducts()
  }, [])

  return (
    <div>
      <Link
        href="/product/new"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create new product
      </Link>

      {products.map((product) => (
        <div key={product._id} className="m-4">
          <p>
            name: {product.name}, brand: {product.brand}, price: {product.price}
          </p>
          <p>description: {product.description}</p>
          <p>color: {product.color?.join(', ')}</p>
          <p>size: {product.size?.join(', ')}</p>
          <p>category: {product.category}</p>
          <p>
            amount: {product.amount}, sold: {product.sold}
          </p>
          <div className="flex flex-row">
            {product.images.map((image, index) => (
              <img
                key={index}
                className="h-20"
                src={image}
                alt={product.name}
              />
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteById(product._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
