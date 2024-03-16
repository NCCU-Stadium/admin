'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

interface IActivities {
  _id: string
  title: string
  content: string
  date: Date
  image: string
}

async function deleteById(_id: string) {
  try {
    const response = await axios.delete(`${API_URL}/activity?_id=${_id}`)
    if (response.data.message === 'Activity deleted') {
      alert('Activity deleted')
      window.location.reload()
      return
    } else {
      alert('Activity not deleted')
      alert(response.data.message)
      return
    }
  } catch (e) {
    console.log(e)
  }
}

export default function Page() {
  const [activities, setActivities] = React.useState<IActivities[]>([])
  React.useEffect(() => {
    const getActivities = async () => {
      const data = await axios.get(`${API_URL}/activity/get`)
      setActivities(data.data.activities)
    }
    getActivities()
  }, [])

  return (
    <div>
      <Link
        href="/activity/new"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create new activities
      </Link>

      {activities.map((activities) => (
        <div key={activities._id} className="m-4">
          <p>Title: {activities.title}</p>
          <p>Content: {activities.content}</p>
          <p>date: {new Date(activities.date).toDateString()}</p>
          <img
            src={activities.image}
            alt="image"
            width={500}
            height={500}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => deleteById(activities._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
