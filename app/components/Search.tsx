'use cline'
import React from 'react'
import { Input } from '@/components/ui/input'

export const highlightKeyword = (text: string, keyword: string) => {
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'))
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="bg-yellow-200 text-red-600">
        {part}
      </span>
    ) : (
      part
    )
  )
}
export default function Search({
  searchKeyword,
  setSearchKeyword,
}: {
  searchKeyword: string
  setSearchKeyword: Function
}) {
  return (
    <>
      <div className="flex w-fit relative items-center">
        <Input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex w-[302px] h-[31px] bg-[#F1F1F1] shadow-inner pl-8 rounded-[28px] tracking-wide text-[#696969]"
        />
        <img src="/search.svg" alt="search" className="absolute left-2" />
      </div>
    </>
  )
}
