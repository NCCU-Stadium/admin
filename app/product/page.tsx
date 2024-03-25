'use client'
import React from 'react'
import axios from 'axios'
import ButtonAuth from '../components/ButtonAuth'
import ButtonNew from '../components/ButtonNew'
import Topbar from '../components/Topbar'
import Search, { highlightKeyword } from '../components/Search'

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
  const [searchKeyword, setSearchKeyword] = React.useState('')

  React.useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`${API_URL}/product/get-all`)
      setProducts(data)
    }
    getProducts()
  }, [])

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.description
        .toLocaleLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      item.category.toLocaleLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.price.toString().includes(searchKeyword) ||
      item.amount.toString().includes(searchKeyword) ||
      item.sold.toString().includes(searchKeyword)
  )

  const container =
    'flex flex-col max-w-[345px] h-[451px] shadow-md bg-[#fff] rounded-[12px] py-5 px-8'

  return (
    <>
      <Topbar className="w-full shadow-md">
        <Search
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      </Topbar>

      <div className="w-full grid grid-cols-3 grid-flow-row gap-6 justify-items-center p-[50px]">
        <ButtonNew href="/product/new">新增商品</ButtonNew>

        {filteredProducts.map((product) => (
          <div key={product._id} className={`${container} `}>
            <img
              src={product.images[0]}
              alt="image"
              width={500}
              height={500}
              className="rounded-lg bg-cover bg-center bg-no-repeat bg-lightgray"
            />

            <div className="flex flex-col self-center w-[90%] h-[50%] py-3 my-3 text-pretty overflow-y-scroll">
              <p className="flex h-[20%] w-[100%]  tracking-wider text-black text-base">
                {highlightKeyword(product.name, searchKeyword)}
              </p>
              <div className="flex h-[20%] text-[#696969] text-sm font-light tracking-wide">
                <p>{highlightKeyword(product.brand, searchKeyword)}</p>
              </div>
              <div className="flex h-[60%] w-[100%] text-sm font-light whitespace-pre-line">
                <p>
                  {highlightKeyword(product.price.toString(), searchKeyword)}
                </p>
              </div>
              <div className="flex h-[20%] text-[#696969] text-sm font-light tracking-wide">
                <p>
                  庫存：
                  {highlightKeyword(product.amount.toString(), searchKeyword)}
                </p>
              </div>
              <div className="flex h-[20%] text-[#696969] text-sm font-light tracking-wide">
                <p>
                  已售出：
                  {highlightKeyword(product.sold.toString(), searchKeyword)}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-evenly">
              <ButtonAuth className="border-[#9E9E9E] text-[#9E9E9E] text-sm tracking-wider font-light">
                <p>編輯商品</p>
              </ButtonAuth>
              <ButtonAuth
                className="border-[#E60012] text-[#E60012] text-sm tracking-wider font-light"
                onClick={() => deleteById(product._id)}
              >
                <p>刪除商品</p>
              </ButtonAuth>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
