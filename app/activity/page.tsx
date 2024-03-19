'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import ButtonAuth from '../components/ButtonAuth'
import ButtonNew from '../components/ButtonNew'
import Topbar from '../components/Topbar'
import Search, { highlightKeyword } from '../components/Search'

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
  const [searchKeyword, setSearchKeyword] = React.useState('')

  React.useEffect(() => {
    const getActivities = async () => {
      const data = await axios.get(`${API_URL}/activity/get`)
      setActivities(data.data.activities)
    }
    getActivities()
  }, [])

  const filteredactivities = activities.filter(
    (activities) =>
      activities.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      activities.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      new Date(activities.date)
        .toLocaleDateString('zh-tw', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, ' / ')
        .includes(searchKeyword)
  )

  const container =
    'flex flex-col max-w-[345px] h-[485px] shadow-md bg-[#fff] rounded-[12px] py-5 px-8'

  return (
    <>
      <Topbar className="w-full shadow-md">
        <Search
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      </Topbar>
      <div className="w-full grid grid-cols-3 grid-flow-row gap-6 justify-items-center p-[50px]">
        <ButtonNew href="/activity/new">新增活動</ButtonNew>

        {filteredactivities.slice().map((activities) => (
          <div key={activities._id} className={`${container} `}>
            <img
              src={activities.image}
              alt="image"
              width={500}
              height={500}
              className="rounded-lg bg-cover bg-center bg-no-repeat bg-lightgray"
            />
            <div className="flex flex-col h-[50%] my-3  text-pretty overflow-y-scroll">
              <p className="flex h-[20%] w-[100%]  tracking-wider text-black text-base">
                {highlightKeyword(activities.title, searchKeyword)}
              </p>
              <div className="flex h-[20%] text-sm font-light tracking-wide">
                <p>
                  {highlightKeyword(
                    new Date(activities.date)
                      .toLocaleDateString('zh-tw', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                      .replace(/\//g, ' / '),
                    searchKeyword
                  )}
                </p>
              </div>
              <div className="flex h-[60%] w-[100%] text-sm font-light whitespace-pre-line">
                <p>{highlightKeyword(activities.content, searchKeyword)}</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-evenly">
              <ButtonAuth className="border-[#9E9E9E] text-[#9E9E9E] text-sm tracking-wider font-light">
                <p>編輯活動</p>
              </ButtonAuth>
              <ButtonAuth
                className="border-[#E60012] text-[#E60012] text-sm tracking-wider font-light"
                onClick={() => deleteById(activities._id)}
              >
                <p>刪除活動</p>
              </ButtonAuth>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
