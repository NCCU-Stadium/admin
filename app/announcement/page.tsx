'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

interface IAnnouncement {
  _id: string
  title: string
  subTitle: string
  content: string
  date: Date
  pinned: boolean
}

async function deleteById(_id: string) {
  try {
    await axios.delete(`${API_URL}/announcement?_id=${_id}`)
    window.location.reload()
  } catch (e) {
    console.log(e)
  }
}

export default function Page() {
  const [announcements, setAnnouncements] = React.useState<IAnnouncement[]>([])
  React.useEffect(() => {
    const getAnnouncements = async () => {
      const data = await axios.get(`${API_URL}/announcement`)
      setAnnouncements(data.data.announcements)
    }
    getAnnouncements()
  }, [])

  return (
    <div>
      <Link 
        href="/announcement/new"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create new announcement
      </Link>

      {announcements.map((announcement) => (
        <div key={announcement._id} className="m-4">
          <p>
            Title: {announcement.title}, Subtitle: {announcement.subTitle}
          </p>
          <p>Content: {announcement.content}</p>
          <p>
            date: {new Date(announcement.date).toDateString()}, pinned:{' '}
            {announcement.pinned ? 'true' : 'false'}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteById(announcement._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
