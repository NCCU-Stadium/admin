'use client'
import React from 'react'
import axios from 'axios'
import ButtonAuth from '../components/ButtonAuth'
import ButtonNew from '../components/ButtonNew'
import Topbar from '../components/Topbar'
import Search, { highlightKeyword } from '../components/Search'

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
  const [searchKeyword, setSearchKeyword] = React.useState('')

  React.useEffect(() => {
    const getAnnouncements = async () => {
      const data = await axios.get(`${API_URL}/announcement`)
      setAnnouncements(data.data.announcements)
    }
    getAnnouncements()
  }, [])

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.content
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      announcement.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      announcement.subTitle
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      new Date(announcement.date)
        .toLocaleDateString('zh-tw', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, ' / ')
        .includes(searchKeyword) ||
      new Date(announcement.date)
        .toLocaleTimeString('zh-tw', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(':', ' : ')
        .includes(searchKeyword)
  )

  // paging stuff
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAnnouncements.slice(
    indexOfFirstItem,
    indexOfLastItem
  )
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(announcements.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  // 美化分页按钮
  let paginationItems: any[] = []
  if (pageNumbers.length > 5) {
    let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1
    let endPage =
      startPage + 4 < pageNumbers.length ? startPage + 4 : pageNumbers.length
    paginationItems = pageNumbers.slice(startPage - 1, endPage)
    if (startPage > 1) {
      paginationItems.unshift('...')
    }
    if (endPage < pageNumbers.length) {
      paginationItems.push('...')
    }
  } else {
    paginationItems = pageNumbers
  }
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  // css
  const container =
    'flex items-center h-[100%] font-light text-sm p-7 text-pretty '
  const pageButton =
    'block w-8 h-8 text-center border border-gray-300 hover:bg-blue-300 rounded leading-8'
  const nextPage =
    'flex items-center py-2 px-3 rounded font-medium select-none border text-gray-900 bg-white transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white'

  return (
    <>
      <Topbar className="w-full shadow-md">
        <Search
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      </Topbar>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full h-[58px] justify-center bg-[#9E9E9E] mb-8 sticky top-[83px]">
          <div className="flex w-[95%] h-full items-center text-[#fff] p-5">
            <p className="w-[17%] px-7">標題</p>
            <p className="w-[17%] px-7">副標</p>
            <p className="w-[30%] px-7">內容</p>
            <p className="w-[36%] px-8">上傳時間</p>
          </div>
        </div>
        <ButtonNew href="/announcement/new">新增通知</ButtonNew>

        {currentItems
          .slice()
          .reverse()
          .map((announcement) => (
            <div
              key={announcement._id}
              className="flex w-[95%] h-[137px] rounded-[14px] bg-[#fff] border-2 shadow-sm mb-8 items-center p-5"
            >
              <div className={`${container} w-[17%] text-[#000]`}>
                <p>{highlightKeyword(announcement.title, searchKeyword)}</p>
              </div>
              <div className={`${container} w-[17%] text-[#000]`}>
                <p>{highlightKeyword(announcement.subTitle, searchKeyword)}</p>
              </div>
              <div
                className={`${container.replace('items-center', '').replace('p-7', 'px-7')} w-[30%] text-[#696969] overflow-y-scroll`}
              >
                <p>{highlightKeyword(announcement.content, searchKeyword)}</p>
              </div>
              <div
                className={`${container} w-[15%] text-[#696969] justify-center text-center`}
              >
                <p>
                  {highlightKeyword(
                    new Date(announcement.date)
                      .toLocaleDateString('zh-tw', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                      .replace(/\//g, ' / '),
                    searchKeyword
                  )}
                  <br />
                  {highlightKeyword(
                    new Date(announcement.date)
                      .toLocaleTimeString('zh-tw', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                      .replace(':', ' : '),
                    searchKeyword
                  )}
                </p>
              </div>
              <div className={`${container} w-[7%] justify-center`}>
                {pinSvg(announcement.pinned)}
              </div>

              <div className={`${container} w-[14%] justify-center`}>
                <ButtonAuth
                  onClick={() => deleteById(announcement._id)}
                  className="text-[#E6001270]"
                >
                  刪除
                </ButtonAuth>
              </div>
            </div>
          ))}

        <ul className="flex flex-row mb-6 space-x-6 items-center">
          {currentPage !== 1 && currentPage > 3 && (
            <li>
              <button
                className={`${nextPage}`}
                onClick={() => setCurrentPage(1)}
              >
                回第一頁
              </button>
            </li>
          )}
          {paginationItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  if (typeof item === 'number') {
                    handlePageClick(item)
                  }
                }}
                className={`${typeof item === 'number' ? (item === currentPage ? `${pageButton} bg-red-600 text-white` : `${pageButton}`) : ''}`}
                // className={`${typeof item === 'number' && item === currentPage ? 'bg-gray-300' : ''}`}
              >
                {item}
              </button>
            </li>
          ))}
          {currentPage !== pageNumbers.length &&
            currentPage < pageNumbers.length - 2 && (
              <li>
                <button
                  className={`${nextPage}`}
                  onClick={() => setCurrentPage(pageNumbers.length)}
                >
                  最後一頁
                </button>
              </li>
            )}
        </ul>
      </div>
    </>
  )
}

const pinSvg = (pinned: boolean) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
    >
      <g clip-path="url(#clip0_4073_2968)">
        {pinned ? (
          <path
            d="M20.0631 5.625L14.7851 10.625L9.50703 12.5L7.52777 14.375L16.7643 23.125L18.7436 21.25L20.7228 16.25L26.0009 11.25"
            fill="#E60012"
          />
        ) : null}
        <path
          d="M20.0631 5.625L14.7851 10.625L9.50703 12.5L7.52777 14.375L16.7643 23.125L18.7436 21.25L20.7228 16.25L26.0009 11.25"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.1461 18.75L6.20831 24.375"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.4034 5L26.6607 11.875"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4073_2968">
          <rect
            width="31.6682"
            height="30"
            fill="white"
            transform="translate(0.270508)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
