'use client'
import React from 'react'
import axios from 'axios'

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

enum Category {
  racket = 'racket',
  shoes = 'shoes',
  rubber = 'rubber',
  jersey = 'jersey',
  others = 'others',
}

export default function Page() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const response = await axios.post(`${API_URL}/product/create`, form)
    console.log(response)
    if (response.data.message === 'New product created') {
      alert('New product created')
      window.location.href = '/product'
      return
    } else {
      alert('Error')
      return
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
      <label>
        Name: <input type="text" name="name" />
      </label>
      <label>
        Brand: <input type="text" name="brand" />
      </label>
      <label>
        Price: <input type="number" name="price" />
      </label>
      <label>
        Amount: <input type="number" name="amount" />
      </label>
      <label>
        Description: <textarea name="description" />
      </label>
      <label>
        Color(use ',' to seperate):{' '}
        <input type="text" name="color" placeholder="blue, green" />
      </label>
      <label>
        Size(use ',' to seperate):{' '}
        <input type="text" name="size" placeholder="S, M, L" />
      </label>
      <label>
        Category:{' '}
        <select name="category">
          <option value={Category.racket}>Racket</option>
          <option value={Category.shoes}>Shoes</option>
          <option value={Category.rubber}>Rubber</option>
          <option value={Category.jersey}>Jersey</option>
          <option value={Category.others}>Others</option>
        </select>
      </label>
      <label>
        Images: <input type="file" name="image" multiple />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
