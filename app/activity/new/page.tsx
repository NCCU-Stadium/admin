'use client'
import React from 'react'
import axios from 'axios'

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

export default function Page() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const response = await axios.post(`${API_URL}/activity/create`, form)
    if (response.data.message === 'Activity created') {
      alert('New activity created')
      window.location.href = '/activity'
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
        Content: <textarea name="content" />
      </label>
      <label>
        Images: <input type="file" name="image" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
