'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

export default function Sidebar({ className }: { className?: string }) {
  const linkcss ='flex items-center pl-8 h-[46px] hover:bg-[#CE7178]' 

  const { data: session } = useSession()
  const [activeLink, setActiveLink] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    setActiveLink(pathname)
  }, [])

  const handleLinkClick = (href: any) => {
    setActiveLink(href)
  }
  if (!session || !session.user) {
    return null
  }

  return (
    <div className={cn('flex flex-col bg-[#3F3838] rounded-r-[24px]', className)}>
      <img src="/logo.svg" alt="logo" className="p-5 top-10" />
      <div className="flex flex-col relative top-[15%] justify-evenly h-1/2 text-[#fff]">
        <Link
          href="/"
          className={`${linkcss} ${activeLink === '/' ? 'bg-[#CE7178]' : ''}`}
          onClick={() => handleLinkClick('/')}
        >
          <img src="/home.svg" alt="home" />
          <p className="relative left-1">。 首頁</p>
        </Link>
        <Link
          href="/product"
          className={`${linkcss} ${activeLink === '/product' ? 'bg-[#CE7178]' : ''}`}
          onClick={() => handleLinkClick('/product')}
        >
          <img src="/product.svg" alt="product" />
          <p className="relative left-1">。 商品</p>
        </Link>
        <Link
          href="/announcement"
          className={`${linkcss} ${activeLink === '/announcement' ? 'bg-[#CE7178]' : ''}`}
          onClick={() => handleLinkClick('/announcement')}
        >
          <img src="/announcement.svg" alt="announcement" />
          <p className="relative left-1">。 通知</p>
        </Link>
        <Link
          href="/activity"
          className={`${linkcss} ${activeLink === '/activity' ? 'bg-[#CE7178]' : ''}`}
          onClick={() => handleLinkClick('/activity')}
        >
          <img src="/activity.svg" alt="activity" />
          <p className="relative left-1">。 活動</p>
        </Link>
        <Link
          href="/reserve"
          className={`${linkcss} ${activeLink === '/reserve' ? 'bg-[#CE7178]' : ''}`}
          onClick={() => handleLinkClick('/reserve')}
        >
          <img src="/reserve.svg" alt="reserve" />
          <p className="relative left-1">。 預約</p>
        </Link>
      </div>
    </div>
  )
}
