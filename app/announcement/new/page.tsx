'use client'
import React from 'react'
import axios from 'axios'

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

export default function Page() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const response = await axios.post(`${API_URL}/announcement`, {
      title: form.get('title'),
      subTitle: form.get('subtitle'),
      content: form.get('content'),
      pinned: form.get('pinned') === 'on' ? 'true' : 'false',
    })
    console.log(response.data)
    if (response.data.message === 'New announcement posted') {
      alert('New announcement created')
      window.location.href = '/announcement'
      return
    } else {
      alert('Error')
      return
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
      <label>
        Title: <input type="text" name="title" />
      </label>
      <label>
        Subtitle: <input type="text" name="subtitle" />
      </label>
      <label>
        Content: <textarea name="content" />
      </label>
      <label>
        Pinned: <input type="checkbox" name="pinned" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
